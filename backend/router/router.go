package router

import (
	"net/http"

	"github.com/gorilla/mux"
	"github.com/harshk461/controller"
	"github.com/rs/cors"
)

func Router() http.Handler {
	router := mux.NewRouter()

	// Authentication routes
	router.HandleFunc("/auth/login", controller.Login).Methods("POST")
	router.HandleFunc("/auth/register", controller.SignUp).Methods("POST")

	// Messaging routes
	router.HandleFunc("/messages/send", controller.SendMessage).Methods("POST")
	router.HandleFunc("/messages/get/{username}", controller.GetAllMessages).Methods("GET")

	// Use the cors.Default() middleware to handle CORS
	handler := cors.Default().Handler(router)

	return handler
}
