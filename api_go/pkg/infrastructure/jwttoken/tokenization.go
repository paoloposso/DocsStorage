package jwttoken

import (
	"time"

	jwtgo "github.com/golang-jwt/jwt/v5"
	"github.com/paoloposso/docsapi/pkg/user"
)

type JwtTokenService struct {
}

func NewJwtTokenService() *JwtTokenService {
	return &JwtTokenService{}
}

func (service JwtTokenService) GenerateToken(user user.User) (string, error) {
	signingKey := []byte("seasuiorsfjkosdfsduio")

	// Create the claims with user ID and role
	claims := jwtgo.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"email":   user.Email,
		"exp":     time.Now().Add(time.Hour * 2).Unix(),
	}

	token := jwtgo.NewWithClaims(jwtgo.SigningMethodHS256, claims)

	signedToken, err := token.SignedString(signingKey)
	if err != nil {
		return "", err
	}

	return signedToken, nil
}
