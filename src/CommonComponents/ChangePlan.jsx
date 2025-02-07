import React, { useEffect, useState } from "react";
import SidePaneHOC from "./SidePaneHOC";
import { UpgradePlanTable } from "./UpgradePlanTable";
import PaymentList from "./paymentlist";
import {
  getUpgradePlaData,
  getPlanPayment,
  paymentAPIUpgrade, getPriorCheck, getBranchList, getAMountCalculation,
  getPaymentGatewayList
} from "../Axios";
import { SunspotLoader } from "react-awesome-loaders";
import { CgClose } from "react-icons/cg";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader, Container,Input,Label,Row  } from "reactstrap";
import { Alert } from "../CommonComponents/Alert";
import { capitalizeString } from "../Utils/Constants";
import moment from "moment";
import StaticIp from "./StaticIP"
import { useHistory } from "react-router-dom";
import PaymentStatusSuccessModal from "./PaymentStatusSuccessmodal";
import PaymentStatusPendingModal from "./PaymentStatusPendingModal";
import PaymentStatusFailUpgrade from "./PaymentStatusFailupgrde";
import ReconnectingWebSocket from "reconnecting-websocket";
import PaymentGatewayOptions from "./PaymentGatewayOptions";
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
const ChangePlan = (props) => {
  const areaid = props.areaId;
  console.log(props,"changeplan props")
  // staticIpBind
  const staticIpBind = props.static_ip_bind
  const staticCost = props.static_ip_cost
  const ipPoolId = props.ippool
  const radiusInfoId = props.radiusId
  const planTimtUnit = props.plan_time_unit
  const totalStatic = props.static_ip_total_cost
  const staticCgst = props.static_ip_cgst
  const statisSgst = props.static_ip_sgst
  const walletAmount = props.wallet_info
  const [paymentStatus, setPaymentStatus] = useState(false);
  const paymentStatusModal = () => {
    setPaymentStatus(!paymentStatus);
  };

  const [paymentPending, setPyamentpending] = useState(false);
  const paymentPendingModal = () => {
    setPyamentpending(!paymentPending);
  };
  const [paymentFail, setPyamentFail] = useState(false);
  const paymentFailModal = () => {
    setPyamentFail(!paymentPending);
  };
  // spinner
  const [loaderSpinneer, setLoaderSpinner] = useState(false)
  const { customerId } = props;
  const { onClose, allOrPartialPlans, setAllOrPartialPlansFetch } = props;
  const [upgradePlansData, setUpgradePlansData] = useState([]);
  const [filterPlan, setFIlterPlan] = useState([])
  const [selectedPlan, setSelectedPlan] = useState({});
  const [loading, setLoading] = useState(true);
  const [showAllPartial, setShowAllPartial] = useState(true);
  const [showpayment, setShowPayment] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [sucModal, setSucModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [loadingPay, setLoadingPay] = useState(false);
  const [showPaymentLinkSentModal, setPaymentLinkSentModal] = useState({
    message: "",
    uiStatus: false,
  });
  const [isRetry, showRetry] = useState(false);
  const [changeplan, setChangeplan] = useState({})

   // wallet amount 
   const [walletamountcheckbox, setWalletamountcheckbox] = useState(false);
   //handle click for check box
   const handleClick = (e) => {
    setWalletamountcheckbox(e.target.checked);
  };
  // toggle show for alreday static ip
  const [staticipToggle, setStaicIpToggle] = useState("on")
  const [staticshow, setStaticShow] = useState(staticIpBind ? true : false)
  function showStaticipToggle() {
    setStaicIpToggle(staticipToggle === "on" ? "off" : "on")
    setStaticShow(!staticshow)
  }
  // pool list
  const [ipPool, setIpPool] = useState([]);
  // static ip's and plan cost
  const [staticIP, setStaticIP] = useState([]);
  const [staticIPCost, setStaticIPCost] = useState({});
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [paymentGateways,setPaymentGateways]=useState([])
  const [selectedGatewayObj, setSelectedGatewayObj] = useState([]);
  const handleGatewayClick = (gateway) => {
    console.log("handleGatewayClick",gateway)
    setSelectedGateway(gateway?.id);
    setSelectedGatewayObj(gateway);
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await getPaymentGatewayList(
          `/payment/cstmr/payment/gateways/${
            JSON.parse(localStorage.getItem("token"))?.id
          }`
        );
        console.log(response?.data,"paymentGateways");
  setPaymentGateways(response?.data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);
  const history = useHistory();

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

  const handleChange = (e) => {
    setChangeplan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name == "ippool") {
      getStaticIP(e.target.value);
    }
  };
  useEffect(() => {
    const id = props.planId;
    const areaid = props.areaId;

    (async function () {
      try {
        let response = null;
        if (allOrPartialPlans === "all") {
          response = await getUpgradePlaData(`/accounts/loggedin/${areaid}/plans/${id}`);
        } else {
          response = await getUpgradePlaData(`/accounts/area/${areaid}/plans/${customerId}`);
        }
        const { data } = response;
        allOrPartialPlans === "all"
          ? setShowAllPartial(false)
          : setShowAllPartial(true);
        setUpgradePlansData(data);
        setFIlterPlan(response.data)
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

        listenToWebsocket(response.data.payment_id);
      });
    } else {
      console.log("errors try again");
    }
  };

  const listenToWebsocket = (payment_id) => {
    let billingbaseurl =
      process.env.REACT_APP_API_URL_PAYMENT_PLAN.split("//")[1];
    let protocol = window.location.protocol ? "wss:" : "ws:";
    var ws = new ReconnectingWebSocket(
      `${protocol}//${billingbaseurl}/ws/${payment_id}/listen/payment/status`
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
        setLoaderSpinner(false);
        setLoadingPay(false);
        paymentStatusModal(true);
      } else if (responseData.status == 2) {
        paymentPendingModal(true);
        setLoaderSpinner(true);
      } else if (responseData.status == 3) {
        paymentFailModal(true);
        setLoaderSpinner(true);
      } else {
        handleClose("invoice");
        showRetry(true);
      }
    };
  };

  const successModal = () => {
    if (sucModal) {
      setLoadingPay(false);
    }
    setSucModal(!sucModal);
  };

  // duew date

  const getcalculatedduedate = () => {
    const { startDate, time_unit, unit_type } = selectedPlan
    let addUnitType = "days";
    switch (unit_type) {
      case "mon":
        addUnitType = "M";
        break;
      case "week":
        addUnitType = "W";
        break;
      case "day":
        addUnitType = "d";
        break;
      case "hour":
        addUnitType = "h";
        break;
      case "min":
        addUnitType = "m";
        break;
      default: {
        addUnitType = "h";
      }
    }

    const new_date = moment(startDate)
      .add(time_unit, addUnitType)
      .format("DD MMM YYYY,h:mm a");
    return new_date;
  };


  // checking ippool asigning or not
  const hideandSHowIPool =
    staticshow ? {
      plan: selectedPlan.id,
      area: areaid,
      ippool: Number(changeplan?.ippool) ? Number(changeplan?.ippool) : Number(ipPoolId),
    }
      : {
        plan: selectedPlan.id,
        area: areaid,
      }
  // calculating cost
  const totalStaticCost = parseFloat(parseFloat(staticIPCost?.cost_per_ip * selectedPlan.time_unit
    ? staticIPCost?.cost_per_ip * selectedPlan.time_unit
    : 0
  )
  );
  const TotalGST = staticshow === true && selectedPlan?.plan_cgst === 0 ? (selectedPlan.total_plan_cost) * .18 : 0
  const checkGST = staticIpBind && TotalGST
  const staticipcost = staticshow ? (totalStatic / planTimtUnit) * selectedPlan.time_unit : null;
  const totalAmount = Number(totalStaticCost) + Number(selectedPlan.total_plan_cost) + Number(staticipcost) + Number(checkGST)



  // wallet priorcheck api call
  const PaymentUpgardeSubmit = () => {
    setLoaderSpinner(true);
    (async function (type) {
      try {
        const data = {
          plan: selectedPlan.id,
          area: areaid
        };
        const objwithPool = hideandSHowIPool
        const response = await getPriorCheck(`wallet/priorcheck`, Number(changeplan?.ippool) || ipPoolId ? objwithPool : data);
        if (response.data.check == true) {
          setLoaderSpinner(true);
          PaymentUpgardeplanSubmit()
        }
        if (response.data.check == false) {
          setLoaderSpinner(false);
        }
      } catch (e) {
        console.log(e);

      }
    })();
  }

  const withOutStatic = selectedPlan.time_unit * 212

  // Radius Info
  const hideandSHowstaticIP =
    staticshow ? {
      id: radiusInfoId ? radiusInfoId : null,
      static_ip_bind: changeplan.static_ip_bind ? changeplan.static_ip_bind : staticIpBind,
      ippool_id: changeplan.ippool ? changeplan.ippool : ipPoolId,

    }
      : null

      // const apiRequest = () => {
      //   // Simulate an API request with a 2-second delay
      //   return new Promise((resolve) => setTimeout(() => resolve("Success"), 2000));
      // };

  // amount calcualtion

  const [apiStatus, setApiStatus] = useState("idle");
  const [getCalculations, setGetCalculations] = useState()
  useEffect(() => {
    if (apiStatus === "pending" ) {
      setLoaderSpinner(true);
    } else {
      setLoaderSpinner(false);
    }
    (async function () {
      try {
        // apiRequest()
        const obj = {
          service_plan: selectedPlan.id,
          use_wallet:walletamountcheckbox,
        };
        if (staticshow === true) {
          obj.radius_info = hideandSHowstaticIP
        } else {
          delete obj.radius_info
        }
        console.log(obj, "obj")
        if (selectedPlan?.id ) {
          setLoaderSpinner(true);
          const response = await getAMountCalculation(`/customers/get/update/amount/${customerId}`, obj);
          const { data } = response;
          console.log(data);
          setGetCalculations(data);
          setApiStatus("success");
          setLoaderSpinner(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [selectedPlan, staticshow,walletamountcheckbox])
  // upgarde api
  const PaymentUpgardeplanSubmit = () => {
    showRetry(false);
    (async function (type) {
      try {
        const data = {
          ...getCalculations
          // plan: selectedPlan.id,
          // amount: parseFloat(totalAmount),
          // use_wallet: false,
          // radius_info: hideandSHowstaticIP,
        };
        data.plan = selectedPlan.id
        delete data.balance
        delete data.discount_amount
        if(selectedGatewayObj){
          data.payment_gateway_id=selectedGatewayObj?.id;
          data.payment_gateway_type=selectedGatewayObj?.gateway_type;
        }
        const response = await paymentAPIUpgrade(
          `/customers/enh/onl/plan/update/${customerId}`,
          data
        );
        if (response.status === 204) {
          paymentStatusModal(true);
        }
        if (response.data.route == true) {
          setLoaderSpinner(true);
          listenToWebsocket(response.data.payment_id);
          var win = window.open(`${response.data.next}`, "_blank");
          win && win?.focus();
        }
      } catch (e) {
        console.log(e);
        setLoaderSpinner(false);
        setPaymentLinkSentModal({
          message: "Something went wrong! Please try again.",
          uiStatus: true,
        });
      }
    })();
  };

  const totalcost = parseFloat(selectedPlan.total_plan_cost).toFixed(2);


  // branch list for getting ippools
  useEffect(() => {

    (async function () {
      try {
        const response = await getBranchList(`network/ippool/${areaid}/get`);
        setIpPool([...response.data]);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  // static ip
  const getStaticIP = (val) => {
    getBranchList(`network/ippool/used_ips/${val}`).then((res) => {
      console.log(res.data,"res.data")
      let { available_ips } = res.data;
      setStaticIP([...available_ips]);
      setStaticIPCost(res.data)
    });
  };


  return (
    <React.Fragment>
      <div className={`relative h-full overflow-scroll`}>
        <div
          className="flex items-center justify-between p-4"
          style={{ ...headerStyle }}
        >
          <h2 className="flex-start">
            <a className="link" href="#" onClick={handleSeeAllPlansClick}>
              Change Plan
            </a>

          </h2>
          <CgClose
            onClick={() => handleClose("invoice")}
            className="yourCloseIconClass"
            // style={{
            //   height: iconHeight,
            //   width: iconWidth,
            //   cursor: "pointer",
            // }}
          />
        </div>

        {isRetry && (
          <Alert
            color="info"
            onClose={() => showRetry(false)}
            message="Something went wrong. Please"
            anchor
            anchorText="retry"
            onAnchorClick={PaymentUpgardeSubmit}
          ></Alert>
        )}

        <div className="m-4 p-2  upgrade-plan-table-height">
          {!loading && (
            <UpgradePlanTable
              data={upgradePlansData}
              handleSelectedPlanChange={handleSelectedPlanChange}
              setUpgradePlansData={setUpgradePlansData}
              filterPlan={filterPlan}
            />
          )}
        </div>

        <p className={"ml-4"}>


          <Modal
            isOpen={showPaymentLinkSentModal.uiStatus}
            toggle={() =>
              setPaymentLinkSentModal((prevState) => ({
                ...prevState,
                uiStatus: !showPaymentLinkSentModal.uiStatus,
              }))
            }
            centered
            backdrop={true}
          >
            <ModalBody>
              <br />
              <h4>{showPaymentLinkSentModal.message}</h4>
              <br />
            </ModalBody>
            <br />
            <ModalFooter style={{ textAlign: "center" }}>
              <button
                className="text-sm primary-button mr-2 marquee"
                onClick={() => {
                  setPaymentLinkSentModal((prevState) => ({
                    ...prevState,
                    uiStatus: !showPaymentLinkSentModal.uiStatus,
                  }));
                }}
              >
                {"Ok"}
              </button>
            </ModalFooter>
          </Modal>
          {Object.keys(selectedPlan).length > 0 && (
            <div className="mt-10">
              <>
                <h4 className="m-4">Selected Plan Details</h4>
                <section className="m-4">
                  <dl className="w-full">
                    <dt className="w-1/3">Plan Name</dt>
                    <dd>{capitalizeString(selectedPlan.package_name)}</dd>
                    <dt className="w-1/3">Download Speed</dt>
                    <dd>{selectedPlan.download_speed} Mbps</dd>
                    <dt className="w-1/3">Upload Speed</dt>
                    <dd>{selectedPlan.upload_speed} Mbps</dd>
                    <dt className="w-1/3">Validity</dt>
                    <dd>
                      {selectedPlan.time_unit +
                        " " +
                        selectedPlan.unit_type +
                        "(s)"}
                    </dd>
                    <dt className="w-1/3">Plan Cost</dt>
                    <dd>{totalcost}</dd>
                    <dt className="w-1/3">Final Amount To Be Paid</dt>
                    <dd>{getCalculations?.amount}</dd>
                    <dt className="w-1/3">Current Expiry Date</dt>
                    <dd>{moment(props.plan_end).format("DD MMM YYYY,h:mm a")}</dd>
                    <dt className="w-1/3">Start Date</dt>
                    <dd>{moment().format("DD MMM YYYY,h:mm a")}</dd>
                    <dt className="w-1/3">Next Expiry Date</dt>
                    <dd>
                      {getcalculatedduedate(
                        selectedPlan.time_unit,
                        selectedPlan.unit_type
                      )}
                    </dd>
                  </dl>
                </section>
              </>
            </div>
          )}

        </p>
        <br/><br/>
        {filterPlan &&
        <Container fluid={true}>
            <Row className="m-4">
            <Input
              id="checkbox1"
              type="checkbox"
              onChange={handleClick}
              checked={walletamountcheckbox}
              name="use_wallet"
            />&nbsp;&nbsp;
            <Label
              for="checkbox1"
              style={{ fontWeight: "bold" }}
            >
              Wallet Amount : &nbsp;&nbsp;₹{walletAmount}
            </Label>
            </Row>
          </Container>
}

        {selectedPlan?.total_plan_cost && <>
          <br /><br /><br /> <br /><br /><br /> <br /><br /><br /><br />
        </>}
        <>
          {staticIpBind && <span style={{ position: "relative", top: "30px" }}>
            &nbsp;  &nbsp; Static IP :

            <div
              className={`franchise-switch ${staticipToggle}`}
              onClick={showStaticipToggle} />
          </span>
          }
        </>
        <div style={{ position: "relative", top: "30px" }}>

          <StaticIp ipPool={ipPool} handleChange={handleChange}
            renewPlan={changeplan} staticIP={staticIP}
            staticshow={staticshow} staticIpBind={staticIpBind}
            staticCost={totalStatic}
            staticIPCost={staticIPCost} />
        </div>
        <PaymentList
          showPayment={showpayment}
          submitdata={submitdata}
          setShowPayment={setShowPayment}
          setSelectedPaymentId={setSelectedPaymentId}
        />
       <br/>
        <div className="relative h-2/6 mt-10 mb-10 ml-4">
          <div className="absolute">
          
          <PaymentGatewayOptions  paymentGateways={paymentGateways} selectedGateway={selectedGateway} handleGatewayClick={handleGatewayClick} setSelectedGatewayObj={setSelectedGatewayObj}/>
            {selectedPlan?.total_plan_cost && getCalculations? (
              <Button className="primary-button" onClick={PaymentUpgardeSubmit} disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer} >
                {loaderSpinneer ? <SunspotLoader
                  gradientColors={["#6366F1", "#E0E7FF"]}
                  shadowColor={"#3730A3"}
                  desktopSize={"10px"}
                  mobileSize={"10px"}
                /> : null}Change
                {/* {loadingPay && !isRetry ? " Payment Processing " : "Change"} */}
              </Button>
            ) : (
              <Button
                className="primary-button"
                disabled={true}
                style={{ backgroundColor: "gray", cursor: "not-allowed" }}
              >
                {"Change "}
              </Button>
            )}

            <button className="primary-button ml-2" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
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

      <PaymentStatusSuccessModal
        paymentStatus={paymentStatus}
        paymentStatusModal={paymentStatusModal}
      />
      <PaymentStatusPendingModal
        paymentPending={paymentPending}
        paymentPendingModal={paymentPendingModal}
      />
      <PaymentStatusFailUpgrade
        paymentFailModal={paymentFailModal}
        paymentFail={paymentFail}
        PaymentUpgardeSubmit={PaymentUpgardeSubmit}
      />
    </React.Fragment>
  );
};

export default SidePaneHOC(ChangePlan, "change");
