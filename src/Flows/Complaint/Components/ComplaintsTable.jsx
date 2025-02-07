import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import RatingComponent from "./RatingComponent";
import { complaintList, getRatingInfo } from "../../../Axios";
import { Redirect } from "react-router-dom";
import {
  capitalizeString,
  getCorrectUnitForMoment,
} from "../../../Utils/Constants";
import { FormGroup, Input, Col, Label } from "reactstrap";
import moment from "moment";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AddComplaints from "./addcomplaints";
import { connect } from "react-redux";
import { setRatingInfo } from "../../../Redux/Complaints/actions";

const iconHeight = 20;
const iconWidth = 20;
const fillColor = "#3F79E9";

const getColumns = (loading, customer_id, rating) => {
  const columns = [
    {
      id: "$id",
      name: "Complaint ID",
      selector: (row) => (loading ? <Skeleton /> : row.id),

      sortable: true,
      left: true,
    },
    {
      id: "$issued_on",
      name: "Created Date",
      selector: (row) =>
        loading ? <Skeleton /> : capitalizeString(row.created),
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {moment(row.created).format("DD MMM YYYY")}
        </span>
      ),
      sortable: true,
      left: true,
    },

    {
      id: "$description",
      name: "Complaint Type",
      selector: (row) =>
        loading ? <Skeleton /> : row.ticket_category.category,
      sortable: true,
      left: true,
    },
    {
      id: "$description",
      name: "Sub Complaint Type",
      selector: (row) => (loading ? <Skeleton /> : row.sub_category.name),
      sortable: true,
      left: true,
    },
    {

      name: "Status",
      selector: "status",
      sortable: true,

      cell: (row) => (
        <div >
          {row.status === "OPN" ? (
            <span>
              &nbsp; Open
            </span>
          ) : row.status === "ASN" ? (
            <span>
              &nbsp; Assigned
            </span>
          ) : row.status === "RSL" ? (
            <span>
              &nbsp; Resolved
            </span>
          ) : row.status === "INP" ? (
            <span>
              &nbsp; In-Progress
            </span>
          ) : row.status === "CLD" ? (
            <span>
              &nbsp; Closed
            </span>
          ) : (
            ""
          )}
        </div>
      ),
    },

    {
      id: "$due_till",
      name: "Updated Date",
      selector: (row) => (loading ? <Skeleton /> : row.modified),
      cell: (row) => {
        return (
          <span>
            {row.modified
              ? moment(row.modified).format("DD MMM YYYY")
              : "---"}
          </span>
        );
      },
      sortable: true,
      left: true,
    },
    {
      id: "$customer_notes",
      name: "Description",
      selector: (row) => (loading ? <Skeleton /> : row.customer_notes),
      sortable: true,
      left: true,
    },

    {
      id: "$actions",
      name: "Ratings",
      cell: (row, id) =>
        loading ? (
          <Skeleton />
        ) : (
          <RatingComponent
            iconsList={row.actions}
            id={row.id}
            customer_id={customer_id}
            rating={row.rating}
          />
        ),
      button: true,
      width: "100px",
    },
  ];

  return columns;
};

