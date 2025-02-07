import React from "react";
import { ReactComponent as PrintIcon } from "../../../Assets/print.svg";
import { ReactComponent as DownloadIcon } from "../../../Assets/downloadTable.svg";
import { updateInvoicePDFUIStatus } from "../../../Redux/Common/actions";
import { downloadPDF } from "../../../Utils/Constants";
import { connect } from "react-redux";
const iconHeight = 20;
const iconWidth = 20;
const PrintDownloadIcons = (props) => {
  const handlePrintPreviewClick = () => {
    props.updateInvoicePDFUIStatus({
      showRenewPane: false,
      showUpgradePane: false,
      showChangePane:false,
      showInvoicePane: true,
    });
  };

  const handleDownloadClick = (e) => {
    downloadPDF(e, {});
  };

  return (
    <React.Fragment>
      <div className="flex">
        <PrintIcon
          height={iconHeight}
          width={iconWidth}
          onClick={() => handlePrintPreviewClick()}
        />
        <DownloadIcon
          height={iconHeight}
          width={iconWidth}
          onClick={(e) => handleDownloadClick(e)}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInvoicePDFUIStatus: (payload) =>
      dispatch(updateInvoicePDFUIStatus(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrintDownloadIcons);
