package mongodb

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// NewMongoDBClient creates a new MongoDB client and returns it.
func NewMongoDBClient() (*mongo.Client, error) {
	clientOptions := options.Client().ApplyURI("mongodb://localhost:27017")
	client, err := mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("MongoDB connection started")

	CreateIndexes(client)

	return client, nil
}

// CloseMongoDBClient closes the MongoDB client.
func CloseMongoDBClient(client *mongo.Client) {
	err := client.Disconnect(context.Background())
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Disconnected from MongoDB")
}

// CreateIndexes creates indexes for the MongoDB collections.
func CreateIndexes(client *mongo.Client) {
	collection := client.Database("docsapi").Collection("users")

	index := mongo.IndexModel{
		Keys:    bson.D{{Key: "email", Value: 1}},
		Options: options.Index().SetUnique(true),
	}

	_, err := collection.Indexes().CreateOne(context.Background(), index)
	if err != nil {
		log.Fatal(err)
	}
}
