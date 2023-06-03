package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/user"
)

type RegistrationRequest struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type AuthController struct {
	authService auth.AuthService
	userService user.UserService
}

func NewAuthController(authService auth.AuthService, userService user.UserService) *AuthController {
	return &AuthController{
		authService: authService,
		userService: userService,
	}
}

func (c *AuthController) RegisterRoutes(router *gin.Engine) {
	router.POST("/register", c.RegisterUser)
	router.POST("/login", c.LoginUser)
}

func (c *AuthController) RegisterUser(ctx *gin.Context) {
	// Parse the registration request from the request body
	var registrationRequest RegistrationRequest
	if err := ctx.ShouldBindJSON(&registrationRequest); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Create a User struct for registration
	user := user.User{
		Name:     registrationRequest.Name,
		Email:    registrationRequest.Email,
		Password: registrationRequest.Password,
	}

	// Call the UserService to register the user
	userID, err := c.userService.CreateUser(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"user_id": userID})
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
