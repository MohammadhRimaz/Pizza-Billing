import React from "react";

const PrintInvoiceButton = ({
  customerName,
  invoiceItems,
  total,
  tax,
  grandTotal,
}) => {
  const printInvoice = () => {
    // Create a new window to render the invoice content
    const printWindow = window.open("", "_blank", "width=600,height=600");
    if (printWindow) {
      // Create a new HTML content for the print window
      printWindow.document.write(`
        <html>
          <head><title>Invoice</title></head>
          <body>
            <div id="invoice-content">
              <h2>Invoice</h2>
              <h4>Customer: ${customerName}</h4>
              <table border="1" cellpadding="5" cellspacing="0">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${invoiceItems
                    .map(
                      (item) => `
                        <tr>
                          <td>${item.name}</td>
                          <td>${item.price}</td>
                          <td>${item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      `
                    )
                    .join("")}
                </tbody>
              </table>
              <div>
                <h5>Summary</h5>
                <p>Subtotal: $${total.toFixed(2)}</p>
                <p>Tax (10%): $${tax.toFixed(2)}</p>
                <p>
                  <strong>Grand Total: $${grandTotal.toFixed(2)}</strong>
                </p>
              </div>
            </div>
          </body>
        </html>
      `);

      // Trigger the print dialog
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div>
      <button className="btn btn-success" onClick={printInvoice}>
        Print Invoice
      </button>
    </div>
  );
};

export default PrintInvoiceButton;
