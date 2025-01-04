package routes

import (
	"pizza-billing-backend/controllers"

	"github.com/gin-gonic/gin"
)

func SetupRouter(router *gin.Engine) {
	router.GET("/items", controllers.GetItems)
	router.POST("/items", controllers.CreateItem)
	router.DELETE("/items/:id", controllers.DeleteItem)

	router.GET("/invoices", controllers.GetInvoices)
	router.POST("/invoices", controllers.CreateInvoice)
}