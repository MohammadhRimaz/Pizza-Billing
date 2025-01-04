package main

import (
	"fmt"
	"pizza-billing-backend/controllers"
	"pizza-billing-backend/models"
	"pizza-billing-backend/routes"

	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "modernc.org/sqlite"
)

var db *gorm.DB
var err error

func main() {
	// Initialize the database connection
	db, err = gorm.Open("sqlite","./pizza-shop.db")
	if err != nil{
		fmt.Printf("Database connection error: %v\n", err)
		panic("Failed to connect to the database")
	}else{
		fmt.Println("Database connected successfully!")
	}
	defer db.Close()

	// Migrate the models
	db.AutoMigrate(&models.Item{}, &models.Invoice{})

	// Initialize the controllers with the database connection
    controllers.InitializeDB(db)

	// Set up the router
	router := gin.Default()
	routes.SetupRouter(router)

	// Start the server
	router.Run(":8080")
}