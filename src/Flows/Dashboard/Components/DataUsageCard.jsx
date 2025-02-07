import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { defaults } from "react-chartjs-2";
import {
  getModifiedChartData,
  getDownloadDataForChart,
  getTotalUploadDownloadConsumptionData,
} from "../../../Utils/Constants";
import { getDataUsageDashboardData } from "../../../Axios/";
import { externalTooltipHandler } from "./ExternalTooltip";
import { FormGroup, Input, Label, Col } from "reactstrap";
import { BsCalendar } from "react-icons/bs";
import moment from "moment";
defaults.scale.grid.drawOnChartArea = false;
defaults.plugins.legend.display = false;

const options = {
  plugins: {
    tooltip: {
      // Disable the on-canvas tooltip
      enabled: false,
      position: "nearest",
      external: externalTooltipHandler,
    },
    legend: {
      display: false, //This will do the task
    },
  },
  scales: {
    x: {
      display: true, // Hide X axis labels
      grid: {
        display: false,
      }
    },
    y: {
      grid: {
        display: true,
      }
    },
  },
};

const DataUsageCard = (props) => {
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [loading, setLoading] = useState(true);
  const [chartDataFromAPI, setChartDataFromAPI] = useState([]);
  const [uploadDownloadValue, setUploadDownloadValue] = useState("upload");
  const [dateRange, setDateRange] = useState({
    start_date: moment().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });
  const [dataRequestDependant, setDataRequestDependant] = useState("last7days");
  // const [selectBoxValue, setSelectBoxValue]= useState("last7days","last14days","last1month")
  const { chartData, used_data } = props;
  const modifiedData =
    uploadDownloadValue === "upload"
      ? getModifiedChartData(chartDataFromAPI || [])
      : getDownloadDataForChart(chartDataFromAPI || []);

  const { total_upload, total_download, total_consumption } =
    getTotalUploadDownloadConsumptionData(chartDataFromAPI);

  const data = (canvas) => {
    const ctx = canvas.getContext("2d");
    return {
      legend: {
        display: false,
      },
      // labels: new Array(Math.max(modifiedData.length, 14)).fill(""),
      labels: [...modifiedData.map((item) => item.date)],
      datasets: [
        {
          data: [...modifiedData.map((item) => item.value)],
          dates: [...modifiedData.map((item) => item.date)],
          labels: "This will be hidden",
          borderWidth: 1,
          borderRadius: 10,
          borderSkipped: "bottom",
          backgroundColor: "lightgray",
          hoverBackgroundColor: "#616C7C",
          maxBarThickness: 14,
          minBarLength: 20,
        },
      ],
    };
  };

  const select = {
    backgroundColor: "white",
    padding: "4px 15px 4px 5px",
    outline: "none",
  };
// useEffect(() => {
//   let startDate = moment().subtract(7, "day").format("YYYY-MM-DD");
//         let endDate = moment().format("YYYY-MM-DD");
//         setDateRange({
//           start_date: startDate,
//           end_date: endDate,
//         });
// },[])
  const handleDurationChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "customize": {
        let startDate = moment().format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setDateRange({
          start_date: startDate,
          end_date: endDate,
        });
        setShowCustomDatePicker(true);
        break;
      }
      case "last7days": {
        setShowCustomDatePicker(false);
        let startDate = moment().subtract(7, "day").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setDateRange({
          start_date: startDate,
          end_date: endDate,
        });
        setDataRequestDependant("last7days");
        // setSelectBoxValue("last7days");
        break;
      }
      case "last14days": {
        setShowCustomDatePicker(false);
        let startDate = moment().subtract(14, "day").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setDateRange({
          start_date: startDate,
          end_date: endDate,
        });
        setDataRequestDependant("last14days");
        // setSelectBoxValue("last14days");
        break;
      }
      case "last1month": {
        setShowCustomDatePicker(false);
        let startDate = moment().subtract(30, "day").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setDateRange({
          start_date: startDate,
          end_date: endDate,
        });
        setDataRequestDependant("last1month");
        break;
      }
      default: {
        setShowCustomDatePicker(false);
      }
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const body = {
          ...dateRange,
        };
        const response = await getDataUsageDashboardData(
          "/customers/web/dashboard",
          body
        );
        const { data } = response;
        let data_usage_by_date = [];
        if (data) {
          data_usage_by_date = data.data_usage_by_date;
        }
        setChartDataFromAPI(data_usage_by_date || []);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dataRequestDependant]);

  const handleUploadDownloadChange = (e) => {
    setUploadDownloadValue(e.target.value);
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setDateRange({
      ...dateRange,
      [name]: value,
    });
    name === "end_date" &&
      setDataRequestDependant(`fromDateChanged_${value.toString()}`);

    console.log(`fromDateChanged_${value.toString()}`);
  };

  return (
    <React.Fragment>
      <div className="vbc-app-data-usage-header mb-2">
        <h3 className="text-lg font-bold">Data Usage</h3>
      </div>
      <div className="vbc-app-data-usage-card px-10">
        <div className="vbc-app-data-usage-text">
          {/* <div className="text-left">
            <div>Data used till date</div>
            <h1>{used_data?(parseFloat(used_data).toFixed(2)) : ("0")}GB</h1>
          </div> */}
          <div className="text-right-container">
            <div className="text-right">
              {uploadDownloadValue === "upload" && (
                <span>
                  Total Upload: <b>{total_upload.toFixed(1)} GB</b>
                </span>
              )}
              {uploadDownloadValue === "download" && (
                <span>
                  Total Download: <b>{total_download.toFixed(1)} GB</b>
                </span>
              )}
              <FormGroup
                check
                className={"px-4 pr-2 text-xs flex justify-between items-center"}
              >
                <Input
                  name="upload_download"
                  type="radio"
                  value={"upload"}
                  checked={uploadDownloadValue === "upload"}
                  className={"mx-2"}
                  onChange={handleUploadDownloadChange}
                />{" "}
                <Label check>Upload</Label>
              </FormGroup>
              <FormGroup
                check
                className={"px-4 text-xs flex justify-between items-center"}
              >
                <Input
                  name="upload_download"
                  type="radio"
                  value={"download"}
                  checked={uploadDownloadValue === "download"}
                  className={"mx-2"}
                  onChange={handleUploadDownloadChange}
                />{" "}
                <Label check>Download</Label>
              </FormGroup>
              <FormGroup check className={"px-4 flex-grow"}>
                <Col sm={12} className={"vbc-select-input"}>
                  <BsCalendar /> &nbsp;
                  <Input
                    id="durationSelect"
                    name="select"
                    type="select"
                    onChange={handleDurationChange}
                    style={select}
                    // value={selectBoxValue}
                  >
                    <option value={"last7days"}>Last 7 Days</option>
                    <option value={"last14days"}>Last 14 Days</option>
                    <option value={"last1month"}>Last 1 Month</option>
                    {/* <option value={"customize"}>Customize</option> */}
                  </Input>
                </Col>
              </FormGroup>
            </div>
            {showCustomDatePicker && (
              <div className="datepicker-container">
                <FormGroup className="datepicker m-2">
                  <Label for="fromDate">From</Label>
                  <Input
                    id="fromDate"
                    name="start_date"
                    placeholder="date placeholder"
                    type="date"
                    onChange={handleDateChange}
                    value={dateRange.start_date}
                  />
                </FormGroup>
                <FormGroup className="datepicker m-2">
                  <Label for="toDate">To</Label>
                  <Input
                    id="toDate"
                    name="end_date"
                    placeholder="date placeholder"
                    type="date"
                    onChange={handleDateChange}
                    value={dateRange.end_date}
                  />
                </FormGroup>
              </div>
            )}
          </div>
        </div>
        {!loading && modifiedData.length > 0 ? (
          <Bar options={options} data={data} width={100} height={55} />
        ) : (
          <div>No data available</div>
        )}
      </div>
      {/*  */}
      <br/>
    </React.Fragment>
  );
};

export default React.memo(DataUsageCard);
