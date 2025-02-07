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

const VBC_APP_CARDS_CONTAINER_CLASS = "vbc-app-cards-container";

const Dashboard = (props) => {
  const [DashboardData, setDashboardData] = useState({});
  useEffect(() => {
    (async function () {
      try {
        const response = await getDashboardData("/customers/web/app");
        const { data } = response;
        console.log(data);
        setDashboardData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const downloadGB =
    DashboardData &&
    DashboardData.total_data_usage &&
    DashboardData.total_data_usage.Total_download;
  const uploadGB =
    DashboardData &&
    DashboardData.total_data_usage &&
    DashboardData.total_data_usage.Total_upload;
  const { username, mobile_number, plan_cost, plan_name, plan_end, plan_time_unit } =
    DashboardData || {};
  const yourPlanCardData = {
    username,
    mobile_number,
    plan_cost,
    plan_name,
    plan_time_unit
  };

  const planExpiry = getFormattedDate(plan_end || "");

  const dataUsageInfo =
    (DashboardData && DashboardData.total_data_usage_history) || [];

  return (
    <React.Fragment>
      <div className="mb-4">
        <AutoScrollBanner />
      </div>
      <TitleComponent
        title={"Dashboard"}
        renderButton={<button className="text-sm">Upgrade Plan</button>}
      />
      <div className={`${VBC_APP_CARDS_CONTAINER_CLASS} flex flex-wrap mx-10`}>
        <YourPlanCard {...yourPlanCardData} />
        <DataBalanceCard {...{ planExpiry }} />
        <div className="vbc-app-device-connected-upload-download-container min-w-250 md:min-w-280">
          <UploadDownloadCard downloadGB={downloadGB} uploadGB={uploadGB} />
        </div>
      </div>
      <div className="vbc-app-data-usage-advertisement-container mx-10">
        <DataUsageCard {...{ chartData: dataUsageInfo }} />
        <AdvertisementsCard />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
