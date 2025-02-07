import React from "react";
import SidePaneHOC from "./SidePaneHOC";
import { InvoicePDF } from "./InvoicePDF";
import { CgClose } from "react-icons/cg";
const headerStyle = {
  backgroundColor: "rgb(63 120 233 / 100%)",
  color: "white",
};
const iconHeight = 25;
const iconWidth = 25;

const InvoicePDFSidePane = (props) => {
  const { onClose } = props;

  const handleClose = () => {
    onClose();
  };
  return (
    <React.Fragment>
      <div className={`relative h-full`}>
        <div
          className="flex items-center justify-between p-4"
          style={{ ...headerStyle }}
        >
          <h2 className="flex-start">Invoice</h2>
          <CgClose
            onClick={() => handleClose("invoice")}
            style={{
              height: iconHeight,
              width: iconWidth,
              cursor: "pointer",
            }}
          />
        </div>
        <div className="m-4 p-2 h-full">
          <InvoicePDF />
        </div>
      </div>
    </React.Fragment>
  );
};

export default SidePaneHOC(InvoicePDFSidePane, "invoice");
