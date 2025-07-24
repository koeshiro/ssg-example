package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"html/template"
	"strconv"
	"time"

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

type RouteList struct {
	Subject string
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
		"golang",
		"php",
		"linux",
		"kubernetes",
		"swift",
		"rust",
		"typescript",
		"java",
		"c#",
		"docker",
	}
	chanel := producer.Input()
	const maxResults = 40
	tmpl, err := template.New("route /list").Parse(`/list/{{.Subject}}`)
	utils.ThrowPanicIfErrorNotNil(err)
	for _, subject := range subjects {
		fmt.Println("Subject " + subject)
		var booksPages [][]*books.Volume = [][]*books.Volume{}
		for currentPage := int64(0); currentPage < 8; currentPage++ {
			fmt.Println("page " + strconv.Itoa(int(currentPage)))
			books, err := booksService.Volumes.List(subject).MaxResults(maxResults).StartIndex(currentPage * maxResults).Do()
			utils.ThrowPanicIfErrorNotNil(err)
			if len(books.Items) == 0 {
				break
			}
			booksPages = append(booksPages, books.Items)
			time.Sleep(time.Second / 3)
		}
		time.Sleep(time.Second)
		jsonData, err := json.Marshal(booksPages)
		utils.ThrowPanicIfErrorNotNil(err)

		var keyBuffer bytes.Buffer
		err = tmpl.Execute(&keyBuffer, RouteList{
			Subject: subject,
		})
		utils.ThrowPanicIfErrorNotNil(err)

		chanel <- &sarama.ProducerMessage{
			Topic: topic,
			Key:   sarama.StringEncoder(keyBuffer.String()),
			Value: sarama.StringEncoder(string(jsonData)),
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
