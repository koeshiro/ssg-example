package main

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	"google.golang.org/api/books/v1"
	"google.golang.org/api/option"
)

type EnvConfigInterface struct {
	AppGoogleBookApiKey string `required:"true" envconfig:"SSG_EXAMPLE_GOOGLE_BOOK_API_KEY"`
}

type UrlParams struct {
	ID string `uri:"id" binding:"required"`
}

func throwPanicIfErrorNotNil(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	var envConfig EnvConfigInterface
	err := envconfig.Process("", &envConfig)
	throwPanicIfErrorNotNil(err)

	booksService, err := books.NewService(context.Background(), option.WithAPIKey(envConfig.AppGoogleBookApiKey))

	var defaultOptions = make(map[string]string)
	defaultOptions["language"] = "ru"

	r := gin.Default()

	r.GET("/books", func(ctx *gin.Context) {
		var query string
		var startIndex int64
		var maxResults int64
		if value, ok := ctx.GetQuery("query"); ok {
			query = value
		}
		if value, ok := ctx.GetQuery("startIndex"); ok {
			startIndex, err = strconv.ParseInt(value, 10, 64)
			throwPanicIfErrorNotNil(err)
		}

		if value, ok := ctx.GetQuery("maxResults"); ok {
			maxResults, err = strconv.ParseInt(value, 10, 64)
			throwPanicIfErrorNotNil(err)
		}
		ctx.GetQuery("startIndex")
		ctx.GetQuery("maxResults")
		booksList, err := booksService.Volumes.List(query).StartIndex(startIndex).MaxResults(maxResults).Do()
		throwPanicIfErrorNotNil(err)
		ctx.JSON(http.StatusOK, booksList)
	})
	r.GET("/book/:id", func(ctx *gin.Context) {
		var urlParams UrlParams
		err := ctx.ShouldBindUri(&urlParams)
		throwPanicIfErrorNotNil(err)
		book, err := booksService.Volumes.Get(urlParams.ID).Do()
		throwPanicIfErrorNotNil(err)
		ctx.JSON(http.StatusOK, book)
	})
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.Run(":8080")
}
