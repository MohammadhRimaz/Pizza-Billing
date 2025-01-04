package models

type Invoice struct {
	ID           uint    `json:"id" gorm:"primaryKey;autoIncrement"`
	CustomerName string  `json:"customer_name"`
	Total        float64 `json:"total"`
	Tax          float64 `json:"tax"`
	GrandTotal   float64 `json:"grand_total"`
}