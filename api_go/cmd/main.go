package main

import (
	"log"

	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/database/mongodb"
	"github.com/paoloposso/docsapi/pkg/user"
)

func main() {
	client, err := mongodb.NewMongoDBClient()
	if err != nil {
		log.Fatal(err)
	}
	defer mongodb.CloseMongoDBClient(client)

	repo := mongodb.NewUserRepository(client)
	service := user.NewUserService(repo)
	authService := auth.NewAuthService(repo)

	_, err = service.CreateUser(user.User{
		Name:     "Paolo",
		Email:    "pvictorsys@gmail.com",
		Password: "123321",
	},
	)

	if err != nil {
		log.Fatal(err)
	}

	user, err := authService.Authenticate(auth.AuthCredentials{
		Email:         "pvictorsys@gmail.com",
		PlainPassword: "123321",
	})

	log.Printf("User: %+v\n", user)

	if err != nil {
		log.Fatal(err)
	}
}
