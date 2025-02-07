import React, { useEffect, useState } from "react";
import SidePaneHOC from "./SidePaneHOC";
import { UpgradePlanTable } from "./UpgradePlanTable";
import PaymentList from "./paymentlist";
import { getUpgradePlaData, getAllPlansData, getPlanPayment } from "../Axios";
import { CgClose } from "react-icons/cg";
import { ReactComponent as ArrowIcon } from "../Assets/all_plans_arrow.svg";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader } from "reactstrap";
import { capitalizeString } from "../Utils/Constants";
import moment from "moment";
const headerStyle = {
  backgroundColor: "rgb(63 120 233 / 100%)",
  color: "white",
  position: "sticky",
  top: "0",
  zIndex: "999",
};
const iconFillColor = "#3f78e9";
const iconHeight = 25;
const iconWidth = 25;
const icondisplay = {
  display: "initial",
};
const UpgradePlanContent = (props) => {
  const { total_plan_cost } = props;
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const { onClose, allOrPartialPlans, setAllOrPartialPlansFetch } = props;
  const [upgradePlansData, setUpgradePlansData] = useState([]);
  // const Showupgradeplantoggle = () => setSelectedPlan(!selectedPlan);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAllPartial, setShowAllPartial] = useState(true);
  const [showpayment, setShowPayment] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [sucModal, setSucModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loadingPay, setLoadingPay] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const handleSelectedPlanChange = (e, rowData) => {
    const selected = e.target.value;
    const selectedPlan = upgradePlansData.find((item) => item.id === selected);
    setSelectedPlan(rowData);
  };

  const handleSeeAllPlansClick = () => {
    setAllOrPartialPlansFetch("all");
  };

  const handleGreaterThanPlansClick = () => {
    setAllOrPartialPlansFetch("partial");
  };

  useEffect(() => {
    const id = 10285;
    (async function () {
      try {
        let response = null;
        response = await getUpgradePlaData(`/plans/greater/${id}`);
        const { data } = response;
        setUpgradePlansData(data);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [allOrPartialPlans]);

  const submitdata = () => {
    if (!!selectedPaymentId) {
      setSucModal(true);
      setAlertMessage("Your payment is processing...");
      setLoadingPay(true);
      const obj = {
        amount: selectedPlan.total_plan_cost,
        gst_calculated: "true",
        source: "IP",
        gateway_id: selectedPaymentId,
      };
      getPlanPayment("payment/", obj).then((response) => {
        console.log(response.data, "payment");
        setUpgradePlansData({});

        paymentId(response.data);
      });
    } else {
      console.log("errors try again");
    }
  };

  const paymentId = (response) => {
    if (response.status == 2) {
      let billingbaseurl =
        process.env.REACT_APP_API_URL_PAYMENT_PLAN.split("//")[1];
      let protocol = window.location.protocol ? "wss:" : "ws:";
      var ws = new WebSocket(
        `${protocol}//${billingbaseurl}/ws/${response.payment_id}/listen/payment/status`
      );
      ws.onopen = () => {
        console.log("socket cnxn successful");
      };
      ws.onclose = (e) => {
        console.log("socket closed", e);
      };
      ws.onmessage = (e) => {
        console.log(e.data);
        let responseData = JSON.parse(e.data);
        if (responseData.status == 1) {
          ws.close();
          setLoadingPay(false);
          // props.Verticalcentermodaltoggle1();
        }
      };
    }
  };

  const successModal = () => {
    if (sucModal) {
      setLoadingPay(false);
    }
    setSucModal(!sucModal);
  };

  // duew date

const getcalculatedduedate = (startDate,time_unit,unit_type) =>{
  let addUnitType = "days"
  switch(unit_type){
    case "mon":
      addUnitType = "M"
      break;
    case "week":
      addUnitType = "W"
      break;
    case "day":
      addUnitType = "d"
      break;
    case "hour":
      addUnitType = "h"
      break;
    case "min":
      addUnitType = "m"
      break;
    default:
      {addUnitType ="d"}
  }

  const new_date = moment(startDate).add(time_unit, addUnitType).format("YYYY-MM-DD");
  console.log(addUnitType)
  console.log(new_date)
  return new_date;
} 

  return (
    <React.Fragment>
      <div className={`relative h-full`}>
        <div
          className="m-4"
          style={{
            height: "400px",
            border: "1px solid lightgray",
            borderRadius: "5px",
          }}
        >
          {!loading && (
            <UpgradePlanTable
              data={upgradePlansData}
              handleSelectedPlanChange={handleSelectedPlanChange}
            />
          )}
        </div>

        <p className={"ml-4"}>
          {Object.keys(selectedPlan).length > 0 && (
            <div className="mt-10">
              <>
                <h4 className="m-4">Selected Plan Details</h4>
                <section className="m-4">
                  <dl className="w-full">
                    <dt className="w-1/3">Plan Name</dt>
                    <dd>{capitalizeString(selectedPlan.package_name)}</dd>
                    <dt className="w-1/3">Download Speed</dt>
                    <dd>{selectedPlan.download_speed}</dd>
                    <dt className="w-1/3">Upload Speed</dt>
                    <dd>{selectedPlan.upload_speed}</dd>
                    <dt className="w-1/3">Validity</dt>
                    <dd>
                      {selectedPlan.time_unit +
                        " " +
                        selectedPlan.unit_type +
                        "(s)"}
                    </dd>
                    <dt className="w-1/3">Plan Cost</dt>
                    <dd>
                      {parseFloat(selectedPlan.total_plan_cost).toFixed(2)}
                    </dd>
                    <dt className="w-1/3">Expiry Date</dt>
                  <dd>{getcalculatedduedate(startDate,selectedPlan.time_unit, selectedPlan.unit_type)}</dd>
                  </dl>
                </section>
              </>
            </div>
          )}
        </p>

        <PaymentList
          showPayment={showpayment}
          submitdata={submitdata}
          setShowPayment={setShowPayment}
          setSelectedPaymentId={setSelectedPaymentId}
        />
      </div>
      {/*  */}

      <Modal isOpen={sucModal} toggle={successModal} centered>
        <ModalHeader toggle={successModal}>
          <div className="mb-4">Processing Request</div>
          <hr></hr>
        </ModalHeader>
        <ModalBody>
          <p className="mb-4">{alertMessage}</p>
        </ModalBody>
        <ModalFooter>
          <hr></hr>
          <Button className="primary-button mt-4">OK</Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default UpgradePlanContent;
