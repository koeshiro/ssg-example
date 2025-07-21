package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/koeshiro/ssg-example/utils"
)

type UrlParams struct {
	ID string `uri:"id" binding:"required"`
}

// @Summary Book info from google library
// @Produce json
// @Param id path string true "Book id"
// @Success 200 {object} books.Volume
// @Router /book/:id [get]
func (a api) GetBook(ctx *gin.Context) {
	var urlParams UrlParams
	err := ctx.ShouldBindUri(&urlParams)
	utils.SendErrorMessageIfErrorNotNil(ctx, err)
	book, err := a.booksService.Volumes.Get(urlParams.ID).Do()
	utils.SendErrorMessageIfErrorNotNil(ctx, err)
	ctx.JSON(http.StatusOK, book)
}
