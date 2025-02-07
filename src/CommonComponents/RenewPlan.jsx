import React, { useState, useEffect } from "react";
import SidePaneHOC from "./SidePaneHOC";
import { PaymentSuccess } from "./PaymentSuccessCard";
import { fetchCurrentPlanDetails, paymentAPI, getBranchList, getPriorCheck, getAMountCalculation, getPaymentGatewayList } from "../Axios";
import { capitalizeString } from "../Utils/Constants";
import { CgClose } from "react-icons/cg";
import moment from "moment";
import { Modal, ModalBody, ModalFooter, Button, Container,Input,Label,Row } from "reactstrap";
import { Alert } from "../CommonComponents/Alert";
import { useHistory } from "react-router-dom";
import StaticIp from "./StaticIP"
import { SunspotLoader } from "react-awesome-loaders";
import PaymentStatusSuccessModal from "./PaymentStatusSuccessmodal";
import PaymentStatusPendingModal from "./PaymentStatusPendingModal";
import PaymentStatusFailModal from "./PaymentStatusfailedModal";
import ReconnectingWebSocket from "reconnecting-websocket";
import PaymentGatewayOptions from "./PaymentGatewayOptions";
const headerStyle = {
  backgroundColor: "rgb(63 120 233 / 100%)",
  color: "white",
};
const iconHeight = 25;
const iconWidth = 25;


