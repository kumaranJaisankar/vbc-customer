import React from "react";
import { ReactComponent as ArrowIcon } from "../Assets/all_plans_arrow.svg";
import { convertToUpperCase } from "../Utils/Constants";
import {
  Modal,
  ModalBody,
} from "reactstrap";
const userTextStyles = {
  display: "flex",
  justifyContent: "space-between",
};
const userStyleWidthLeft = {
  width: "50%",
  fontWeight: "500",
  fontSize: "1.1rem",
};

const userStyleWidthRight = {
  width: "50%",
};

const iconContainerPosition = {
  position: "relative",
  top: "3px",
  left: "5px",
  display: "inline-block",
};

const iconHeight = 15;
const iconWidth = 15;
const iconFillColor = "#3f78e9";

const VBC_APP_YOUR_PLAN_CLASS = "vbc-app-your-plan";
const RupeeSign = () => <span>&#8377;</span>;

const width = "mr-6 w-1/4 min-w-280 mb-6";

const UpgradePlanCard = (props) => {
  const { username, mobile_number, total_plan_cost, package_name,selectedPlan,Showupgradeplantoggle } = props;
  return (
    <React.Fragment>
       {/* <Modal
        isOpen={selectedPlan}
        toggle={Showupgradeplantoggle}
        centered
        style={{ maxWidth: "1000px" }}
      >
        <ModalBody> */}
      <div
        className={`${VBC_APP_YOUR_PLAN_CLASS} p-3 card`}
        style={{width: "380px"}}
      >
        <p className="text-dimmed" style={userTextStyles}>
          <span style={userStyleWidthLeft}>{username}</span>
          <span style={userStyleWidthRight}>{mobile_number}</span>
        </p>
        <p className="text-bright" style={userTextStyles}>
          <span style={userStyleWidthLeft}>Selected Plan</span>
          {/* <span style={userStyleWidthRight}>
            All plans
            <span style={iconContainerPosition}>
              <ArrowIcon
                height={iconHeight}
                width={iconWidth}
                fill={iconFillColor}
              />
            </span>
          </span> */}
        </p>
        <p className="text-dimmed">
          {convertToUpperCase(package_name || "VBC-")}
          <h1 className="text-bright">
            <RupeeSign />
            {`${total_plan_cost && parseFloat(total_plan_cost).toFixed(2)}/mo`}
          </h1>
        </p>
      </div>
      {/* </ModalBody>
      </Modal> */}
    </React.Fragment>
  );
};

export default React.memo(UpgradePlanCard);
