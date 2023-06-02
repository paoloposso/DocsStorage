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

func NewAuthService(repo user.UserRepository) *AuthService {
	return &AuthService{userRepository: repo}
}

func (service AuthService) Authenticate(credentials AuthCredentials) (string, error) {
	user, err := service.userRepository.GetUserByEmail(credentials.Email)
	if err != nil {
		return "", err
	}

	if user == nil {
		return "", nil
	}

	err = checkPasswordHash(user.Password, credentials.PlainPassword)

	if err != nil {
		return "", nil
	}

	return "token12343", nil
}

func checkPasswordHash(hashedPassword string, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
