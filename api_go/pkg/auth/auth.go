package auth

import (
	"github.com/paoloposso/docsapi/pkg/user"
	"golang.org/x/crypto/bcrypt"
)

type AuthCredentials struct {
	Email         string `json:"email"`
	PlainPassword string `json:"password"`
}

type AuthService struct {
	userRepository user.UserRepository
}

// NewAuthService creates a new AuthService
func NewAuthService(repo user.UserRepository) *AuthService {
	return &AuthService{userRepository: repo}
}

// Authenticate checks if the user exists and if the password is correct
func (service AuthService) Authenticate(email, password string) (string, error) {
	user, err := service.userRepository.GetUserByEmail(email)
	if err != nil {
		return "", err
	}

	if user == nil {
		return "", nil
	}

	err = checkPasswordHash(user.Password, password)

	if err != nil {
		return "", nil
	}

	return "token12343", nil
}

func checkPasswordHash(hashedPassword string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
