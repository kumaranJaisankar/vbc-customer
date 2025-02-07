import React, { useEffect, useState, useMemo } from "react";
import DataTable from "react-data-table-component";
// import PrintDownloadIcons from "./PrintDownloadIcons";
import { ReactComponent as SelectIcon } from "../../../Assets/select.svg";
import { getInvoicesData } from "../../../Axios";
import { getCorrectUnitForMoment } from "../../../Utils/Constants";
import moment from "moment";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
// import { InvoicePDF } from "../../../CommonComponents/InvoicePDF";
// import { ReactComponent as PrintIcon } from "../../../Assets/print.svg";
// import { ReactComponent as DownloadIcon } from "../../../Assets/downloadTable.svg";
import { FaEye, FaDownload } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import Box from "@mui/material/Box";
const iconHeight = 20;
const iconWidth = 20;
const fillColor = "#3F79E9";
// Modifications for pagination by Marieya
// const getColumns = (loading) => {
//   const columns = [
//     {
//       id: "$invoice_id",
//       name: "Invoice ID",
//       selector: (row) => (loading ? <Skeleton /> : row.invoice_id),
//       sortable: true,
//       left: true,
//     },

//     {
//       id: "$created_at",
//       name: "Created Date",
//       selector: (row) => (loading ? <Skeleton /> : row.created_at),
//       cell: (row) => (
//         <span className="digits" style={{ textTransform: "initial" }}>
//           {" "}
//           {moment(row.created_at).format("DD MMM YYYY")}
//         </span>
//       ),
//       sortable: true,
//       left: true,
//     },

//     {
//       id: "$amount",
//       name: "Amount",
//       selector: (row) => (loading ? <Skeleton /> : row.payment.amount),
//       cell: (row) => (
//         <span>₹ {row.payment ? row.payment.amount : "--"}</span>
//       ),
//       sortable: true,
//       left: true,
//     },
// test
//     // {
//     //   id: "$status",
//     //   name: "Status",
//     //   // selector: (row) => row.status,
//     //   cell: (row) => {
//     //     return loading ? (
//     //       <Skeleton />
//     //     ) : (
//     //       <span
//     //         style={{
//     //           ...statusColorPicker(row.payment.status),
//     //         }}
//     //       >
//     //         {row.status}
//     //       </span>
//     //     );
//     //   },
//     //   sortable: true,
//     //   left: true,
//     //   width: "100px",
//     // },
//     {
//       name: "Download",
//       selector: "inv_download",
//       cell: (row) => {
//         return (
//           <>
//           {row?.invoice?.inv_download ?
//             <a
//               href={row.invoice && row.invoice.inv_download}
//               download
//             >
//               <FaDownload style={{color:"blue"}}/>
//             </a>:<FaDownload />}

//           </>
//         );
//       },
//       sortable: true,
//     },
//     {
//       name: "Preview",
//       selector: "name",
//       cell: (row) => {
//         return (
//           <>
//           {row?.invoice?.inv_preview ?
//             <a
//               href={row.invoice && row.invoice.inv_preview}
//               target="_blank"
//             >
//               <FaEye style={{color:"blue"}}/>
//             </a>: <FaEye />}
//           </>
//         );
//       },
//       sortable: true,
//     },

//     // {
//     //   id: "$actions",
//     //   name: "Actions",
//     //   cell: (row) =>
//     //     loading ? <Skeleton /> : <PrintDownloadIcons iconsList={row.actions} />,
//     //   button: true,
//     //   width: "100px",
//     // },
//   ];

//   return columns;
// };

const statusColorPicker = (currentStatus) => {
  switch (currentStatus) {
    case "Open":
      return {
        color: "#e46a14",
      };
    case "Paid":
      return {
        color: "#29d929",
      };
    case "Failed":
      return {
        color: "#b84546",
      };
    case "Pending":
      return {
        color: "#f5bc27",
      };
    default:
      return {};
  }
};

// const TABLE_DATA = [
//   {
//     id: "01",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Open",
//     actions: ["print", "download"],
//   },
//   {
//     id: "02",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Failed",
//     actions: ["print", "download"],
//   },
//   {
//     id: "03",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Pending",
//     actions: ["print", "download"],
//   },
//   {
//     id: "04",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Paid",
//     actions: ["print", "download"],
//   },
//   {
//     id: "05",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Paid",
//     actions: ["print", "download"],
//   },
//   {
//     id: "06",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Paid",
//     actions: ["print", "download"],
//   },
//   {
//     id: "07",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Paid",
//     actions: ["print", "download"],
//   },
//   {
//     id: "08",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Paid",
//     actions: ["print", "download"],
//   },
//   {
//     id: "09",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Open",
//     actions: ["print", "download"],
//   },
//   {
//     id: "010",
//     invoice_id: "14515",
//     plan: "VBC-100MB",
//     issued_on: "18-10-2021",
//     due_till: "10-11-2021",
//     description: "Elite plan with monthly prepaid plans",
//     payment_option: "UPI-Google Pay",
//     amount: 699,
//     status: "Pending",
//     actions: ["print", "download"],
//   },
// ];

