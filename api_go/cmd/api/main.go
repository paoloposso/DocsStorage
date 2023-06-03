package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/paoloposso/docsapi/api"
	"github.com/paoloposso/docsapi/pkg/auth"
	"github.com/paoloposso/docsapi/pkg/database/mongodb"
	"github.com/paoloposso/docsapi/pkg/user"
)

func main() {
	router := gin.Default()

	client, err := mongodb.NewMongoDBClient()
	if err != nil {
		log.Fatal(err)
	}

	defer mongodb.CloseMongoDBClient(client)

	repo := mongodb.NewUserRepository(client)

	controller := api.NewAuthController(*auth.NewAuthService(repo), *user.NewUserService(repo))

	controller.RegisterRoutes(router)

	log.Fatal(http.ListenAndServe(":3000", router))
}
