package main

import (
	"context"
	"encoding/json"
	"fmt"
	"strconv"

	"github.com/IBM/sarama"
	"github.com/kelseyhightower/envconfig"
	"github.com/koeshiro/ssg-example/utils"
	"google.golang.org/api/books/v1"
	"google.golang.org/api/option"
)

type EnvConfigInterface struct {
	AppGoogleBookApiKey string `required:"true" envconfig:"GOOGLE_BOOK_API_KEY"`
	KafkaUrl            string `required:"true" envconfig:"KAFKA_URL"`
	KafkaTopicName      string `required:"true" envconfig:"KAFKA_TOPIC_NAME"`
	KafkaNumPartitions  string `required:"true" envconfig:"KAFKA_NUMBER_PARTITIONS"`
}

func createTopic(topic string, NumPartitions int32, client sarama.Client) error {
	clusterAdmin, err := sarama.NewClusterAdminFromClient(client)
	utils.ThrowPanicIfErrorNotNil(err)
	defer func() {
		err := clusterAdmin.Close()
		utils.ThrowPanicIfErrorNotNil(err)
	}()
	topics, err := clusterAdmin.ListTopics()
	utils.ThrowPanicIfErrorNotNil(err)

	if _, ok := topics[topic]; ok {
		clusterAdmin.DeleteTopic(topic)
	}
	topicDetail := &sarama.TopicDetail{
		NumPartitions:     NumPartitions,
		ReplicationFactor: 1,
	}
	err = clusterAdmin.CreateTopic(topic, topicDetail, false)
	return err
}

func sendData(topic string, client sarama.Client, booksService *books.Service) {
	producer, err := sarama.NewAsyncProducerFromClient(client)
	utils.ThrowPanicIfErrorNotNil(err)
	defer func() {
		err := producer.Close()
		utils.ThrowPanicIfErrorNotNil(err)
	}()
	var subjects []string = []string{
		"subject:IT",
		"Golang",
		"PHP",
		"Linux",
		"Docker",
		"kubernetes",
		"java",
		"c#",
		"swift",
		"rust",
		"typescript",
	}
	chanel := producer.Input()
	const maxResults = 40
	for _, subject := range subjects {
		for currentPage := int64(0); currentPage < 8; currentPage++ {
			books, err := booksService.Volumes.List(subject).MaxResults(maxResults).StartIndex(currentPage * maxResults).Do()
			utils.ThrowPanicIfErrorNotNil(err)
			if len(books.Items) == 0 {
				break
			}
			jsonData, err := json.Marshal(books.Items)
			utils.ThrowPanicIfErrorNotNil(err)

			chanel <- &sarama.ProducerMessage{
				Topic: topic,
				Key:   sarama.StringEncoder(subject + "-" + strconv.FormatInt(currentPage, 10)),
				Value: sarama.StringEncoder(string(jsonData)),
			}
		}
	}
}

func main() {
	fmt.Println("Read env config")
	var envConfig EnvConfigInterface
	err := envconfig.Process("", &envConfig)

	fmt.Println("Create sarama config")
	config := sarama.NewConfig()
	utils.ThrowPanicIfErrorNotNil(err)

	fmt.Println("Create sarama admin client")
	clientAdmin, err := sarama.NewClient([]string{envConfig.KafkaUrl}, config)
	utils.ThrowPanicIfErrorNotNil(err)

	numPartitions, err := strconv.ParseInt(envConfig.KafkaNumPartitions, 10, 32)
	utils.ThrowPanicIfErrorNotNil(err)

	fmt.Println("Create kafka topic")
	err = createTopic(envConfig.KafkaTopicName, int32(numPartitions), clientAdmin)
	utils.ThrowPanicIfErrorNotNil(err)

	fmt.Println("Connect to google books")
	booksService, err := books.NewService(context.Background(), option.WithAPIKey(envConfig.AppGoogleBookApiKey))
	utils.ThrowPanicIfErrorNotNil(err)

	fmt.Println("Create sarama admin client")
	clientProvider, err := sarama.NewClient([]string{envConfig.KafkaUrl}, config)
	utils.ThrowPanicIfErrorNotNil(err)

	fmt.Println("Start sending data to kafka")
	sendData(envConfig.KafkaTopicName, clientProvider, booksService)
}
