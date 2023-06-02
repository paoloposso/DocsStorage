package mongodb

import (
	"context"

	"github.com/paoloposso/docsapi/pkg/user"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// UserRepository is a MongoDB implementation of the UserRepository interface.
type UserRepository struct {
	client *mongo.Client
}

// NewUserRepository creates a new UserRepository and returns it.
func NewUserRepository(client *mongo.Client) *UserRepository {
	return &UserRepository{
		client: client,
	}
}

// CreateUser creates a new user in the database.
func (repo *UserRepository) CreateUser(user user.User) (string, error) {
	result, err := repo.client.Database("docsapi").Collection("users").InsertOne(context.Background(), user)

	if err != nil {
		return "", err
	}
	userID := string(result.InsertedID.(primitive.ObjectID).Hex())
	return userID, nil
}

// GetUserByID returns a user from the database by its ID.
func (repo *UserRepository) GetUserByID(id string) (*user.User, error) {
	objID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, err
	}

	var user user.User
	err = repo.client.Database("docsapi").Collection("users").FindOne(context.Background(), bson.M{"_id": objID}).Decode(&user)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil // Return nil for both user and error when no document is found
		}
		return nil, err // Return other errors as-is
	}
	return &user, nil
}

// GetUserByEmail returns a user from the database by its email.
func (repo *UserRepository) GetUserByEmail(email string) (*user.User, error) {
	var user user.User
	err := repo.client.Database("docsapi").Collection("users").FindOne(context.Background(),
		bson.M{"email": email}).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return nil, nil
		}
		return nil, err
	}
	return &user, nil
}
