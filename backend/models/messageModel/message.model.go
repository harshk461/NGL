package messageModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type MessageModel struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Username string             `json:"username" bson:"username"`
	Message  string             `json:"message" bson:"message"`
}
