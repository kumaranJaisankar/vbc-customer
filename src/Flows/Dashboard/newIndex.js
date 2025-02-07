import React, { useEffect, useState } from "react";
import AutoScrollBanner from "./Components/AutoScrollBanner";
import AdvertisementsCard from "./Components/AdvertisementsCard";
import DataBalanceCard from "./Components/DataBalanceCard";
import DataUsageCard from "./Components/DataUsageCard";
import TitleComponent from "../../CommonComponents/TitleComponent";
import UploadDownloadCard from "./Components/UploadDownloadCard";
import YourPlanCard from "./Components/YourPlanCard";
import "./DashboardComponents.style.css";
import { getDashboardData } from "../../Axios";
import { getFormattedDate } from "../../Utils/Constants";
import { connect } from "react-redux";
import { setSessionHistoryTableData } from "../../Redux/SessionHistory/actions";
import { setDashBoardData } from "../../Redux/Dashboard/actions";
import { updateRenewPlanUIStatus } from "../../Redux/Common/actions";
import RenderButtons from "../../CommonComponents/RenderButtons";
import { Alert } from "../../CommonComponents/Alert";
import { Row, Col } from "reactstrap";
import moment from "moment";
import WalletDetails from "../Dashboard/Components/Wallet";
const VBC_APP_CARDS_CONTAINER_CLASS = "vbc-app-cards-container";

const Dashboard = (props) => {
  const [DashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    (async function () {
      try {
        const response = await getDashboardData("/customers/web/app");
        const { data } = response;
        console.log(data);
        setDashboardData(data);
        props.setDashBoardData(data);
        props.setSessionHistoryTableData(
          data.session_history.map((row, index) => ({
            ...row,
            selected: false,
            id: `INVOICE${index}`,
          })) || []
        );
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const downloadGB = DashboardData && DashboardData.this_month_download_data;
  // DashboardData.total_data_usage.Total_download;
  const uploadGB = DashboardData && DashboardData.this_month_upload_data;
  const customerID = DashboardData && DashboardData.customer_id;
  console.log(customerID, "customerID");
  // DashboardData.total_data_usage.Total_upload;
  const {
    username,
    mobile_number,
    plan_cost,
    plan_name,
    plan_end,
    // session_history,
    session_data,
    total_plan_data,
    today_consumed_data,
    thismonth_consumed_data,
    plan_time_unit,
    plan_unit_type,
    plan_download,
    plan_upload,
  } = DashboardData || {};
  const yourPlanCardData = {
    username,
    mobile_number,
    plan_cost,
    plan_name,
    total_plan_data,
    today_consumed_data,
    thismonth_consumed_data,
    plan_time_unit,
    plan_unit_type,
    plan_download,
    plan_upload,
  };

  const planExpiry = getFormattedDate(plan_end || "");

  const dataBalanceInfo = {
    planExpiry,
    total_plan_data: total_plan_data || [],
    session_data: session_data || {},
    thismonth_consumed_data: thismonth_consumed_data || 0,
    today_consumed_data: today_consumed_data || 0,
  };

  const used_data =
    Object.keys(session_data || {}).length > 0
      ? parseFloat(session_data.Total_data_usage).toFixed(1)
      : "XX";

  const dataUsageInfo =
    (DashboardData && DashboardData.total_data_usage_history) || [];

  const start = moment().format("YYYY-MM-DD");
  const end = moment(plan_end);
  const remainingDays = moment.duration(end.diff(start)).asDays().toFixed(0);
  console.log(remainingDays,"remainingDays")
  const message =
    remainingDays > 0
      ? `Your account will expire on ${moment(plan_end).format("DD-MMM-YYYY")}.`
      : `Your account has expired on ${moment(plan_end).format("DD-MMM-YYYY")}.`;
  const datealert = () => {
    if (moment.duration(end.diff(start)).asDays() < 7) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    plan_end !== undefined && datealert();
  }, [plan_end]);

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleRenewAccountClick = (e) => {
    e.preventDefault();
    props.updateRenewPlanUIStatus({
      showRenewPane: true,
      showUpgradePane: false,
      showChangePane: false,
      showInvoicePane: false,
    });
  };

  return (
    <React.Fragment>
      <div className="mb-4">
        <AutoScrollBanner />
      </div>
      <Row>
        <Col className="w-full">
          <TitleComponent title={"Dashboard"}>
            {showAlert && (
              <Alert
                message={
                  <span>
                    {message}{" "}
                      <a
                        className={"cursor-pointer w-fit"}
                        onClick={handleRenewAccountClick}
                      >
                        <b style={{ color: "blue" }}>Renew</b>
                      </a>
                    {" your account now"}
                  </span>
                }
                onClose={handleAlertClose}
              />
            )}
          </TitleComponent>
        </Col>
      </Row>
      <div className={`grid grid-cols-10 grid-rows-8 gap-6 mx-10`}>
        <>
          <div
            className={`item1 col-span-10 xl:col-span-3 lg:col-span-4 md:col-span-5 sm:col-span-8 row-span-2`}
          >
            <YourPlanCard {...yourPlanCardData} loading={loading} />
          </div>
          <div
            className={`item2 col-span-10 xl:col-span-4 lg:col-span-5 md:col-span-8 sm:col-span-10 row-span-2`}
          >
            <DataBalanceCard {...dataBalanceInfo} loading={loading} downloadGB={downloadGB}
              uploadGB={uploadGB} />
          </div>
          <div
            className={`item3 col-span-10 xl:col-span-3 lg:col-span-4 md:col-span-5 sm:col-span-8 row-span-5`}
          >
            <WalletDetails
              customerID={customerID}
              DashboardData={DashboardData}
            />
            <AdvertisementsCard />
          </div>
          <div
            className={`item4 col-span-10 xl:col-span-7 lg:col-span-8 md:col-span-10 row-span-3`}
          >
            <DataUsageCard
              {...{ chartData: dataUsageInfo, used_data }}
              loading={loading}
            />
          </div>
        </>
      </div>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSessionHistoryTableData: (payload) =>
      dispatch(setSessionHistoryTableData(payload)),
    setDashBoardData: (payload) => dispatch(setDashBoardData(payload)),
    updateRenewPlanUIStatus: (payload) =>
      dispatch(updateRenewPlanUIStatus(payload)),
  };
};
export default connect(null, mapDispatchToProps)(Dashboard);
