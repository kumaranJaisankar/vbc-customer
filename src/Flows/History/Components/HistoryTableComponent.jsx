import React, { useEffect, useState ,useMemo} from "react";
import DataTable from "react-data-table-component";
import { connect } from "react-redux";
import moment from "moment";
import { getSessionData } from "../../../Axios/index"
import Skeleton from "react-loading-skeleton";
import Box from "@mui/material/Box";

const TABLE_DATA = [
  {
    date: "12.15.2021",
    start_time: "10.02AM",
    end_time: "12.20PM",
    online_time: "2h 22m 00s",
    upload_GB: "2GB",
    download_GB: "4GB",
    total_GB: "6GB",
    session_id: "33241",
    ip_address: "192.168.44.34",
    device: "192.168.22.21",
  }
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

const InvoicesDataTable = (props) => {
  const { sessionHistoryTableData } = props;
  const [tableData, setTableData] = useState([]);

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
    setTableData(sessionHistoryTableData);
  }, []);


  const displayTotaltime = (seconds) => {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);

    var dDisplay = d > 0 ? d + (d == 1 ? " Day, " : " Days, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " Hour, " : " Hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Minute, " : " Minutes, ") : "";
    return dDisplay + hDisplay + mDisplay;
  };


  const columns = [
    {
      id: "$start_Time",
      name: "Start Time",
      selector: "acctstarttime",
      sortable: true,
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {moment(row.acctstarttime).subtract(5, 'hours').subtract(30, 'minutes').format("DD MMM YY,h:mm a")}
        </span>
      ),
    },
    {
      id: "$stop_time",
      name: "End Time",
      sortable: true,

      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {row.acctstoptime
            ? moment(row.acctstoptime).subtract(5, 'hours').subtract(30, 'minutes').format("DD MMM YY,h:mm a")
            : "N/A"}
        </span>
      ),
    },
    {
      id: "$online_time",
      name: "Online Time",
      selector: "acctsessiontime",
      sortable: true,
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {displayTotaltime(row.acctsessiontime)}
        </span>
      ),
    },
    {
      id: "$upload_GB",
      name: "Upload GB",
      selector: "acctoutputoctets",
      sortable: true,
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {parseFloat(row.acctoutputoctets / 1024 / 1024 / 1024).toFixed(2) +
            "GB"}
        </span>
      ),
    },
    {
      id: "$download_GB",
      name: "Download GB",
      selector: "acctinputoctets",
      sortable: true,
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {parseFloat(row.acctinputoctets / 1024 / 1024 / 1024).toFixed(2) +
            "GB"}
        </span>
      ),
    },
    {
      id: "$otal_GB",
      name: "Total GB",
      selector: "acctinputoctets",
      sortable: true,
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {parseFloat(row.acctoutputoctets / 1024 / 1024 / 1024 + row.acctinputoctets / 1024 / 1024 / 1024).toFixed(2) + "GB"}
        </span>
      ),
    },
    {
      id: "$ipaddress",
      name: "IP_Address",
      selector: "framedipaddress",
      cell: (row) => (
        <div className="ellipsis" title={row.framedipaddress}>
          {row.framedipaddress}
        </div>
      ),
    }
  ];

  // pagination
  const [sessionLists, updateSessionLists] = useState(
    {
      uiState: { loading: false },
      currentPageNo: 1,
      currentItemsPerPage: 10,
      pageLoadData: [],
      pageLoadDataForFilter: [],
      prevURI: null,
      nextURI: null,
      currentTab: "all",
      tabCounts: {},
      totalRows: "",
    },
  );

  const getQueryParams = () => {
    const { currentPageNo, currentItemsPerPage } = sessionLists;

    let queryParams = "";
    if (currentItemsPerPage) {
      queryParams += `limit=${currentItemsPerPage}`;
    }
    if (currentPageNo) {
      queryParams += `${queryParams ? "&" : ""}page=${currentPageNo}`;
    }


    return queryParams;
  };

  const fetchSessionList = () => {

    updateSessionLists((prevState) => ({
      ...prevState,
      uiState: {
        loading: true,
      },
    }));

    const queryParams = getQueryParams();

    getSessionData(`customers/enh/v2/data/${JSON.parse(localStorage.getItem("token")).username
      }/consumption?${queryParams}`)
      .then((response) => {
        const { data } = response;
        const { count, results, next, previous, page } = data;
        updateSessionLists((prevState) => ({
          ...prevState,
          currentPageNo: page,
          pageLoadData: [...results],
          prevURI: previous,
          nextURI: next,
          totalRows: count,
        }));
      })

      .catch(function (error) {
        const errorString = JSON.stringify(error);
        const is500Error = errorString.includes("500");
        const is404Error = errorString.includes("404");
        if (error.response && error.response.data.detail) {

        } else if (is500Error) {

        } else if (is404Error) {

        } else {
        }
      })

      .finally(function () {
        updateSessionLists((prevState) => ({
          ...prevState,
          uiState: {
            loading: false,
          },
        }));
      })

  }

  useEffect(() => {
    fetchSessionList();
  }, [
    sessionLists.currentPageNo,
    sessionLists.currentItemsPerPage,
  ])

  const handlePerRowsChange = (newPerPage, page) => {
    updateSessionLists((prevState) => ({
      ...prevState,
      currentPageNo: page,
      currentItemsPerPage: newPerPage,
    }));
  };

  const handlePageChange = (page) => {
    updateSessionLists((prevState) => ({
      ...prevState,
      currentPageNo: page,
    }));
  };
  return (
    <React.Fragment>

      <div className="mx-10">
        <DataTable
          columns={columns}
          data={sessionLists.pageLoadData || []}
          pagination
          // selectableRows
          onSelectedRowsChange={handleSelectedRowChange}
          customStyles={customStyles}
          conditionalRowStyles={conditionalRowStyles}
          highlightOnHover
          pointerOnHover
          paginationServer
          paginationTotalRows={sessionLists.totalRows}
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          progressComponent={
            <SkeletonLoader loading={sessionLists?.uiState.loading} />
          }
          progressPending={sessionLists.uiState?.loading}
        />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const { sessionHistoryTableData } = state.sessionHistory;
  return {
    sessionHistoryTableData,
  };
};

const SkeletonLoader = ({ loading }) => {
  const tableData = useMemo(
    () => (loading ? Array(10).fill({}) : []),
    [loading]
  );

  return (
    <Box sx={{ width: "100%", pl: 2, pr: 2 }}>
      {tableData.map((_) => (
        <Skeleton height={50} />
      ))}
    </Box>
  );
};
export default connect(mapStateToProps, null)(InvoicesDataTable);