// const data = TABLE_DATA.map((row) => ({ ...row, selected: false }));

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
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const columns = [
    {
      id: "invoice_id",
      name: "Invoice ID",
      selector: (row) => (loading ? <Skeleton /> : row.invoice_id),
      sortable: true,
      left: true,
      cell: (row) => <div>{row.invoice_id}</div>,
    },
    {
      id: "$created_at",
      name: "Created Date",
      selector: (row) => (loading ? <Skeleton /> : row.created_at),
      cell: (row) => (
        <span className="digits" style={{ textTransform: "initial" }}>
          {" "}
          {moment(row.created_at).format("DD MMM YYYY")}
        </span>
      ),
      sortable: true,
      left: true,
    },

    {
      id: "$amount",
      name: "Amount",
      selector: (row) => (loading ? <Skeleton /> : row.payment.amount),
      cell: (row) => <span>₹ {row.payment ? row.payment.amount : "--"}</span>,
      sortable: true,
      left: true,
    },

    // {
    //   id: "$status",
    //   name: "Status",
    //   // selector: (row) => row.status,
    //   cell: (row) => {
    //     return loading ? (
    //       <Skeleton />
    //     ) : (
    //       <span
    //         style={{
    //           ...statusColorPicker(row.payment.status),
    //         }}
    //       >
    //         {row.status}
    //       </span>
    //     );
    //   },
    //   sortable: true,
    //   left: true,
    //   width: "100px",
    // },
    {
      name: "Download",
      selector: "inv_download",
      cell: (row) => {
        return (
          <>
            {row?.invoice?.inv_download ? (
              <a href={row.invoice && row.invoice.inv_download} download>
                <FaDownload style={{ color: "blue" }} />
              </a>
            ) : (
              <FaDownload />
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Preview",
      selector: "name",
      cell: (row) => {
        return (
          <>
            {row?.invoice?.inv_preview ? (
              <a href={row.invoice && row.invoice.inv_preview} target="_blank">
                <FaEye style={{ color: "blue" }} />
              </a>
            ) : (
              <FaEye />
            )}
          </>
        );
      },
      sortable: true,
    },

    // {
    //   id: "$actions",
    //   name: "Actions",
    //   cell: (row) =>
    //     loading ? <Skeleton /> : <PrintDownloadIcons iconsList={row.actions} />,
    //   button: true,
    //   width: "100px",
    // },
  ];

  // pagination
  const [sessionLists, updateSessionLists] = useState({
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
  });

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

    getInvoicesData(
      `payment/V2/invoice/list/${
        JSON.parse(localStorage.getItem("token")).username
      }?${queryParams}`
    )
      .then((response) => {
        const { data } = response;
        const { count, results, next, previous, page } = data;
        console.log(data, "data");
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
      });
  };

  useEffect(() => {
    fetchSessionList();
  }, [sessionLists.currentPageNo, sessionLists.currentItemsPerPage]);

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

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await getInvoicesData(`/payment/invoice/list/${JSON.parse(localStorage.getItem("token")).username
  //         }`);
  //       const { data } = response;
  //       const tableData =
  //         (data.invoice &&
  //           data.invoice.map((row) => ({
  //             ...row,
  //             selected: false,
  //             ...(data.plan_data || {}),
  //             ...(data.cust_data || {}),
  //             due_till: getDueTill(row.completed_date, data.plan_data) || "",
  //           }))) ||
  //         [];
  //       setTableData(data);
  //       setLoading(false);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   })();
  // }, []);

  const getDueTill = (completedDate, planData) => {
    const { time_unit, unit_type } = planData;
    return moment(completedDate.split("T")[0])
      .add(time_unit, getCorrectUnitForMoment(unit_type))
      .format("YYYY-MM-DD");
  };

  return (
    <React.Fragment>
      <div className="flex">
        <h3 className="font-bold text-lg ml-11 mb-3">All Invoices</h3>
        <span className="ml-2 mt-1">
          <SelectIcon height={iconHeight} width={iconWidth} fill={fillColor} />
        </span>
      </div>
      <div className="mx-10">
        {/* <SkeletonTheme
          baseColor="#5294e0"
          highlightColor="#96c7ff"
          duration={4}
        >
          <DataTable
            // columns={getColumns(loading)}
            // data={tableData}
            columns={columns}
            data={sessionLists.pageLoadData || []}
            pagination
            paginationServer
            paginationTotalRows={sessionLists.totalRows}
            onChangeRowsPerPage={handlePerRowsChange}
            // selectableRows
            onSelectedRowsChange={handleSelectedRowChange}
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            highlightOnHover
            pointerOnHover
          />
        </SkeletonTheme> */}
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
export default InvoicesDataTable;
