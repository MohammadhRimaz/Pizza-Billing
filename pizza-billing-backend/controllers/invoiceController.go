package controllers

import (
	"net/http"
	"pizza-billing-backend/models"

	"github.com/gin-gonic/gin"
)

func CreateInvoice(c *gin.Context){
	var invoice models.Invoice
	if err := c.BindJSON(&invoice); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := db.Create(&invoice).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, invoice)
}

func GetInvoices(c *gin.Context) {
	var invoices []models.Invoice
	if err := db.Find(&invoices).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, invoices)
}