import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalFooter,
  ModalBody,
  Label,
} from "reactstrap";
import { getPlanPaymentList } from "../Axios";
const PaymentList = (props) => {
  const [paymentlist, setPaymentlist] = useState([]);

  useEffect(() => {
    getPlanPaymentList("payment/enabled/gateways")
      .then((res) => {
        setPaymentlist(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <FormGroup>
      <Modal
        isOpen={props.showPayment}
        toggle={() => props.setShowPayment(!props.showPayment)}
        centered
        className="payment-list-modal"
      >
        <ModalBody>
          <h4 className="mb-4">Select Payment Method</h4>
          <hr></hr>
          <Row>
            <Col>
              <FormGroup>
                <div className="m-4 ml-0">
                  {paymentlist.map((payment) => (
                    <>
                      <Label className="p-2 m-2 ml-0 pl-0" for="edo-ani1">
                        <Input
                          className="mr-1"
                          type="radio"
                          id="edo-ani1"
                          key={payment.id}
                          value={payment.id}
                          name="gateway_type"
                          onChange={() =>
                            props.setSelectedPaymentId(payment.id)
                          }
                        />
                        {payment.gateway.name}
                      </Label>
                    </>
                  ))}
                </div>
              </FormGroup>
            </Col>
          </Row>
          <br />
          <hr></hr>
        </ModalBody>
        <ModalFooter>
          <div className="mt-4">
            <Button
              className="secondary-button"
              onClick={() => {
                //   props.setSelectedPaymentId(null);
                props.setShowPayment(false);
              }}
            >
              {"Close"}
            </Button>
            <Button
              className="primary-button ml-4"
              onClick={() => {
                props.submitdata();

                props.setShowPayment(false);
              }}
            >
              Proceed to pay
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </FormGroup>
  );
};
export default React.memo(PaymentList);
