import React from "react";
import {FaExclamationCircle} from "react-icons/fa"
import { Modal, ModalBody, ModalFooter } from "reactstrap";
const PaymentStatusPendingModal = (props) => {
   

    const iconstyle ={
        backgroundColor: "green",
        borderRadius: "30px",
        color:"white",
        fontSize: "50px",
        margin:"auto"
      }
    
    return(
        <>
        {/* Success modal */}
      <Modal isOpen={props.paymentPending} toggle={props.paymentPendingModal} centered backdrop={false}>
        <ModalBody style={{textAlign: "center"}}>
          <br />
          <FaExclamationCircle style={iconstyle}/>
          <br/>
          <h1 style={{fontWeight:"100"}}>Pending</h1>
        <br/>
          <p>your payment is processing</p>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee" style={{backgroundColor:"green"}}
           onClick={()=>props.paymentPendingModal(window.location.reload())}
          >
            {"Ok"}
          </button>
        </ModalFooter>
      </Modal>
        </>
    )
}
export default PaymentStatusPendingModal