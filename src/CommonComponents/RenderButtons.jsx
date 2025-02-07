import React from "react";
import { connect } from "react-redux";
import { CgChevronDown } from "react-icons/cg";
import {
  updateRenewPlanUIStatus,
  updateUpgradePlanUIStatus,
  updateChangePlanUIStatus
} from "../Redux/Common/actions";
import { Button } from "reactstrap";
export const RenderButtons = (props) => {
  const handleRenderButtonClick = (action) => {
    if (action === "renew") {
      props.updateRenewPlanUIStatus({
        showRenewPane: true,
        showUpgradePane: false,
        showChangePane:false,
        showInvoicePane: false,
      });
    } else if (action === "upgrade") {
      props.updateUpgradePlanUIStatus({
        showRenewPane: false,
        showUpgradePane: true,
        showChangePane:false,
        showInvoicePane: false,
      });
    } else if (action === "change") {
      props.updateChangePlanUIStatus({
        showRenewPane: false,
        showUpgradePane: false,
        showChangePane:true,
        showInvoicePane: false,
      });
    }
  };
  const Renewupgrade = {
    borderRadius: "5px",
    display: "flex",
  };
  return (
    <>
      {/* <Button
        className="text-sm primary-button mr-2 " style={Renewupgrade}
        onClick={() => handleRenderButtonClick("renew")}
       
      >
       Pay Online
      </Button> */}
      <div class="dropdown">
        <Button
          className="text-sm primary-button mr-2 "
          style={Renewupgrade}
          // onClick={() => handleRenderButtonClick("renew")}
        >
          Pay Online
          <CgChevronDown style={{ marginTop: "5px" }} />
        </Button>
        <div class="dropdown-content" style={{ width: "100%" }}>
          <ul>
            {/* <li onClick={() => handleRenderButtonClick("renew")}>Renew Plan</li> */}
            <li
              style={{ marginTop: "10px" }}
              onClick={() => handleRenderButtonClick("change")}
            >
              Change Plan
            </li>
            <li
              style={{ marginTop: "10px" }}
              onClick={() => handleRenderButtonClick("upgrade")}
            >
              Upgrade Plan
            </li>
           
          </ul>
        </div>
      </div>
      {/* <button
        className="text-sm primary-button " style={Renewupgrade}
        onClick={() => handleRenderButtonClick("upgrade")}
      >
        Upgrade Plan
      </button> */}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRenewPlanUIStatus: (payload) =>
      dispatch(updateRenewPlanUIStatus(payload)),
    updateUpgradePlanUIStatus: (payload) =>
      dispatch(updateUpgradePlanUIStatus(payload)),
      updateChangePlanUIStatus: (payload) =>
      dispatch(updateChangePlanUIStatus(payload))
      
  };
};

export default connect(null, mapDispatchToProps)(RenderButtons);
