import React, { useState, useEffect } from "react";
import axios from "../services/api";

function InvoiceManagement() {
  const [items, setItems] = useState([]);
  const [invoiceItems, setInvoiceItems] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  // Fetch items on component mount
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get("/items");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const addItemToInvoice = (itemId) => {
    // Check if the item is already in the invoice
    const isDuplicate = invoiceItems.some(
      (item) => item.id === parseInt(itemId)
    );

    if (isDuplicate) {
      alert("This item is already added to the invoice.");
      return;
    }

    // Find the selected item and add it to the invoice items
    const selectedItem = items.find((item) => item.id === parseInt(itemId));
    if (selectedItem) {
      setInvoiceItems([...invoiceItems, { ...selectedItem, quantity: 1 }]);
    }
  };

  const updateQuantity = (index, quantity) => {
    const updatedItems = [...invoiceItems];
    updatedItems[index].quantity = parseInt(quantity);
    setInvoiceItems(updatedItems);
  };

  const calculateTotals = () => {
    const subTotal = invoiceItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const calculatedTax = subTotal * 0.1; // Assuming 10% tax
    const calculatedGrandTotal = subTotal + calculatedTax;

    setTotal(subTotal);
    setTax(calculatedTax);
    setGrandTotal(calculatedGrandTotal);
  };

  const handleInvoiceSubmit = async () => {
    try {
      const invoiceData = {
        customer_name: customerName,
        items: invoiceItems.map((item) => ({
          item_id: item.id,
          quantity: item.quantity,
        })),
        total,
        tax,
        grand_total: grandTotal,
      };

      // Submit the invoice
      await axios.post("/invoices", invoiceData);
      alert("Invoice created successfully!");

      // Open the print dialog
      const printWindow = window.open("", "_blank", "width=600,height=600");
      if (printWindow) {
        // Create a new HTML content for the print window
        printWindow.document.write(`
         <html>
          <head><title>Invoice</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h2, h4 {
              margin-bottom: 5px;
            }
            p{
              font-size: 13px
            }
            table{
              width:100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
              table, th, td{
              border: 1px solid black;
            }
            th, td{
              padding: 8px;
              text-align: left;
            }
            .summary{
              margin-top:20px;
              text-align: right;
            }
            .summary p{
              margin: 5px 0;
              font-size: 15px
            }
            .invoice-header {
              display: flex;
              justify-content: space-between;
            }
            .invoice-footer{
              display: block;
              text-align: center;
            }
            .invoice-header div, .invoice-footer div{
              margin: 5px 0;
            }
          </style>
          </head>
          <body>
            <div class="invoice-content">
              <div>
                <h1>Pizza Billing</h1>
                <p>1st Street, Galle Rd,</p>
                <p>Colombo, 39421</p>
                <p>Phone: (000) 00-0000</p>
              </div>
              </br>
              <div>
                <h4>INVOICE</h4>
                <p><strong>Invoice #:</strong>${Math.floor(
                  Math.random() * 1000
                )}</p>
                <p><strong>Date:</strong>${new Date().toLocaleDateString()}</p>
              </div>
              </br>
            </div>

            <div>
              <h4>Bill To: ${customerName}</h4>
              <h4>Phone: </h4>
            </div>
              
            <table>
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Item Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                ${invoiceItems
                  .map(
                    (item, index) => `
                       <tr>
                         <td>${index + 1}</td>
                         <td>${item.name}</td>
                        <td>${item.price.toFixed(2)}</td>
                         <td>${item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    `
                  )
                  .join("")}
              </tbody>
            </table>
              <div class="summary">
                <p><strong>Subtotal:</strong> $${total.toFixed(2)}</p>
                <p><strong>Tax (10%):</strong> $${tax.toFixed(2)}</p>
                <p>
                  <strong>Grand Total:</strong> $${grandTotal.toFixed(2)}
                </p>
              </div>
              </br>
              
              <div class="invoice-footer">
                  <div>
                    <p>Thank you for the business!</p>
                  </div>
                  <div>
                    <p>If you have any questions, please contact:</p>
                    <p>example@company.com</p>
                  </div>
              </div>
          </body>
        </html>
      `);

        // Trigger the print dialog
        printWindow.document.close();
        printWindow.print();
      }

      // Reset form
      setCustomerName("");
      setInvoiceItems([]);
      setTotal(0);
      setTax(0);
      setGrandTotal(0);
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  const handleRemoveItemById = (idToRemove) => {
    const updatedInvoiceItems = invoiceItems.filter(
      (item) => item.id !== idToRemove
    );
    setInvoiceItems(updatedInvoiceItems);
  };

  useEffect(() => {
    calculateTotals();
  }, [invoiceItems]);

  return (
    <div className="p-5">
      <h2>Invoice Management</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Add Item</label>
          <select
            className="form-control"
            onChange={(e) => addItemToInvoice(e.target.value)}
          >
            <option value="">Select Item</option>
            {items.map((item, index) => (
              <option key={item.id || `item-${index}`} value={item.id}>
                {item.name} - ${item.price}
              </option>
            ))}
          </select>
        </div>
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(index, e.target.value)}
                />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveItemById(item.id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        <h5>Summary</h5>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <p>
          <strong>Grand Total: ${grandTotal.toFixed(2)}</strong>
        </p>
        <button
          className="btn btn-primary"
          onClick={handleInvoiceSubmit}
          disabled={invoiceItems.length === 0 || !customerName}
        >
          Submit & Print Invoice
        </button>
      </div>
    </div>
  );
}

export default InvoiceManagement;
