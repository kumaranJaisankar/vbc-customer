import moment from "moment";
import { renderToStaticMarkup } from "react-dom/server";
import { jsPDF } from "jspdf";
import { InvoicePDF } from "../CommonComponents/InvoicePDF";
import { PaymentSuccess } from "../CommonComponents/PaymentSuccessCard";

export const SIDE_NAV_LINKS = [
  "Dashboard",
  "Invoices",
  "Sessions",
  "Complaints",
  "Documents"
  // "Settings",
  // "Refer_&_Earn",
];

export const ADDITIONAL_SIDE_NAV_LINKS = [];

export const capitalizeString = (string) => {
  return string && string.substr(0, 1).toUpperCase() + string.substr(1);
};

export const convertToUpperCase = (string) => {
  return string.toUpperCase();
};

export const getFormattedDate = (dateString) => {
  return moment(dateString).format("DD MMM YYYY");
};

export const getModifiedChartData = (data) => {
  if (data.length === 0) return [];
  else data.sort((A, B) => new Date(A.date) - new Date(B.date));
  return data.map((item) => ({ value: item.upload, date: item.date }));
};

export const getDownloadDataForChart = (data) => {
  if (data.length === 0) return [];
  else data.sort((A, B) => new Date(A.date) - new Date(B.date));
  return data.map((item) => ({ value: item.download, date: item.date }));
};

export const getTotalUploadDownloadConsumptionData = (data) => {
  let acc = {
    total_upload: 0,
    total_download: 0,
    total_consumption: 0,
  };

  return data.reduce((acc, item) => {
    return {
      total_upload: acc.total_upload + item.upload,
      total_download: acc.total_download + item.download,
      total_consumption: acc.total_consumption + item.total_data_consumption,
    };
  }, acc);
};

export const getCorrectUnitForMoment = (unit_type) => {
  switch (unit_type) {
    case "day":
    case "days":
    case "d":
      return "days";
    default:
      return "";
  }
};

export const validate = (value, type) => {
  const errors = {};
  const mobileNumberPattern =
    /^(?:(?:\+|0{0,2})91(\s*[\ -]\s*)?|[0]?)?[789]\d{9}|(\d[ -]?){10}\d$/;
  switch (type) {
    case "mobile_number": {
      if (!mobileNumberPattern.test(value)) {
        errors[type] = "Please enter a valid mobile number !";
      }
      return errors;
    }
    default: {
    }
  }
  return errors;
};

export const downloadPDF = (e) => {
  const html = renderToStaticMarkup(PaymentSuccess);

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    footer: {
      height: "10mm",
    },
    type: "pdf",
    timeout: 30000,
  };

  console.log(html);

  e.preventDefault();
  let doc = new jsPDF("landscape", "pt", "A4");
  doc.html(html, {
    callback: () => {
      doc.save("invoice.pdf");
    },
  });
};
