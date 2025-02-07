import React from "react";
import { connect } from "react-redux";
import UpgradePlan from "./UpgradePlan";
import RenewPlan from "./RenewPlan";
import ChangePlan from "./ChangePlan";
import InvoicePDFSidePane from "./InvoicePDFSidePane";
const SidePanes = ({ showRenewPlan, showUpgradePlan, showInvoicePane }) => {
  return (
    <React.Fragment>
      {<RenewPlan />}
      {<UpgradePlan />}
      {<ChangePlan/>}
      {<InvoicePDFSidePane />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { showRenewPlan, showUpgradePlan, showInvoicePane } = state.common;
  return {
    showRenewPlan,
    showUpgradePlan,
    showInvoicePane
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SidePanes);
