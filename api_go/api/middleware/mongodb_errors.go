package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/mongo"
)

func HttpErrorHandler() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		err := c.Errors.Last()
		if err != nil {
			if mongo.IsDuplicateKeyError(err.Err) {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Duplicate key error",
				})
			} else {
				c.JSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
			}
			c.Abort()
			return
		}
	}
}
