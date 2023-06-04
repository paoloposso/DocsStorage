package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/paoloposso/docsapi/api"
	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/infrastructure/database/mongodb"
	"github.com/paoloposso/docsapi/pkg/infrastructure/jwttoken"
	"github.com/paoloposso/docsapi/pkg/user"
)

func main() {
	router := gin.Default()

	envFile := ".env"

	if _, err := os.Stat(envFile); err == nil {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Retrieve the MongoDB URI from environment variables
	mongoURI := os.Getenv("MONGODB_URI")
	if mongoURI == "" {
		log.Fatal("MONGODB_URI environment variable is not set")
	}

	client, err := mongodb.NewMongoDBClient(mongoURI)
	if err != nil {
		log.Fatal(err)
	}

	defer mongodb.CloseMongoDBClient(client)

	userRepo := mongodb.NewUserRepository(client)
	tokenService := jwttoken.NewJwtTokenService()

	controller := api.NewAuthController(*auth.NewAuthService(userRepo, tokenService), *user.NewUserService(userRepo))

	controller.RegisterRoutes(router)

	log.Fatal(http.ListenAndServe(":3000", router))
}
