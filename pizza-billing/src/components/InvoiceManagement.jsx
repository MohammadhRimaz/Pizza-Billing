import React, { useState, useEffect } from "react";
import axios from "../services/api";
import PrintButton from "./PrintButton";

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
      await axios.post("/invoices", invoiceData);
      alert("Invoice created successfully!");
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
    <div>
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
          Submit Invoice
        </button>
      </div>

      {/* Print Button */}
      <PrintButton
        customerName={customerName}
        invoiceItems={invoiceItems}
        total={total}
        tax={tax}
        grandTotal={grandTotal}
      />
    </div>
  );
}

export default InvoiceManagement;
