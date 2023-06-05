package api

import (
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
	// Parse the login request from the request body
	var loginRequest LoginRequest
	if err := ctx.ShouldBindJSON(&loginRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Call the AuthService to authenticate the user
	token, err := c.authService.Authenticate(loginRequest.Email, loginRequest.Password)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to authenticate user"})
		return
	}
	if token == "" {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"token": token})
}
