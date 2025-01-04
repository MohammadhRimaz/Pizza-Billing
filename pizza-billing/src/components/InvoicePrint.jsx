import React from "react";

// Functional Component for InvoicePrint
const InvoicePrint = ({
  customerName,
  invoiceItems,
  total,
  tax,
  grandTotal,
}) => {
  return (
    <div>
      <h2>Invoice</h2>
      <h4>Customer: {customerName}</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h5>Summary</h5>
        <p>Subtotal: ${total.toFixed(2)}</p>
        <p>Tax (10%): ${tax.toFixed(2)}</p>
        <p>
          <strong>Grand Total: ${grandTotal.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};

export default InvoicePrint;