const TABLE_DATA = [
  {
    id: "01",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "02",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "03",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "04",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "05",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "06",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "07",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "08",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",

    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "09",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
  {
    id: "010",
    invoice_id: "14515",
    plan: "VBC-100MB",
    issued_on: "18-10-2021",
    due_till: "10-11-2021",
    description: "INTERNET",
    payment_option: "UPI-Google Pay",
    amount: 699,
    status: "In Progress",
    actions: ["print", "download"],
  },
];

const data = TABLE_DATA.map((row) => ({ ...row, selected: false }));

const conditionalRowStyles = [
  {
    when: (row) => row.selected === true,
    style: {
      backgroundColor: "#deeaff",
      color: "#4079ea",
    },
  },
];

const customStyles = {
  headRow: {
    style: {
      border: "none",
      backgroundColor: "#f7f8fa",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "14px",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "#deeaff",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {},
};

const ComplaintsTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [tablerating, setTablerating] = useState({})
  const [loading, setLoading] = useState(true);
  const [startRatingInfoLoad, setStartRatingInfoLoad] = useState(false);
  const [showComplaintinfo, setShowComplaintinfo] = useState(false);
  const [startDateRange, setStartDateRange] = useState({
    start_date: moment().subtract(7, "day").format("YYYY-MM-DD"),
    end_date: moment().format("YYYY-MM-DD"),
  });
  const handleSelectedRowChange = ({ selectedRows }) => {
    const selectedRowIds = selectedRows.map((row) => row.id);
    const updatedTableData = tableData.map((row) => {
      return selectedRowIds.includes(row.id)
        ? {
            ...row,
            selected: true,
          }
        : { ...row, selected: false };
    });
    setTableData(updatedTableData);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await complaintList(
          `/customer/${
            JSON.parse(localStorage.getItem("token"))?.username
          }/tickets`
        );
        const { data } = response;

        setTableData([...data.tickets]);
        setTablerating(data);

        setLoading(false);
        setStartRatingInfoLoad(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    startRatingInfoLoad &&
      getRatingInfo("feedback/create/list")
        .then((response) => {
          const { data } = response;
          props.setRatingInfo(data);
          setStartRatingInfoLoad(false);
        })
        .catch((error) => {
          console.log("Something went wrong: ", error);
          setStartRatingInfoLoad(false);
        })
        .finally(function () {
          console.log("Done");
          setStartRatingInfoLoad(false);
        });
  }, [startRatingInfoLoad]);

  useEffect(() => {
  if(!props.ratingInfo){
    return;
  }
  let ticketIds = {};
  props.ratingInfo.forEach(item => {
    if(!ticketIds[item.ticket]){
      ticketIds[item.ticket] = item
    }
  })

  const modifiedTableData = tableData.map(item => {
    if(ticketIds[item.id])
    return {
      ...item, rating: ticketIds[item.id].rating
    }
    else
    return item;
  })

  setTableData(modifiedTableData);

  }, [props.ratingInfo])

  const select = {
    backgroundColor: "white",
    padding: "4px 15px 4px 5px",
    outline: "none",
  };



  const handleDateChange = (e) => {
    const { value } = e.target;
    switch (value) {
      case "customize": {
        let startDate = moment().format("YYYY-M       M-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setStartDateRange({
          start_Time: startDate,
          stop_time: endDate,
        });
        setShowComplaintinfo(true);
        break;
      }
      case "last7days": {
        let startDate = moment().format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setStartDateRange({
          start_Time: startDate,
          stop_time: endDate,
        });
        setShowComplaintinfo(false);
        break;
      }

      case "last14days": {
        let startDate = moment().subtract(14, "day").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setStartDateRange({
          start_Time: startDate,
          stop_time: endDate,
        });
        setShowComplaintinfo(false);
        break;
      }
      case "last1month": {
        let startDate = moment().subtract(30, "day").format("YYYY-MM-DD");
        let endDate = moment().format("YYYY-MM-DD");
        setStartDateRange({
          start_Time: startDate,
          stop_time: endDate,
        });
        setShowComplaintinfo(false);
        break;
      }
      default: {
        setShowComplaintinfo(false);
      }
    }
  };
  return (
    <React.Fragment>
       {/* <div>
        <FormGroup check className={"px-4 flex-grow"}>
          <Col
            sm={12}
            className={"vbc-select-input"}
            style={{ float: "right", marginTop: "-50px", marginRight: "17%" }}
          >
            <Input
              id="durationSelect"
              name="select"
              type="select"
              style={select}
              onChange={handleDateChange}
            >
              <option value={"last7days"}>Last 7 days</option>
              <option value={"last14days"}>Last 14 days</option>
              <option value={"last1month"}>Last 1 month</option>
              <option value={"customize"}>Customize</option>
            </Input>
          </Col>
        </FormGroup>
      </div> */}
      {showComplaintinfo && (
        <div className="datepicker-container" style={{ marginRight: "45px" }}>
          <FormGroup className="datepicker m-2">
            <Label for="fromDate">From</Label>
            <Input
              id="fromDate"
              name="start_date"
              placeholder="date placeholder"
              type="date"
              value={startDateRange.start_Time}
            />
          </FormGroup>
          <FormGroup className="datepicker m-2">
            <Label for="toDate">To</Label>
            <Input
              id="toDate"
              name="end_date"
              placeholder="date placeholder"
              type="date"
              value={startDateRange.stop_time}
            />
          </FormGroup>
        </div>
      )}
      <div className="mx-10">
        <p>Overall Rating : <b>{tablerating.overall_rating}</b></p>
        <SkeletonTheme
          baseColor="#5294e0"
          highlightColor="#96c7ff"
          duration={4}
        >
          {props.showaddCompliants ? (
            <AddComplaints
              setShowaddcomplaint={props.setShowaddcomplaint}
              setShowcomplaintsbuttons={props.setShowcomplaintsbuttons}
            />
          ) : (
            <DataTable
              columns={getColumns(loading, props.customer_id)}
              data={tableData}
              pagination
              // selectableRows
              onSelectedRowsChange={handleSelectedRowChange}
              customStyles={customStyles}
              conditionalRowStyles={conditionalRowStyles}
              highlightOnHover
              pointerOnHover
              render={() => {
                return <Redirect to={"/dashboard"} />;
              }}
            />
          )}
        </SkeletonTheme>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { ratingInfo } = state.complaints;
  return {
    ratingInfo: ratingInfo || []
  };
};

const mapDispatchToProps = (dispatch) => ({
  setRatingInfo: (payload) => dispatch(setRatingInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComplaintsTable);
