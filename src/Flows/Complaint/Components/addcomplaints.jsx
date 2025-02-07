import React, { useEffect, useState } from "react";
import { getAllComplaint, createComplaint } from "../../../Axios";
import { Form, Input, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useHistory } from "react-router-dom";
export const AddComplaints = (props) => {
  const history = useHistory();
  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketSubcategory, setTicketSubcategory] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [complaintData, setComplaintData] = useState({});
  const [errormessage, setErrormessage] = useState()
  const [exitcustomer, setExitcustomer] = useState(false)
  const exitingCustomer = () => setExitcustomer(!exitcustomer)
 const [disable, setDisable]=useState(false)
  // created done
  const [complaintmodal, setComplaintmodal] = useState(false);
  const Complaintmodaltoggle = () => {
    setComplaintmodal(!complaintmodal);
  };
  // creting error
  const [errorComplaint, setErrorComplaint] = useState(false);
  const ErrorModalToggle = () =>{
    setErrorComplaint(!errorComplaint)
  }

  const [complainterrormodal, setComplainterrormodal] = useState(false);
  const [errors, setErrors] = useState({});

  const Comaplinterrortoggle = () => {
    setComplainterrormodal(!complainterrormodal);
  };
  const Renewupgrade = {
    height: "42px",
    width: "127px",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "19px",
  };
  const select = {
    backgroundColor: "#FFFFFF",
    padding: "4px 100px 4px 5px",
    border: "1px solid rgba(97, 117, 134, 0.2)",
    boxSizing: "border-box",
    borderRadius: "4px",
    width: "293px",
    height: "36px",
  };
  const teXtArea = {
    backgroundColor: "#F5F5F5",
    width: "42%",
    borderRadius: "8px",
    padding: "20px",
  };

  const paraStyle = {
    fontStyle: "noraml",
    fontWeight: "noraml",
    fontSize: "16px",
    lineHeight: "19px",
    color: "#000000",
  };
  useEffect(() => {
    getAllComplaint(`customer/create/options`)
      .then((res) => {
        let { category } = res.data;
        setTicketCategory([...category]);
      })
      .catch((err) => console.log(err));
  }, []);


  
  const handleInputChange = (event) => {
    event.preventDefault();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));

    const target = event.target;
    var value = target.value;
    const name = target.name;

    if (target.type === "checkbox") {
      if (target.checked) {
        complaintData.hobbies[value] = value;
      }
    } else {
      setComplaintData((preState) => ({
        ...preState,
        [name]: value,
      }));
    }
    let val = event.target.value;
    if (name == "ticket_category") {
      getsubCategory(val)
    }
  };

  const getsubCategory = (val) => {
    getAllComplaint(`sub/ticketcategory/${val}`)
      .then((res) => setTicketSubcategory(res.data))
  }


  const submit = (event) => {
    event.preventDefault();
    setDisable(true)
    let inValid = true;
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (!Validate()) {

      createComplaint(`/customer/complaint`, complaintData, config)
        .then((response) => {
          setDisable(false)
          if(response.status === 201){
            Complaintmodaltoggle();

          }
          if(response.status === 200){
            ErrorModalToggle()
          }

        })
        .catch(function (error) {
          setDisable(false)
          console.log(error.response.data, "helpdesk")
          setErrormessage(error.response.data)
          const errorString = JSON.stringify(error);
          const is500Error = errorString.includes("500");
          const is400Error = errorString.includes("400");
          if (error.response && error.response.data) {
            setExitcustomer(true)

          } else if (is500Error) {

          } else if (is400Error) {

          } else {

          }
        });
    }
  }



  const Validate = () => {
    let invalid = false;

    if (!complaintData || !complaintData.ticket_category || complaintData.ticket_category == 0) {
      errors.ticket_category = "please fill the required field"
      invalid = true;
    }

    if (!complaintData || !complaintData.sub_category || complaintData.sub_category == 0) {
      errors.sub_category = "please fill the required field"
      invalid = true;
    }
    if (!complaintData || !complaintData.notes || complaintData.notes == 0) {
      errors.notes = "please fill the required field"
      invalid = true;
    }
 if(invalid){
  setDisable(false)
 }
    setErrors({
      invalid,
      errors,
    })
    return invalid;
  }



  const handleCancel = (e) => {
    e.preventDefault();
    props.setShowaddcomplaint(false);
    props.setShowcomplaintsbuttons(true);
  };


  return (
    <React.Fragment>
      <div style={{ backgroundColor: "white" }}>
        <div style={{ paddingLeft: "60px" }} className="container">
          <Form onSubmit={submit}>
            <br /> <br />
            <div style={{ display: "flex" }}>
              <div class="form-group col-md-12">
                <p style={paraStyle}>Complaint Type :</p>
                <br />
                <Input
                  type="select"
                  name="ticket_category"
                  onChange={handleInputChange}
                  className={`form-control digits`}
                  value={complaintData && complaintData.ticket_category}
                  style={select}
                >
                  <option key={0} value={0} > Select ....</option>

                  {ticketCategory.map((categories) => (
                    <option key={categories.id} value={categories.id}>
                      {categories.category}
                    </option>
                  ))}
                </Input>
                <span className="error-text"> {errors && errors.errors && errors.errors.ticket_category}</span>
              </div>
              <br /> <br />
              <div class="" style={{ marginLeft: "30px" }}>
                <p style={paraStyle}> Sub Complaint Type :</p>
                <br />
                <Input
                  type="select"
                  name="sub_category"
                  onChange={handleInputChange}
                  className={`form-control digits`}
                  value={complaintData && complaintData.sub_category}
                  style={select}
                >
                  <option key={0} value={0} > Select ....</option>

                  {ticketSubcategory.map((subcategories) => (
                    <option key={subcategories.id} value={subcategories.id}>
                      {subcategories.name}
                    </option>
                  ))}
                </Input>
                <span className="error-text"> {errors && errors.errors && errors.errors.sub_category}</span>
              </div>
            </div>
            <br />
            <p style={paraStyle}>Description: </p>
            <br />
            <Input
              style={teXtArea}
              type="textarea"
              // draft
              className={`form-control digits`}
              value={complaintData && complaintData.notes}
              name="notes"
              rows="5"
              onChange={handleInputChange}
              placeholder="Please share your feedback here..."
            />
            <span className="error-text"> {errors && errors.errors && errors.errors.notes}</span>
            <br />
            <br />
            <div style={{ textAlign: "center" }}>
              <button
                className="text-sm primary-button mr-2 marquee1"
                style={Renewupgrade}
                onClick={handleCancel}
              >
                {"Cancel"}
              </button>{" "}
              <button
                className="text-sm primary-button mr-2 marquee"
                style={Renewupgrade}
                type="submit"
                name="submit"
                disabled={disable}
              // onClick={Complaintmodaltoggle}
              // onClick={() => Complaintmodaltoggle(),Comaplinterrortoggle()}
              >
                {"Submit"}
              </button>
              <br />
              <br />
              <br />
            </div>
          </Form>
        </div>
      </div>

{/* created successfully */}
      <Modal
        isOpen={complaintmodal}
        toggle={Complaintmodaltoggle}
        centered
        backdrop={false}
      >
        <ModalBody>
          <br />
          <h4>Complaint was successfully created </h4>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee"
            style={Renewupgrade}
            onClick={() => {
              Complaintmodaltoggle();
              props.setShowaddcomplaint(false);
              props.setShowcomplaintsbuttons(true);
              window.location.reload();
            }}
          >
            {"Ok"}
          </button>
        </ModalFooter>
      </Modal>


{/* /already created */}

<Modal
        isOpen={errorComplaint}
        toggle={ErrorModalToggle}
        centered
        backdrop={false}
      >
        <ModalBody>
          <br />
          <h4>A Ticket already exists for this user! </h4>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee"
            style={Renewupgrade}
            onClick={() => {
              ErrorModalToggle();
              props.setShowaddcomplaint(false);
              props.setShowcomplaintsbuttons(true);
              window.location.reload();
            }}
          >
            {"Ok"}
          </button>
        </ModalFooter>
      </Modal>

      {/* error */}
      <Modal
        isOpen={complainterrormodal}
        toggle={Comaplinterrortoggle}
        centered
        backdrop={false}
      >
        <ModalBody>
          <br />
          <h4>Something went wrong </h4>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee"
            style={Renewupgrade}
            onClick={() => {
              Comaplinterrortoggle();
            }}
          >
            {"Ok"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={exitcustomer}
        toggle={exitingCustomer}
        centered
        backdrop="static"
      >
        <ModalBody>
          <br />
          <h5> {errormessage}</h5>
          <br />
        </ModalBody>
        <ModalFooter style={{ textAlign: "center" }}>
          <button color="primary" onClick={() => { exitingCustomer() }} id="save_button" className="text-sm primary-button mr-2 marquee">
            ok
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default AddComplaints;
