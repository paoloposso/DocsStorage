package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

// DuplicateKeyErrorMiddleware handles the duplicate key error
func DuplicateKeyErrorMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		err := c.Errors.Last()
		if err != nil {
			if strings.Contains(err.Error(), "E11000 duplicate key error") {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": "Duplicate key error",
				})
				c.Abort()
			}
		}
	}
}
