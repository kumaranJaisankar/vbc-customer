import { sidePaneUIStatus } from "./constants";

export const updateRenewPlanUIStatus = (payload) => {
  return {
    type: sidePaneUIStatus.showRenewPane,
    payload,
  };
};

export const updateUpgradePlanUIStatus = (payload) => {
  return {
    type: sidePaneUIStatus.showUpgradePane,
    payload,
  };
};
export const updateChangePlanUIStatus = (payload) => {
  return {
    type: sidePaneUIStatus.showChangePane,
    payload,
  };
};
export const updateInvoicePDFUIStatus = (payload) => {
  return {
    type: sidePaneUIStatus.showInvoicePane,
    payload,
  };
};


export const setAllOrPartialPlansFetch = (payload) => {
  return {
    type: sidePaneUIStatus.setAllOrPartialPlansFetch,
    payload
  }
}
