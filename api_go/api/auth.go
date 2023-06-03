package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
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

func NewAuthController(authService auth.AuthService) *AuthController {
	return &AuthController{
		authService: authService,
	}
}

func (c *AuthController) RegisterRoutes(router *mux.Router) {
	router.HandleFunc("/register", c.RegisterUser).Methods(http.MethodPost)
	router.HandleFunc("/login", c.LoginUser).Methods(http.MethodPost)
}

func (c *AuthController) RegisterUser(w http.ResponseWriter, r *http.Request) {
	// Parse the registration request from the request body
	var registrationRequest RegistrationRequest
	err := json.NewDecoder(r.Body).Decode(&registrationRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Create a User struct for registration
	user := user.User{
		Name:     registrationRequest.Name,
		Email:    registrationRequest.Email,
		Password: registrationRequest.Password,
	}

	// Call the AuthService to register the user
	userID, err := c.userService.CreateUser(user)
	if err != nil {
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	response := struct {
		UserID string `json:"user_id"`
	}{
		UserID: userID,
	}
	responseJSON, err := json.Marshal(response)
	if err != nil {
		http.Error(w, "Failed to marshal response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(responseJSON)
}

func (c *AuthController) LoginUser(w http.ResponseWriter, r *http.Request) {
	// Parse the login request from the request body
	var loginRequest LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginRequest)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	// Call the AuthService to authenticate the user
	token, err := c.authService.Authenticate(loginRequest.Email, loginRequest.Password)
	if err != nil {
		http.Error(w, "Authentication failed", http.StatusUnauthorized)
		return
	}

	json.NewEncoder(w).Encode(token)
}
