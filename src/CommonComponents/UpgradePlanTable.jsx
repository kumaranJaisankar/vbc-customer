import React from "react";
import DataTable from "react-data-table-component";
import { capitalizeString, getCorrectUnitForMoment } from "../Utils/Constants";
import {
  Input
} from "reactstrap";
const getColumns = (handleInputChange) => {
  const columns = [
    {
      id: "$id",
      name: "",
      selector: (row) => (
        <input
          type="radio"
          name="upgrade_plan"
          onChange={(e) => handleInputChange(e, row)}
          value={row?.id}
        ></input>
      ),
      width: "50px",
    },
    {
      id: "$package_name",
      name: "Package Name",
      // selector: (row) => capitalizeString(row.package_name),
      cell: (row) => (
        <span style={{ textTransform: "initial" }}>
          {capitalizeString(row?.package_name)}
        </span>
      ),
      sortable: true,
      left: true,
    },
    {
      id: "$download_speed",
      name: "Download Speed",
      selector: (row) => row?.download_speed + " Mbps",
      sortable: true,
      left: true,
    },
    {
      id: "$upload_speed",
      name: "Upload Speed",
      selector: (row) => row?.upload_speed + " Mbps",
      sortable: true,
      left: true,
    },
    {
      id: "$package_type",
      name: "Package Type",
      selector: (row) => row?.package_type,
      sortable: true,
      left: true,
    },
    {
      id: "$package_data_type",
      name: "Package Data Type",
      selector: (row) => row?.package_data_type,
      sortable: true,
      left: true,
    },
    {
      id: "$time_unit",
      name: "Validity",
      selector: (row) =>
        row.time_unit + " " + getCorrectUnitForMoment(row?.unit_type),
      sortable: true,
      left: true,
    },
    {
      id: "$total_plan_cost",
      name: "Total Plan Cost",
      selector: (row) => parseFloat(row?.total_plan_cost).toFixed(2),
      sortable: true,
      left: true,
    },
  ];

  return columns;
};


export const UpgradePlanTable = ({ data, handleSelectedPlanChange, setUpgradePlansData, filterPlan }) => {
  const handleInputChange = (e, row) => {
    handleSelectedPlanChange(e, row);
  };
  const cols = getColumns(handleInputChange);
  //filter search
  const handlesearchChange = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    result = filterPlan?.filter((ele) => {
      if (
        ele?.package_name?.toLowerCase().search(value) != -1
      )
        return ele;
    });
    setUpgradePlansData(result);
  };
  return (
    <React.Fragment>
      <Input
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search With Package Name"
        inputProps={{ "aria-label": "search google maps" }}
        onChange={(event) => handlesearchChange(event)}
        style={{border:"1px solid",width:"50%"}}
        className="searchfield"
      />
      <br/>  <br/>
      <DataTable
        data={data}
        columns={cols}
        fixedHeader
        fixedHeaderScrollHeight="400px"
      />
    </React.Fragment>
  );
};
