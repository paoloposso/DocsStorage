package api

import (
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/paoloposso/docsapi/pkg/auth"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthController struct {
	authService auth.AuthService
}

func NewAuthController(authService auth.AuthService) *AuthController {
	return &AuthController{
		authService: authService,
	}
}

func (c *AuthController) RegisterRoutes(router *gin.Engine) {
	router.POST("/users/authenticate", c.LoginUser)
}

func (c *AuthController) LoginUser(ctx *gin.Context) {
	var loginRequest LoginRequest
	if err := ctx.ShouldBindJSON(&loginRequest); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("Invalid login payload"))
		return
	}

	token, err := c.authService.Authenticate(loginRequest.Email, loginRequest.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to authenticate user"})
		return
	}

	if token == "" {
		ctx.AbortWithError(http.StatusUnauthorized, errors.New("Invalid email or password"))
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token})
}
