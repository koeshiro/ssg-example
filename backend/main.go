package main

import (
	"context"
	"net/http"
	"time"

	_ "github.com/koeshiro/ssg-example/docs"
	"github.com/koeshiro/ssg-example/routes"
	"github.com/koeshiro/ssg-example/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/kelseyhightower/envconfig"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
	books "google.golang.org/api/books/v1"
	"google.golang.org/api/option"
)

type EnvConfigInterface struct {
	AppGoogleBookApiKey string `required:"true" envconfig:"GOOGLE_BOOK_API_KEY"`
	Port                string `default:"8080" envconfig:"PORT"`
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
	utils.ThrowPanicIfErrorNotNil(err)

	booksService, err := books.NewService(context.Background(), option.WithAPIKey(envConfig.AppGoogleBookApiKey))
	utils.ThrowPanicIfErrorNotNil(err)

	var defaultOptions = make(map[string]string)
	defaultOptions["language"] = "ru"

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"PUT", "PATCH"},
		AllowHeaders:     []string{"Origin"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.RegisterRoutes(r, booksService)

	// etc routes
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
