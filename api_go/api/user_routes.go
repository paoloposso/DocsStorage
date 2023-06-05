package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/paoloposso/docsapi/pkg/user"
)

type UserController struct {
	userService user.UserService
}

func NewUserController(userService user.UserService) *UserController {
	return &UserController{
		userService: userService,
	}
}

func (c *UserController) RegisterRoutes(router *gin.Engine) {
	router.POST("users/register", c.RegisterUser)
}

func (c *UserController) RegisterUser(ctx *gin.Context) {
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
		Role:     registrationRequest.Role,
	}

	// Call the UserService to register the user
	userID, err := c.userService.CreateUser(user)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to register user"})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"user_id": userID})
}

type RegistrationRequest struct {
	Email    string    `json:"email"`
	Name     string    `json:"name"`
	Password string    `json:"password"`
	Role     user.Role `json:"role"`
}
