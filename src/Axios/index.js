import axios from "axios";
const tokenData = localStorage.getItem("token");
const customerID =JSON.parse(tokenData);
const getAccessToken = () => {
  const storageToken = localStorage.getItem("token");

  var tokenAccess = "";
  if (storageToken === null) {
    tokenAccess = "";
  } else {
    var token = JSON.parse(storageToken);
    tokenAccess = token.access;
  }
  return tokenAccess;
};

const getBaseConfig = () => {
  const base_config = {
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };

  return base_config;
};

export const authenticateUser = (url = "/accounts/customer/token", userdata) => {
  return axios({
    url,
    method: "post",
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    data: userdata,
  });
};

export const sendOTPToVerifyAndLogin = (
  url = "/accounts/customer/otp/send",
  userdata
) => {
  return axios({
    url,
    method: "post",
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    data: { ...userdata },
  });
};

export const loginWithOTP = (url = "/accounts/login", userdata) => {
  return axios({
    url,
    method: "post",
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    data: { ...userdata },
  });
};

export const getDashboardData = (url = "/customers/web/app") => {
  const tokenAccess = getAccessToken();
  return axios({
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    url,
  });
};

export const getPieChartData = (url = "/customers/analytics") => {
  const tokenAccess = getAccessToken();
  return axios({
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    url,
  });
};

export const getCustomerData = (url, data) => {
  return axios({
    ...getBaseConfig(),
    method: "post",
    url,
    data,
  });
};

export const getInvoicesData = (url, data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_PAYMENT_PLAN,
    method: "get",
    url,
  });
};


export const getSessionData = (url, data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "get",
    url,
  });
};

export const getBranchList = (url, data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_NETWORK_URL,
    method: "get",
    url,
  });
};

export const getComplaintsData = (url, data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "get",
    url,
  });
};

export const getAuditData = (url, data) => {
  return axios({
    ...getBaseConfig(),
    method: "post",
    url,
    data,
  });
};

export const getUpgradePlaData = (url = "/plans/greater") => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    method: "get",
    url,
  });
};

export const fetchCurrentPlanDetails = (url = "/plans/rud/") => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_UPGRADE_PLAN,
    method: "get",
    url,
  });
};

export const getAllPlansData = (url = "/plans/create") => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_UPGRADE_PLAN,
    method: "get",
    url,
  });
};

export const getPaymentGatewayList = (url = `/payment/cstmr/payment/gateways/${
  JSON.parse(localStorage.getItem("token")).id
}`) => {
  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    baseURL: process.env.REACT_APP_API_URL_PAYMENT_PLAN
  });
};
export const getPlanPaymentList = (url = "/payment/enabled/gateways") => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_PAYMENT_PLAN,
    method: "get",
    url,
  });
};
export const getPlanPayment = (url = "/payment", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_PAYMENT_PLAN,
    method: "post",
    url,
    data,
  });
};


// amout calculation
export const getAMountCalculation = (url = "/customers/get/renew/amount", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "post",
    url,
    data,
  });
};

// wallet priorcheck
export const getPriorCheck= (url = "/wallet/priorcheck", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_AUTH,
    method: "post",
    url,
    data,
  });
};

export const getAllComplaint = (url = "/customer/create/options", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_COMPLAINT_TYPE,
    method: "get",
    url,
    data,
  });
};

export const getDataUsageDashboardData = (
  url = "/customers/web/dashboard",
  data
) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "post",
    url,
    data,
  });
};

export const createComplaint = (url = "/customer/complaint", data) => {
  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "post",
    baseURL: process.env.REACT_APP_API_URL_COMPLAINT_TYPE,
    data,
  });
};


export const complaintList = (url = `/customer/${
  JSON.parse(localStorage.getItem("token")).username
}/tickets`, data,username) => {
  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    baseURL: process.env.REACT_APP_API_URL_COMPLAINT_TYPE,
    data,
    username,
  });
};




export const addFeedback = (url = "/ticket/rating", data) => {
  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "post",
    baseURL: process.env.REACT_APP_API_URL_COMPLAINT_TYPE,
    data,
  });
};


export const paymentAPI = (url = "/customers/onl/plan/renew/", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "patch",
    url,
    data
  });
};

export const paymentAPIUpgrade = (url = "/customers/plan/update/", data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "patch",
    url,
    data
  });
};

export const getRatingInfo = (url = "feedback/create/list") => {
  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    baseURL: process.env.REACT_APP_API_URL_COMPLAINT_TYPE,
  });
};


export const getDocumentsList = (url = `customers/get/documents/customer/${customerID.id}`) => {

  const tokenAccess = getAccessToken();
  return axios({
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenAccess}`,
    },
    method: "get",
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
  });
};
export const documentsUpgrade = (url = `customers/get/documents/customer/${customerID.id}`, data) => {
  return axios({
    ...getBaseConfig(),
    baseURL: process.env.REACT_APP_API_URL_DATA_URI,
    method: "patch",
    url,
    data
  });
};