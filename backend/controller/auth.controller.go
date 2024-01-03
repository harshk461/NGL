package controller

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"time"

	"github.com/golang-jwt/jwt"
	"golang.org/x/crypto/bcrypt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var secretKey = []byte("secret-key")
var password = []byte("MyDarkSecret")

const connectionString = "mongodb+srv://testmailhk102:Dfcqwh5@cluster0.depcv2p.mongodb.net/?retryWrites=true&w=majority"
const dbName = "igl"
const authColName = "users"

var authCollection *mongo.Collection

func init() {
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

func loginController(email, password string) (bool, *User) {
	filter := bson.D{{"email", email}}
	login_data, err := authCollection.Find(context.Background(), filter)

	if err != nil {
		// Handle database query error
		return false, nil
	}

	defer login_data.Close(context.Background())

	for login_data.Next(context.Background()) {
		var user User
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

func createToken(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"email": email,
			"exp":   time.Now().Add(time.Hour * 24).Unix(),
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

	var loginData User

	err := json.NewDecoder(r.Body).Decode(&loginData)

	if err != nil {
		errMsg := map[string]string{"message": "Server Error"}
		json.NewEncoder(w).Encode(errMsg)
		return
	}

	successfulLogin, _ := loginController(loginData.Email, loginData.Password)

	if !successfulLogin {
		msg := map[string]string{"message": "User not found or incorrect password"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	token, err := createToken(loginData.Email)

	if err != nil {
		msg := map[string]string{"message": "Server Error"}
		json.NewEncoder(w).Encode(msg)
		return
	}

	msg := map[string]interface{}{"message": "User found", "token": token}

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
	filter := bson.D{{"email", newUser.Email}}
	existingUser := authCollection.FindOne(context.Background(), filter)

	if existingUser.Err() == nil {
		msg := map[string]string{"status": "error", "message": "User Already Exists"}
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
