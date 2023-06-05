package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"github.com/paoloposso/docsapi/api"
	"github.com/paoloposso/docsapi/api/middleware"
	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/infrastructure/database/mongodb"
	"github.com/paoloposso/docsapi/pkg/infrastructure/jwttoken"
	"github.com/paoloposso/docsapi/pkg/user"
	"go.mongodb.org/mongo-driver/mongo"
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

	router.Use(middleware.HttpErrorHandler())

	registerRoutes(client, router)

	router.Run(":3000")
}

func registerRoutes(client *mongo.Client, router *gin.Engine) {
	userRepo := mongodb.NewUserRepository(client)

	authController := api.NewAuthController(*auth.NewAuthService(userRepo, jwttoken.NewJwtTokenService()))
	userController := api.NewUserController(*user.NewUserService(userRepo))

	authController.RegisterRoutes(router)
	userController.RegisterRoutes(router)
}
