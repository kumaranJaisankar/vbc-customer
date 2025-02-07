import React, { useEffect, useState } from "react";
import { UpgradePlanTable } from "./UpgradePlanTable";
import PaymentList from "./paymentlist";
import {
    getUpgradePlaData,
    getPlanPayment,
    paymentAPIUpgrade, getPriorCheck, getBranchList, getAMountCalculation,
    getPaymentGatewayList
} from "../Axios";
import { Modal, ModalBody, ModalFooter, Button, ModalHeader,Container,Row,Label,Input } from "reactstrap";
import { Alert } from "../CommonComponents/Alert";
import { capitalizeString } from "../Utils/Constants";
import moment from "moment";
import { useHistory } from "react-router-dom";
import PaymentStatusSuccessModal from "./PaymentStatusSuccessmodal";
import PaymentStatusPendingModal from "./PaymentStatusPendingModal";
import PaymentStatusFailUpgrade from "./PaymentStatusFailupgrde";
import ReconnectingWebSocket from "reconnecting-websocket";
import StaticIp from "./StaticIP"
import { SunspotLoader } from "react-awesome-loaders";
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
const UpgradeDays = (props) => {
    console.log(props, "props")
    const areaid = props.areaid;
    // staticIpBind
    const staticIpBind = props.staticIpBind
    const staticCost = props.staticCost
    const ipPoolId = props.ipPoolId
    const poolName = props.ippool_name
    const radiusInfoId = props.radiusInfoId
    const balnceAmount = props.balanceDays
    const customerId = props.customerId
    const planTimtUnit = props.planTimtUnit
    const totalStatic = props.totalStatic
    const staticCgst = props.staticCgst
    const statisSgst = props.statisSgst
    const walletAmount = props.walletAmount
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
    const [changeplan, setChangeplan] = useState({})
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
    const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
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
    const history = useHistory();
    // spinner
    const [loaderSpinneer, setLoaderSpinner] = useState(false)
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
    console.log(props.areaid, "areaid")
    useEffect(() => {
        const id = props.planID;
        const areaid = props.areaid;
        (async function () {
            try {
                let response = null;
                if (allOrPartialPlans === "all") {
                    response = await getUpgradePlaData(`/accounts/area/${areaid}/plans`);
                } else {
                    response = await getUpgradePlaData(`/accounts/loggedin/${areaid}/speedplans/${id}`);
                }
                const { data } = response;
                console.log(data);
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
        console.log(addUnitType);
        console.log(new_date);
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
    const TotalGST = staticshow === true && selectedPlan?.plan_cgst === 0 ? (selectedPlan.total_plan_cost) * 0.18 : 0;
    const checkGST = staticIpBind && TotalGST
    const finalAmount = parseFloat(selectedPlan.total_plan_cost).toFixed(2)
    const staticipcost = staticshow ? (totalStatic / planTimtUnit) * selectedPlan?.time_unit : null;
    const totalAmount = Number(totalStaticCost) + Number(finalAmount) + Number(staticipcost) + Number(checkGST)
    console.log(totalAmount, "totalAmount")
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
                const obj = {
                    service_plan: selectedPlan.id,
                    balance: balnceAmount,
                    use_wallet:walletamountcheckbox,
                };
                if (staticshow === true) {
                    obj.radius_info = hideandSHowstaticIP
                } else {
                    delete obj.radius_info
                }
                console.log(obj, "obj")
                if (selectedPlan?.id) {
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
                    // balance: balnceAmount,
                };
                data.plan = selectedPlan.id
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
                setLoaderSpinner(false);
                console.log(e);
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
            let { available_ips } = res.data;
            setStaticIP([...available_ips]);
            setStaticIPCost(res.data)
        });
    };

    return (
        <React.Fragment>
            <div className={`relative h-full overflow-scroll`}>


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


                <>
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
                        {/* <span>
            {showAllPartial && (
              <a className="link" href="#" onClick={handleSeeAllPlansClick}>
                See more
              </a>
            )}
            {!showAllPartial && (
              <a
                className="link"
                href="#"
                onClick={handleGreaterThanPlansClick}
              >
                See less
              </a>
            )}
            <span>
              <ArrowIcon
                style={icondisplay}
                height={iconHeight}
                width={iconWidth}
                fill={iconFillColor}
              />
            </span>
          </span> */}

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
                                            <dt className="w-1/3">Remaining Balance</dt>
                                            <dd>{balnceAmount.toFixed(2)}</dd>
                                            <dt className="w-1/3">Plan Cost</dt>
                                            <dd>{finalAmount}</dd>
                                            <dt className="w-1/3">Final Amount To Be Paid</dt>
                                            <dd>{getCalculations?.amount}</dd>
                                            <dt className="w-1/3">Current Expiry Date</dt>
                                            <dd>{moment(props.plan_end).format("DD MMM YYYY,h:mm a")}</dd>
                                            <dt className="w-1/3">Start Date</dt>
                                            <dd>{moment().format("DD MMM YYYY,h:mm a")}</dd>
                                            <dt className="w-1/3">Next Expiry Date</dt>
                                            <dd>
                                                {getcalculatedduedate(
                                                    startDate,
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
                    {!loading &&

                        <>
                            {selectedPlan?.total_plan_cost && <>
                                <br /><br /><br /> <br /><br /><br /> <br /><br /><br /><br /></>}
                            {staticIpBind &&
                                <>
                                    &nbsp;&nbsp; Static IP :
                                    <div
                                        className={`franchise-switch ${staticipToggle}`}
                                        onClick={showStaticipToggle} />
                                </>
                            }
                        </>
                    }



                    <StaticIp ipPool={ipPool} handleChange={handleChange}
                        renewPlan={changeplan} staticIP={staticIP}
                        staticshow={staticshow}
                        poolName={poolName} staticIpBind={staticIpBind}
                        staticCost={staticipcost}
                        staticIPCost={staticIPCost} />

                    <PaymentList
                        showPayment={showpayment}
                        submitdata={submitdata}
                        setShowPayment={setShowPayment}
                        setSelectedPaymentId={setSelectedPaymentId}
                    />
                    <br/>
 <PaymentGatewayOptions  paymentGateways={paymentGateways} selectedGateway={selectedGateway} handleGatewayClick={handleGatewayClick} setSelectedGatewayObj={setSelectedGatewayObj}/>
                    <div className="relative h-2/6 mt-5 mb-10 ml-4">
                        <div className="absolute bottom-0">
                            {selectedPlan?.total_plan_cost ? (
                                <Button className="primary-button" onClick={PaymentUpgardeSubmit} disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer}>
                                    {loaderSpinneer ? <SunspotLoader
                                        gradientColors={["#6366F1", "#E0E7FF"]}
                                        shadowColor={"#3730A3"}
                                        desktopSize={"10px"}
                                        mobileSize={"10px"}
                                    /> : null}Upgrade
                                    {/* {loadingPay && !isRetry ? " Payment Processing " : "Upgrade"} */}
                                </Button>
                            ) : (
                                <Button
                                    className="primary-button"
                                    disabled={true}
                                    style={{ backgroundColor: "gray", cursor: "not-allowed" }}
                                >
                                    {"Upgrade "}
                                </Button>
                            )}

                            <button className="primary-button ml-2" onClick={handleClose}>
                                Close
                            </button>
                        </div>
                    </div>
                </>

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

export default UpgradeDays;
