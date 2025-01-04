import React, { useRef } from "react";
import ReactToPrint from "react-to-print";

// Class Component for InvoicePrint
class InvoicePrint extends React.Component {
  render() {
    const { customerName, invoiceItems, total, tax, grandTotal } = this.props;

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
  }
}

// Functional Component for PrintInvoiceButton
const PrintInvoiceButton = ({
  customerName,
  invoiceItems,
  total,
  tax,
  grandTotal,
}) => {
  const componentRef = useRef(); // Use useRef to reference the InvoicePrint component

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button className="btn btn-success">Print Invoice</button>
        )}
        content={() => componentRef.current} // Use the current reference
      />
      <div style={{ display: "none" }}>
        <InvoicePrint
          ref={componentRef}
          customerName={customerName}
          invoiceItems={invoiceItems}
          total={total}
          tax={tax}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  );
};

export default PrintInvoiceButton;
