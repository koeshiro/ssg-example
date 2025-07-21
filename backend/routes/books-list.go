package routes

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/koeshiro/ssg-example/utils"
	"google.golang.org/api/books/v1"
)

// @Summary List of books from google library
// @Produce json
// @Param query query string true "Text to search"
// @Param startIndex query number true "start index"
// @Param maxResults query number true "max results, max num 40"
// @Success 200 {object} books.Volumes
// @Router /books [get]
func (a api) GetBooksList(ctx *gin.Context) {
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
		utils.SendErrorMessageIfErrorNotNil(ctx, err)
	}

	if value, ok := ctx.GetQuery("maxResults"); ok {
		maxResults, err = strconv.ParseInt(value, 10, 64)
		utils.SendErrorMessageIfErrorNotNil(ctx, err)
	}
	ctx.GetQuery("startIndex")
	ctx.GetQuery("maxResults")
	booksList, err = a.booksService.Volumes.List(query).StartIndex(startIndex).MaxResults(maxResults).Do()
	utils.SendErrorMessageIfErrorNotNil(ctx, err)
	ctx.JSON(http.StatusOK, booksList)
}
