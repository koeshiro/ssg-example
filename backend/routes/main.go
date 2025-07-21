package routes

import (
	"github.com/gin-gonic/gin"
	"google.golang.org/api/books/v1"
)

type api struct {
	booksService *books.Service
}

func RegisterRoutes(r *gin.Engine, booksService *books.Service) {
	a := api{
		booksService,
	}
	r.GET("/books", a.GetBooksList)
	r.GET("/book/:id", a.GetBook)
}
