package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/harshk461/router"
)

func main() {
	router := router.Router()

	fmt.Println("Server is getting started...")
	log.Fatal(http.ListenAndServe(":4000", router))
}
