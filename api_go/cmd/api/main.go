package main

import (
	"log"

	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/database/mongodb"
)

func main() {
	client, err := mongodb.NewMongoDBClient()
	if err != nil {
		log.Fatal(err)
	}
	defer mongodb.CloseMongoDBClient(client)

	repo := mongodb.NewUserRepository(client)
	// service := user.NewUserService(repo)
	authService := auth.NewAuthService(repo)

	// _, err = service.CreateUser(user.User{
	// 	Name:     "Paolo",
	// 	Email:    "pvictorsys@gmail.com",
	// 	Password: "123321",
	// },
	// )

	// if err != nil {
	// 	log.Fatal(err)
	// }

	user, err := authService.Authenticate("pvictorsys@gmail.com", "123321")

	log.Printf("User: %+v\n", user)

	if err != nil {
		log.Fatal(err)
	}
}
