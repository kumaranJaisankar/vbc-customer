import React from "react";
import {FaRegTimesCircle} from "react-icons/fa"
import { Modal, ModalBody, ModalFooter } from "reactstrap";
const PaymentStatusFailUpgrade = (props) => {
   

    const iconstyle ={
        backgroundColor: "red",
        borderRadius: "30px",
        color:"white",
        fontSize: "50px",
        margin:"auto"
      }
    
    return(
        <>
        {/* Success modal */}
      <Modal isOpen={props.paymentFail} toggle={props.paymentFailModal} centered backdrop={false}>
        <ModalBody style={{textAlign: "center"}}>
          <br />
          <FaRegTimesCircle style={iconstyle}/>
          <br/>
          <h1 style={{fontWeight:"100"}}>Sorry</h1>
        <br/>
          <p>Your transaction is failed. If any amount debited, It will be refunded to your account in 2-3 business working days  </p>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee" style={{backgroundColor:"green"}}
           onClick={()=>props.paymentFailModal(window.location.reload())}
          >
            {"Ok"}
          </button>
          <button
            className="text-sm primary-button mr-2 marquee" style={{backgroundColor:"green"}}
            onClick={props.PaymentUpgardeSubmit}
          >
            {"Retry"}
          </button>
        </ModalFooter>
      </Modal>
        </>
    )
}
export default PaymentStatusFailUpgrade