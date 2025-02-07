import React, { useState } from "react";
import { SidePane } from "react-side-pane";
import { connect } from "react-redux";
import {
  updateRenewPlanUIStatus,
  updateUpgradePlanUIStatus,
  updateChangePlanUIStatus,
  updateInvoicePDFUIStatus,
  setAllOrPartialPlansFetch,
} from "../Redux/Common/actions";

const SidePaneHOC = (WrappedComponent, type) => {
  const NewComponent = (props) => {
    const [boolOptions, setBoolOptions] = useState({
      disableBackdropClick: false,
      disableEscapeKeyDown: false,
      disableRestoreFocus: false,
      hideBackdrop: false,
      allThemeColoured: false,
    });
    const [options, setOptions] = useState({
      duration: 250,
      offset: 10,
      width: 50,
    });
    const dispatchOpen = (closeFrom) => {
      if (closeFrom === "renew") {
        props.updateRenewPlanUIStatus({
          showRenewPane: false,
        });
      } else if (closeFrom === "upgrade") {
        props.updateUpgradePlanUIStatus({
          showUpgradePane: false,
        });
      } else if (closeFrom === "change") {
        props.updateChangePlanUIStatus({
          showChangePane: false,
        });
      } else if (closeFrom === "invoice") {
        props.updateInvoicePDFUIStatuse({
          showInvoicePane: false,
        });
      } else {
        props.updateUpgradePlanUIStatus({
          showRenewPane: false,
          showUpgradePane: false,
          showChangePane:false,
          showInvoicePane: false,
          showChangePane: false,
        });
      }
      props.setAllOrPartialPlansFetch("partial");
    };

    const getOpen = (type) => {
      switch (type) {
        case "renew": {
          return props.showRenewPane;
        }
        case "upgrade": {
          return props.showUpgradePane;
        }
        case "change": {
          return props.showChangePane;
        }
        case "invoice": {
          return props.showInvoicePane;
        }
        default: {
          return false;
        }
      }
    };
    const open = getOpen(type);

    return (
      <React.Fragment>
        <SidePane
          open={open}
          width={50}
          onClose={dispatchOpen}
          {...options}
          {...boolOptions}
          backdropStyle={
            boolOptions.allThemeColoured
              ? { backgroundColor: "rgba(63, 120, 233, 0.4)" }
              : {}
          }
          style={
            boolOptions.allThemeColoured
              ? { backgroundColor: "rgba(63, 120, 233, 01)" }
              : {}
          }
        >
          <WrappedComponent
            onClose={dispatchOpen}
            allOrPartialPlans={props.allOrPartialPlans}
            setAllOrPartialPlansFetch={props.setAllOrPartialPlansFetch}
            {...options}
            {...boolOptions}
            backdropStyle={
              boolOptions.allThemeColoured
                ? { backgroundColor: "rgba(63, 120, 233, 0.4)" }
                : {}
            }
            style={
              boolOptions.allThemeColoured
                ? { backgroundColor: "rgba(63, 120, 233, 01)" }
                : {}
            }
            email={props.dashboardData && props.dashboardData.email}
            name={props.dashboardData && props.dashboardData.username}
            contact={props.dashboardData && props.dashboardData.mobile_number}
            plan_end={props.dashboardData && props.dashboardData.plan_end}
            planId={props.dashboardData && props.dashboardData.plan_id}
            customerId={props.dashboardData && props.dashboardData.customer_id}
            areaId= {props.dashboardData && props.dashboardData.customer_area_id}
            static_ip_bind = {props?.dashboardData?.radius_info?.static_ip_bind}
            static_ip_cost={props?.dashboardData?.radius_info?.static_ip_cost}
            static_ip_total_cost={props?.dashboardData?.radius_info?.static_ip_total_cost}
            ippool={props?.dashboardData?.radius_info?.ippool}
            ippool_name={props?.dashboardData?.ippool_name}
            radiusId = {props?.dashboardData?.radius_info?.id}
            plan_time_unit={props.dashboardData?.plan_time_unit}
            balance_by_days={props.dashboardData?.balance_by_days}
            balanace_by_monthly={props.dashboardData?.balanace_by_monthly}
            static_ip_cgst={props.dashboardData?.radius_info?.static_ip_cgst}
            static_ip_sgst={props.dashboardData?.radius_info?.static_ip_sgst}
            wallet_info={props.dashboardData?.wallet_info}



          />
        </SidePane>
      </React.Fragment>
    );
  };

  return NewComponent;
};

const mapStateToProps = (state) => {
  const { showRenewPane, showUpgradePane,showChangePane, showInvoicePane, allOrPartialPlans } =
    state.common;
  const { dashboardData } = state.dashBoard;    
  return {
    showRenewPane,
    showUpgradePane,
    showChangePane,
    showInvoicePane,
    allOrPartialPlans,
    dashboardData
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRenewPlanUIStatus: (payload) =>
      dispatch(updateRenewPlanUIStatus(payload)),
    updateUpgradePlanUIStatus: (payload) =>
      dispatch(updateUpgradePlanUIStatus(payload)),
      updateChangePlanUIStatus: (payload) =>
      dispatch(updateChangePlanUIStatus(payload)),
    updateInvoicePDFUIStatus: (payload) =>
      dispatch(updateInvoicePDFUIStatus(payload)),
    setAllOrPartialPlansFetch: (payload) =>
      dispatch(setAllOrPartialPlansFetch(payload)),
  };
};

// This is important
export default (WrappedComponent, type) =>
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SidePaneHOC(WrappedComponent, type));
