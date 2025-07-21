package utils

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendErrorMessageIfErrorNotNil(ctx *gin.Context, err error) {
	if err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": err.Error(),
		})
	}
	ThrowPanicIfErrorNotNil(err)
}