const RenewPlan = (props) => {
  const areaid = props.areaId;
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
  // toggle show for alreday static ip
  const [staticipToggle, setStaicIpToggle] = useState("on")
  const [staticshow, setStaticShow] = useState(staticIpBind ? true : false)
  function showStaticipToggle() {
    setStaicIpToggle(staticipToggle === "on" ? "off" : "on")
    setStaticShow(!staticshow)
  }
  // spinner
  const [loaderSpinneer, setLoaderSpinner] = useState(false)
  // pool list
  const [ipPool, setIpPool] = useState([]);
  // static ip's and plan cost
  const [staticIP, setStaticIP] = useState([]);
  const [staticIPCost, setStaticIPCost] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [renewPlan, setRenewplan] = useState({});
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

  const { onClose, customerId } = props;
  const [isPaymentSuccess, setPaymentSuccess] = React.useState(false);
  const [currentPlanData, setCurrentPlanData] = useState({});
  const [renewUpgradeRadioValue, setRenewUpgradeRadioValue] = useState("renew");
  const [showPaymentLinkSentModal, setPaymentLinkSentModal] = useState({
    message: "",
    uiStatus: false,
  });
  const [getCalculations, setGetCalculations] = useState()

  const [isRetry, showRetry] = useState(false);

  const history = useHistory();
  // wallet amount 
  const [walletamountcheckbox, setWalletamountcheckbox] = useState(false);
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
   //handle click for check box
   const handleClick = (e) => {
    setWalletamountcheckbox(e.target.checked);
  };

  const handleClose = () => {
    setPaymentSuccess(false);
    onClose("renew");
  };

  useEffect(() => {
    const id = props.planId;
    (async function () {
      try {
        const response = await fetchCurrentPlanDetails(`/plans/rud/${id}`);
        const { data } = response;
        console.log(data);
        setCurrentPlanData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);




  const handleRadioButtonChange = (e) => {
    console.log(e);
    setRenewUpgradeRadioValue(e.target.value);
  };


  const handleChange = (e) => {
    setRenewplan((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (e.target.name == "ippool") {
      getStaticIP(e.target.value);
    }
  };

  const getcalculatedduedate = (plan_end, time_unit, unit_type) => {
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

    const new_date = moment(plan_end)
      .add(time_unit, addUnitType)
      .format("DD MMM YYYY,h:mm a");
    console.log(addUnitType);
    console.log(new_date);
    return new_date;
  };


  // checking ippool asigning or not
  const hideandSHowIPool =
    staticshow ? {
      plan: currentPlanData.id,
      area: areaid,
      ippool: Number(renewPlan?.ippool) ? Number(renewPlan?.ippool) : Number(ipPoolId),
    }
      : {
        plan: currentPlanData.id,
        area: areaid,
      }

  // calculating cost
  const totalStaticCost = parseFloat(
    parseFloat(
      staticIPCost?.cost_per_ip * planTimtUnit
        ? staticIPCost?.cost_per_ip * planTimtUnit
        : 0
    )
  );
  console.log(totalStaticCost, "totalStaticCost")
  const TotalGST = staticshow === true && currentPlanData?.plan_cgst === 0 ? (currentPlanData?.total_plan_cost) * .18 : "";
  const checkGST = staticIpBind && TotalGST
  const radiusInfostaticost = staticshow ? totalStatic : null;
  const totalamount = Number(totalStaticCost) + Number(currentPlanData.total_plan_cost) + Number(radiusInfostaticost) + Number(checkGST)




  // wallet priorcheck api 
  const PaymentSubmit = () => {
    setLoaderSpinner(true);
    (async function (type) {
      try {
        const data = {
          plan: currentPlanData.id,
          area: areaid
        };
        const objwithPool = hideandSHowIPool
        const response = await getPriorCheck(`wallet/priorcheck`, Number(renewPlan?.ippool) || ipPoolId ? objwithPool : data);
        if (response.data.check == true) {
          setLoaderSpinner(true);
          PaymentRenwSubmit()
        }
        if (response.data.check == false) {

        }
      } catch (e) {
        console.log(e);

      }
    })();
  }

  // Radius Info
  const hideandSHowstaticIP =
    staticshow ? {
      id: radiusInfoId ? radiusInfoId : null,
      static_ip_bind: renewPlan?.static_ip_bind ? renewPlan?.static_ip_bind : staticIpBind,
      ippool_id: renewPlan?.ippool ? renewPlan?.ippool : ipPoolId,

    } :
      null


      const [apiStatus, setApiStatus] = useState("idle");
  // amount calcualtion
  useEffect(() => {
    if (apiStatus === "pending" ) {
      setLoaderSpinner(true);
    } else {
      setLoaderSpinner(false);
    }
    (async function () {
      try {
        const obj = {
          service_plan: currentPlanData.id,
          use_wallet:walletamountcheckbox,
        };
        if (staticshow === true) {
          obj.radius_info = hideandSHowstaticIP
        } else {
          delete obj.radius_info
        }
        console.log(obj, "obj")
        if (currentPlanData?.id) {
          setLoaderSpinner(true);
          const response = await getAMountCalculation(`/customers/get/renew/amount/${customerId}`, obj);
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
  }, [currentPlanData, staticshow,walletamountcheckbox])

  // offline renew api
  const PaymentRenwSubmit = () => {

    (async function (type) {
      try {
        const data = {
          ...getCalculations
          // plan: currentPlanData.id,
          // amount: parseFloat(totalamount),
          // cgst: currentPlanData.plan_cgst,
          // sgst: currentPlanData.plan_sgst,
          // radius_info: hideandSHowstaticIP,
        };
        if(selectedGatewayObj){
          data.payment_gateway_id=selectedGatewayObj?.id;
          data.payment_gateway_type=selectedGatewayObj?.gateway_type;
        }
        const response = await paymentAPI(
          `/customers/enh/onl/plan/renew/${customerId}`,
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
        setLoaderSpinner(false);
        console.log(e);
        setPaymentLinkSentModal({
          message: "Something went wrong! Please try again.",
          uiStatus: true,
        });
      }
    })();
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
  // total plan cost

  const totalcost = parseFloat(currentPlanData.total_plan_cost).toFixed(2);

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
      let { available_ips } = res.data;
      setStaticIP([...available_ips]);
      setStaticIPCost(res.data)
    });
  };


  return (
    <React.Fragment>
      <div className={`relative h-full`}>
        <div
          className="flex items-center justify-between p-4"
          style={{ ...headerStyle }}
        >
          <h2 className="flex-start">Renew Plan</h2>
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
            onAnchorClick={PaymentSubmit}
          ></Alert>
        )}

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

        <div style={{ height: "500px", overflowY: "scroll" }}>
          {!isPaymentSuccess && (
            <>
              <h4 className="m-4">Plan Details</h4>
              <section className="m-4" style={{ height: "180px" }}>
                <dl className="w-full">
                  <dt className="w-1/3">Plan Name</dt>
                  <dd>{capitalizeString(currentPlanData.package_name)}</dd>
                  <dt className="w-1/3">Download Speed</dt>
                  <dd>{currentPlanData.download_speed} Mbps</dd>
                  <dt className="w-1/3">Upload Speed</dt>
                  <dd>{currentPlanData.upload_speed} Mbps</dd>
                  <dt className="w-1/3">Validity</dt>
                  <dd>
                    {currentPlanData.time_unit +
                      " " +
                      currentPlanData.unit_type +
                      "(s)"}
                  </dd>
                  <dt className="w-1/3">Plan Cost</dt>
                  <dd>{totalcost}</dd>
                  <dt className="w-1/3">Final Amount To Be Paid</dt>
                  <dd>{getCalculations?.amount}</dd>
                  <dt className="w-1/3">Email</dt>
                  <dd>{props.email}</dd>
                  <dt className="w-1/3">Current Expiry Date</dt>
                  <dd>{moment(props.plan_end).format("DD MMM YYYY,h:mm a")}</dd>
                  <dt className="w-1/3">Start Date</dt>
                  <dd>{moment(props.plan_end).format("DD MMM YYYY,h:mm a")}</dd>
                  <dt className="w-1/3">Next Expiry Date</dt>
                  <dd>
                    {getcalculatedduedate(
                      props.plan_end,
                      currentPlanData.time_unit,
                      currentPlanData.unit_type
                    )}
                  </dd>
                </dl>
              </section>
            </>
          )}
          <br /><br /><br />
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
          <br/><br/>
          {currentPlanData?.total_plan_cost &&
            <>
              {staticIpBind ? <>

                &nbsp;  &nbsp; Static IP :
                <div
                  className={`franchise-switch ${staticipToggle}`}
                  onClick={showStaticipToggle} /> </> :
                ""
              }
            </>
          }



          <StaticIp ipPool={ipPool} handleChange={handleChange}
            renewPlan={renewPlan} staticIP={staticIP}
            staticIPCost={staticIPCost} staticshow={staticshow}
            staticIpBind={staticIpBind}
            staticCost={totalStatic} />
            <br/>
          <PaymentGatewayOptions  paymentGateways={paymentGateways} selectedGateway={selectedGateway} handleGatewayClick={handleGatewayClick} setSelectedGatewayObj={setSelectedGatewayObj}/>
          {isPaymentSuccess && (
            <div className={"flex h-full w-full align-center justify-center"}>
              <PaymentSuccess />
            </div>
          )}
          <div className="h-2/6 mt-auto mb-5 ml-4">

            <div className="absolute bottom-3">
              {currentPlanData?.total_plan_cost && getCalculations? (
                <>
                  {!isPaymentSuccess && (
                    <Button className="primary-button" onClick={PaymentSubmit} disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer} >
                      {loaderSpinneer ? <SunspotLoader
                        gradientColors={["#6366F1", "#E0E7FF"]}
                        shadowColor={"#3730A3"}
                        desktopSize={"10px"}
                        mobileSize={"10px"}
                      /> : null}Renew
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <button
                    className="primary-button"
                    disabled={true}
                    style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                  >
                    Renew
                  </button>
                </>
              )}

              <button className="primary-button ml-2" onClick={handleClose}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <PaymentStatusSuccessModal
        paymentStatus={paymentStatus}
        paymentStatusModal={paymentStatusModal}
      />
      <PaymentStatusPendingModal
        paymentPending={paymentPending}
        paymentPendingModal={paymentPendingModal}
      />
      <PaymentStatusFailModal
        paymentFailModal={paymentFailModal}
        paymentFail={paymentFail}
        PaymentSubmit={PaymentSubmit}
      />
    </React.Fragment>
  );
};

export default SidePaneHOC(RenewPlan, "renew");
