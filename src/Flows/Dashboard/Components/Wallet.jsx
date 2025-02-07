import React, { useEffect, useState } from "react";
import { FaTruckMonster } from "react-icons/fa";
import { getUpgradePlaData } from "../../../Axios/index"


const WalletDetails = (props) => {
    const [walletInfo, setWalletInfo] = useState()
    useEffect(() => {
        if (!props.customerID) {
        }
        else {
            getUpgradePlaData(`wallet/customer/${props.customerID}`).then((res) => {
                setWalletInfo(res.data)
            })
        }

    }, [props.DashboardData])
    return (
        <React.Fragment>
            <div className="vbc-app-upload-download card mt-0">

                <div className="vbc-app-upload">
                    <br />
                    Wallet : {walletInfo?.wallet_info}
                    <br /><br />
                </div>
                <div className="vbc-app-download">
                    <br />
                    <button className="text-sm primary-button mr-2" disabled={true}>
                        Add Money
                    </button>
                    <br /><br />
                </div>
            </div>
        </React.Fragment>
    );
};



export default React.memo(WalletDetails);
