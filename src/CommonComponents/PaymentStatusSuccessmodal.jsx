import React, { useState} from "react";
import {FaRegCheckCircle} from "react-icons/fa"
import { Modal, ModalBody, ModalFooter } from "reactstrap";
const PaymentStatusSuccessModal = (props) => {
   

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
      <Modal isOpen={props.paymentStatus} toggle={props.paymentStatusModal} centered backdrop={false}>
        <ModalBody style={{textAlign: "center"}}>
          <br />
          <FaRegCheckCircle style={iconstyle}/>
          <br/>
          <h1 style={{fontWeight:"100"}}>Success</h1>
        <br/>
        <p>Your payment has been completed successfully </p>
          <p>please check your registered email for payment details</p>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee" style={{backgroundColor:"green"}}
           onClick={()=>props.paymentStatusModal(window.location.reload())}
          >
            {"Ok"}
          </button>

          
        </ModalFooter>
      </Modal>
        </>
    )
}
export default PaymentStatusSuccessModal