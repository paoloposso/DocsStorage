package api

import (
	"errors"
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

	var registrationRequest RegistrationRequest

	if err := ctx.ShouldBindJSON(&registrationRequest); err != nil {
		ctx.AbortWithError(http.StatusBadRequest, errors.New("Invalid request payload"))
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
		ctx.Error(err)
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
