package authModel

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Message struct {
	Msg       string             `json:"msg"`
	Timestamp primitive.DateTime `json:"timestamp"`
}

type AuthModel struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Name     string             `json:"name"`
	Username string             `json:"username"`
	Email    string             `json:"email"`
	Password string             `json:"password,omitempty"`
	Messages []Message          `json:"messages,omitempty"`
}
