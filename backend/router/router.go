package router

import (
	"github.com/gorilla/mux"
	"github.com/harshk461/controller"
)

func Router() *mux.Router {
	router := mux.NewRouter()

	router.HandleFunc("/auth/login", controller.Login).Methods("POST")
	router.HandleFunc("/auth/register", controller.SignUp).Methods("POST")
	return router
}
