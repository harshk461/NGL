package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"sort"

	"time"

	"github.com/golang-jwt/jwt"
	"github.com/gorilla/mux"
	"github.com/harshk461/models/authModel"
	"github.com/harshk461/models/messageModel"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const dbName = "igl"
const authColName = "users"

var authCollection *mongo.Collection

func init() {
	godotenv.Load(".env")

	var connectionString string = os.Getenv("MONGO_URI")
	//client option
	clientOption := options.Client().ApplyURI(connectionString)

	//connect to mongodb
	client, err := mongo.Connect(context.TODO(), clientOption)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("MongoDB connection success")

	authCollection = client.Database(dbName).Collection(authColName)

	//collection instance
	fmt.Println("Collection instance is ready")
}

type User struct {
	Email    string `bson:"email"`
	Password string `bson:"password"`
}

type SignUpUser struct {
	Email    string `json:"email" bson:"email"`
	Password string `json:"password" bson:"password"`
	Name     string `json:"name" bson:"name"`
	Username string `json:"username" bson:"username"`
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func loginController(email, password string) (bool, *authModel.AuthModel) {
	filter := bson.D{{Key: "email", Value: email}}
	login_data, err := authCollection.Find(context.Background(), filter)

	if err != nil {
		// Handle database query error
		return false, nil
	}

	defer login_data.Close(context.Background())

	for login_data.Next(context.Background()) {
		var user authModel.AuthModel
		if err := login_data.Decode(&user); err != nil {
			// Handle decoding error
			return false, nil
		}

		// Compare the stored hashed password with the provided password
		if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
			// Handle incorrect password
			return false, nil
		}

		// Password is correct, return the user
		return true, &user
	}

	// User not found
	return false, nil
}

func createToken(email string, username string, id string) (string, error) {
	var secretKey = []byte(os.Getenv("secretKey"))
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"email":    email,
			"username": username,
			"id":       id,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(secretKey)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

// All Controllers
func Login(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Allow-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var loginData User

	err := json.NewDecoder(r.Body).Decode(&loginData)

	if err != nil {
		errMsg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(errMsg)
		return
	}

	successfulLogin, user := loginController(loginData.Email, loginData.Password)

	if !successfulLogin {
		msg := map[string]string{"status": "error", "message": "User not found or incorrect password"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	token, err := createToken(user.Email, user.Username, string(user.ID.Hex()))

	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]interface{}{"status": "sucess", "message": "User found", "token": token}

	json.NewEncoder(w).Encode(msg)
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newUser SignUpUser
	if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
		msg := map[string]string{"status": "error", "message": "Invalid JSON"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Check if user with the given email already exists
	emailFilter := bson.D{{"email", newUser.Email}}
	existingEmailUser := authCollection.FindOne(context.Background(), emailFilter)

	if existingEmailUser.Err() == nil {
		msg := map[string]string{"status": "error", "message": "Email Already Exists"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Check if user with the given username already exists
	usernameFilter := bson.D{{"username", newUser.Username}}
	existingUsernameUser := authCollection.FindOne(context.Background(), usernameFilter)

	if existingUsernameUser.Err() == nil {
		msg := map[string]string{"status": "error", "message": "Username Already Exists"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Hash the password before storing it in the database
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password), bcrypt.DefaultCost)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}
	newUser.Password = string(hashedPassword)

	_, err = authCollection.InsertOne(context.Background(), newUser)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]string{"status": "success", "message": "User Registered Successfully"}
	json.NewEncoder(w).Encode(msg)
}

func SendMessage(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "POST")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var messageBody messageModel.MessageModel
	err := json.NewDecoder(r.Body).Decode(&messageBody)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Invalid JSON"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	// Assuming messageBody.UserID is a valid user ID
	filter := bson.D{{"username", messageBody.Username}}

	// Create a new message
	newMessage := authModel.Message{
		Msg:       messageBody.Message,
		Timestamp: primitive.NewDateTimeFromTime(time.Now()),
	}

	// Prepare an update to push the new message into the Messages array
	update := bson.D{
		{"$push", bson.D{
			{"messages", newMessage},
		}},
	}

	// Perform the update
	updateResult, err := authCollection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	if updateResult.ModifiedCount == 0 {
		msg := map[string]string{"status": "error", "message": "User not found"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]string{"status": "success", "message": "Message sent successfully"}
	json.NewEncoder(w).Encode(msg)
}

func GetAllMessages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	params := mux.Vars(r)

	filter := bson.D{{"username", params["username"]}}

	data, err := authCollection.Find(context.Background(), filter)
	if err != nil {
		msg := map[string]string{"status": "error", "message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	var user authModel.AuthModel

	for data.Next(context.Background()) {
		if err := data.Decode(&user); err != nil {
			msg := map[string]string{"status": "error", "message": "Error decoding user data"}
			json.NewEncoder(w).Encode(msg)
			return
		}
	}

	// Sort messages by timestamp in ascending order
	sort.Slice(user.Messages, func(i, j int) bool {
		return user.Messages[i].Timestamp < user.Messages[j].Timestamp
	})

	// Return the sorted messages as a JSON response
	json.NewEncoder(w).Encode(user.Messages)
}
