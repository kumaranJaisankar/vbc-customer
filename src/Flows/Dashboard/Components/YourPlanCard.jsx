import React from "react";
import { ReactComponent as ArrowIcon } from "../../../Assets/all_plans_arrow.svg";
import { convertToUpperCase } from "../../../Utils/Constants";
import {
  updateUpgradePlanUIStatus,
  setAllOrPartialPlansFetch,
  updateRenewPlanUIStatus,
  updateChangePlanUIStatus,
  // updateChangePlanUIStatus
} from "../../../Redux/Common/actions";
import { ReactComponent as UploadIcon } from "../../../Assets/upload.svg";
import { connect } from "react-redux";
import { FaArrowUp,FaArrowDown } from "react-icons/fa";
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
const userStyleWidthRight1 = {
  width: "50%",
 marginTop: "-60px"
};

const iconContainerPosition = {
  position: "relative",
  top: "3px",
  left: "5px",
  display: "inline-block",
  cursor: "pointer",
};
const iconStyles = {
  position: "relative",
  top: 0,
  left: "3px",
color: "white"
}


const renewbutton = {
backgroundColor: "white",
color:"blue",
// height: "40px",
// // width: "55%",
// marginLeft:"3px",
// fontSize: "15px"
fontSize:"18px",
padding:"12px"
}
const inlineDisplay = { display: "inline" ,
color:"white"}
const iconHeight = 15;
const iconWidth = 15;
const iconFillColor = "#3f78e9";

const VBC_APP_YOUR_PLAN_CLASS = "vbc-app-your-plan";
const RupeeSign = () => <span>&#8377;</span>;

const width = "mr-6 w-1/4 min-w-280 mb-6";

const YourPlanCard = (props) => {
  const { username, mobile_number, plan_cost, plan_name, loading ,plan_time_unit,plan_unit_type,plan_download,plan_upload} = props;

  // const handleChangePlansClick = () => {
  // props.updateChangePlanUIStatus({
  //     showChangePane: true,
  //   });
  // };
  const handleAbovePlansClick = () => {
    // props.updateUpgradePlanUIStatus({
    //   showUpgradePane: true,
    // });
    props.updateChangePlanUIStatus({
     showChangePane: true,
     });
  };
  const handleRenewPlansClick = () =>{
    props.updateRenewPlanUIStatus({
      showRenewPane: true,
    })
  }


  const  totalcost = parseFloat(plan_cost).toFixed(2)
  return (
    <React.Fragment>
      <div className={`${VBC_APP_YOUR_PLAN_CLASS} p-3 card`}>
        <p className="text-dimmed" style={userTextStyles}>
          <span style={userStyleWidthLeft}>{username}</span>
          <span style={userStyleWidthRight}>+91 - {mobile_number}</span>
        </p>
        <p className="text-bright" style={userTextStyles}>
          <span style={userStyleWidthLeft}><h2>Your Plan </h2>
          <p style={{color:"white"}}>{convertToUpperCase(plan_name || "VBC-")}  <br/><span><RupeeSign />
              {` ${totalcost} / ` +  `${plan_time_unit}` + `${plan_unit_type}`}</span> </p>
          {/* <h1 className="text-bright">
              <RupeeSign />
              {`${plan_cost && parseFloat(plan_cost).toFixed(1)}/` +  `${plan_time_unit}` + `${plan_unit_type}`}
            </h1> */}
          </span>
          
          <span style={userStyleWidthRight} onClick={handleAbovePlansClick}>
            <a className="link" href="#" style={{fontSize:"18px", marginLeft:"16px"}}>
              All Plans
            </a>
            <span style={iconContainerPosition}>
              <ArrowIcon
                height={iconHeight}
                width={iconWidth}
                fill={iconFillColor}
              />
            </span>
          </span>
        </p>
        {/* <p className="text-dimmed">
          {convertToUpperCase(plan_name || "VBC-")}
          <h1 className="text-bright">
            <RupeeSign />
            {`${plan_cost && parseFloat(plan_cost).toFixed(2)}/mo`}
          </h1>
        </p> */}
       
        <p className="text-dimmed" style={userTextStyles}>
          <span style={userStyleWidthLeft}>
            {/* <span>{convertToUpperCase(plan_name || "VBC-")} </span> */}
            <div className="vbc-app-upload" style={{marginTop:"-30px"}}>
         <span style={iconStyles} ><FaArrowUp style={inlineDisplay} height={iconHeight} width={iconWidth} /> {plan_upload} Mbps / <FaArrowDown style={inlineDisplay} height={iconHeight} width={iconWidth} /> {plan_download} Mbps</span> 
          
        </div>
          </span>
          <span style={userStyleWidthRight1} >
            <button style={renewbutton} className="text-sm primary-button mr-2" onClick={handleRenewPlansClick}>
              Renew
              <span style={iconContainerPosition}>
                <ArrowIcon
                  height={iconHeight}
                  width={iconWidth}
                  fill={iconFillColor}
                />
              </span>
            </button>
          </span>
        </p>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUpgradePlanUIStatus: (payload) =>
      dispatch(updateUpgradePlanUIStatus(payload)),
    setAllOrPartialPlansFetch: (payload) =>
      dispatch(setAllOrPartialPlansFetch(payload)),
      updateRenewPlanUIStatus: (payload) =>
      dispatch(updateRenewPlanUIStatus(payload)),
      updateChangePlanUIStatus: (payload) =>
      dispatch(updateChangePlanUIStatus(payload)),

  };
};

export default connect(null, mapDispatchToProps)(React.memo(YourPlanCard));
