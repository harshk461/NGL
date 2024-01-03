package authModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type AuthModel struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Username string             `json:"usernme"`
	Email    string             `json:"email"`
	Password string             `json:"password,omitempty"`
}
