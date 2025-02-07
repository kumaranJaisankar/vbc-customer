import React from "react";
import PieChartComponent from "./PieChart";
import { ReactComponent as WifiIcon } from "../../../Assets/wifi.svg";
import { ReactComponent as UploadIcon } from "../../../Assets/upload.svg";
import { ReactComponent as DownloadIcon } from "../../../Assets/download.svg";
import moment from "moment";

const pieChartTextStyles = {
  fontWeight: "bold",
  display: "block",
};
const iconTextStyle = {
  position: "relative",
  top: "-8px",
  left: "5px",
};

const inlineDisplay = { display: "inline" };

const iconHeight = 40;
const iconWidth = 40;
const iconStrokeColor = "#3f78e9";

const pieChartStyles = {
  top: "-55px",
  right: "-40px",
};
const thisMonth = {
  position: "absolute",
  top: "74px",
  right: "40%",
};



const iconStyles = {
  position: "relative",
  top: 0,
  left: "3px",
}
const iconHeightgb = 24;
const iconWidthgb = 24;


const VBC_APP_DATA_BALANCE_CLASS = "vbc-app-data-balance-card";
const marginRight = "mr-6 min-w-450 mb-6 ";

const DataBalanceCard = (props) => {
  const {
    planExpiry,
    session_history,
    session_data,
    total_plan_data,
    today_consumed_data,
    thismonth_consumed_data, downloadGB, uploadGB
  } = props;
  const used_data =
    Object.keys(session_data).length > 0
      ? parseFloat(session_data.Total_data_usage).toFixed(1)
      : "XX";
  const total_data = total_plan_data === "5000" ? "Unlimited" : total_plan_data;
  // session_history.length > 0 &&
  // total_plan_data;
  const remaining_data = parseFloat(total_plan_data) - thismonth_consumed_data;
  const start = moment().format("YYYY-MM-DD");
  const end = moment(planExpiry);
  const remainingDays = moment.duration(end.diff(start)).asDays().toFixed(0);
  const message =
  remainingDays > 0
    ? `Expires`
    : remainingDays === 0
    ? 'Expires'
    : 'Expired';
 

  return (
    <React.Fragment>
      <div className={`${VBC_APP_DATA_BALANCE_CLASS} p-3 card relative`}>
        <div className="text-lg font-bold">Data Balance</div>

        <div className="vbc-app-data-balance-content">
          <p className="mt-3 flex flex-wrap justify-between">
            <div>
              <h1>

                {total_data === "Unlimited" ? (
                  ""
                ) : (
                  <span className="ml-2">
                    <WifiIcon
                      height={iconHeight}
                      width={iconWidth}
                      stroke={iconStrokeColor}
                      style={inlineDisplay}
                    />
                    {remaining_data ? (
                      parseFloat(remaining_data).toFixed(1)
                    ) : (
                      "0"
                    )}GB
                  </span>
                )}

              </h1>
              <span style={{ ...iconTextStyle, left: 0, top: 8, }}>
                {total_data === "Unlimited" ? (
                  <span style={{ color: "#000000", fontWeight: "600" }}> <WifiIcon
                    height={iconHeight}
                    width={iconWidth}
                    stroke={iconStrokeColor}
                    style={inlineDisplay}
                  /> {total_data}GB/mo</span>
                ) : (
                  `Remaining Of ${total_data}GB/mo`
                )}
              </span>
            </div>
            <div style={{ marginTop: "10px" }}>
              <span style={{ color: "#000000" }}>This Month </span>
              <span className={"block"} style={{ color: "#000000", fontWeight: "600" }}>
                {parseFloat(thismonth_consumed_data).toFixed(1)}
                GB
              </span>
            </div>
          </p>
        </div>
        <div className="mt-3">{`${message} On ${planExpiry}`}</div>
        <div className="absolute" style={pieChartStyles}>
          <PieChartComponent
            remaining_data={remaining_data}
            used_data={used_data}
            used_today={today_consumed_data}
          />
        </div>
        <div className="vbc-app-upload-download  mt-2">
          <div className="vbc-app-upload">
            Upload<span style={iconStyles} ><UploadIcon style={inlineDisplay} height={iconHeightgb} width={iconWidthgb} /></span>
            &nbsp;: 	&nbsp;<span className="data-info-text mt-1">{uploadGB ? (
              parseFloat(uploadGB).toFixed(1)
            ) : (
              "0"
            )}GB</span>
          </div>
          <div className="vbc-app-download">
            Download<span style={iconStyles}><DownloadIcon style={inlineDisplay} height={iconHeightgb} width={iconWidthgb} /></span>
            &nbsp; : 	&nbsp;<span className="data-info-text mt-1">{downloadGB ? (
              parseFloat(downloadGB).toFixed(1)
            ) : ("0")}GB</span>
          </div>
        </div>
      </div>
      {/*  */}
    </React.Fragment>
  );
};

export default React.memo(DataBalanceCard);
