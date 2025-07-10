package main

import (
	"context"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	"google.golang.org/api/option"

	books "google.golang.org/api/books/v1"
)

type EnvConfigInterface struct {
	AppGoogleBookApiKey string `required:"true" envconfig:"GOOGLE_BOOK_API_KEY"`
	Port                string `default:"8080" envconfig:"PORT"`
}

type UrlParams struct {
	ID string `uri:"id" binding:"required"`
}

func throwPanicIfErrorNotNil(err error) {
	if err != nil {
		panic(err)
	}
}

func sendErrorMessageIfErrorNotNil(ctx *gin.Context, err error) {
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
		})
	}
	throwPanicIfErrorNotNil(err)
}

// @Summary List of books from google library
// @Produce json
// @Success 200 {object} books.Volumes
// @Router /books [get]
func GetBooksList(ctx *gin.Context, booksService *books.Service) {
	var query string
	var startIndex int64
	var maxResults int64
	var err error
	var booksList *books.Volumes
	if value, ok := ctx.GetQuery("query"); ok {
		query = value
	}
	if value, ok := ctx.GetQuery("startIndex"); ok {
		startIndex, err = strconv.ParseInt(value, 10, 64)
		sendErrorMessageIfErrorNotNil(ctx, err)
	}

	if value, ok := ctx.GetQuery("maxResults"); ok {
		maxResults, err = strconv.ParseInt(value, 10, 64)
		sendErrorMessageIfErrorNotNil(ctx, err)
	}
	ctx.GetQuery("startIndex")
	ctx.GetQuery("maxResults")
	booksList, err = booksService.Volumes.List(query).StartIndex(startIndex).MaxResults(maxResults).Do()
	sendErrorMessageIfErrorNotNil(ctx, err)
	ctx.JSON(http.StatusOK, booksList)
}

// @Summary Book info from google library
// @Produce json
// @Param id path string true "Book id"
// @Success 200 {object} books.Volume
// @Router /book/:id [get]
func GetBook(ctx *gin.Context, booksService *books.Service) {
	var urlParams UrlParams
	err := ctx.ShouldBindUri(&urlParams)
	sendErrorMessageIfErrorNotNil(ctx, err)
	book, err := booksService.Volumes.Get(urlParams.ID).Do()
	sendErrorMessageIfErrorNotNil(ctx, err)
	ctx.JSON(http.StatusOK, book)
}

// @title ssg-example
// @version 1.0
// @description example backend for static site generation

// @contact.name koeshiro
// @contact.email koeshiro@yandex.ru

// @BasePath /
func main() {
	var envConfig EnvConfigInterface
	err := envconfig.Process("", &envConfig)
	throwPanicIfErrorNotNil(err)

	booksService, err := books.NewService(context.Background(), option.WithAPIKey(envConfig.AppGoogleBookApiKey))
	throwPanicIfErrorNotNil(err)

	var defaultOptions = make(map[string]string)
	defaultOptions["language"] = "ru"

	r := gin.Default()

	r.GET("/books", func(ctx *gin.Context) {
		GetBooksList(ctx, booksService)
	})
	r.GET("/book/:id", func(ctx *gin.Context) {
		GetBook(ctx, booksService)
	})
	r.GET("/ping", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"message": "pong",
		})
	})
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	r.NoRoute(func(ctx *gin.Context) {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "Not found",
		})
	})
	r.Run(":" + envConfig.Port)
}
