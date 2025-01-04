import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import InvoicePrint from "./InvoicePrint"; // Import the refactored InvoicePrint

const PrintButton = ({
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

export default PrintButton;
