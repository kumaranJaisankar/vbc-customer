import React, { useEffect, useState,useRef } from "react";
import {
  Row,
  Col,
  Form,
  Label,
  FormGroup,
  Input,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import { customeraxios } from "../../../../axios";
// import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import ADDRESSPROOF from "../Assets/addressproof.png";
import man from "../Assets/person_logo_icon.svg";
import CardMedia from "@mui/material/CardMedia";
import { useHistory } from "react-router-dom";
import { documentsUpgrade, getDocumentsList } from "../Axios";
import { SunspotLoader } from "react-awesome-loaders";
import SignaturePad from "react-signature-canvas";
// import useFormValidation from "../../../customhooks/FormValidation"
const DocumentsList = (props) => {
  const history = useHistory();
  const tokenData = localStorage.getItem("token");
  const customerID = JSON.parse(tokenData);
  const [documents, setDocuments] = useState({});
  const [Aadhar_Card_No, setAadharNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [signature, setSignature] = useState("");
  const [isEpmtySignature, setIsEmptySignature] = useState(false);
  const [newDocuments, setNewDocuments] = useState({});
  const [disable, setDisable] = useState(false);
  const [errors, setErrors] = useState({});
  const [uploadDownloadValue, setUploadDownloadValue] =
    useState("Aadhar_Card_No");
  const [complaintmodal, setComplaintmodal] = useState(false);
  const [loaderSpinneer, setLoaderSpinner] = useState(false);
  const [checkedmodal, setCheckedmodal] = useState(false);
  const [modal, setModal] = useState(false);
  const Complaintmodaltoggle = () => {
    setComplaintmodal(!complaintmodal);
  };
  // creting error
  const [errorComplaint, setErrorComplaint] = useState(false);
  const ErrorModalToggle = () => {
    setErrorComplaint(!errorComplaint);
  };
  const [signaturemodal, setSignaturemodal] = useState(false);
  const signaturemodaltoggle = () => {
    setSignaturemodal(!signaturemodal);
  };
  const [complainterrormodal, setComplainterrormodal] = useState(false);
  const Comaplinterrortoggle = () => {
    setComplainterrormodal(!complainterrormodal);
  };
  const [idProofUploadError, setIdProofUploadError] = useState({
    isError: false,
    message: "",
  });
  const [addressProofUploadError, setAddressProofUploadError] = useState({
    isError: false,
    message: "",
  });
  const [customerIdUploadError, setCustomerIdUploadError] = useState({
    isError: false,
    message: "",
  });
  const Renewupgrade = {
    height: "42px",
    width: "127px",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "19px",
    backgroundColor:"#1565c0"
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
    fontWeight: "500",
  };
  useEffect(() => {
    getDocumentsData();
  }, []);

  const getDocumentsData = () => {
    getDocumentsList(`customers/get/documents/customer/${customerID.id}`)
      .then((response) => {
        const { data } = response;
        console.log(data, "response data");
        setDocuments(data);
      })
      .catch((error) => {
        console.log("Something went wrong: ", error);
      })
      .finally(function () {
        console.log("Done");
      });
  };
  // Run effect whenever these values change

  // Function to validate form data
  const validateFormData = () => {
    const isValidAadharNo = /^[0-9]{12}$/.test(Aadhar_Card_No);
    const isValidPanNo = /^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(panNo);

    // Return true if all fields are valid, otherwise false
    return isValidAadharNo && isValidPanNo;
  };
  const handleChange = (e) => {
    let field = e.target.name;
    let input = e.target.value;
    let newErrors = { ...errors };
    setDocuments((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setNewDocuments((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (field == "Aadhar_Card_No") {
      setAadharNo(input);
      if (field === "Aadhar_Card_No" && !input) {
        newErrors["Aadhar_Card_No"] = "Field is required";
      } else if (field == "Aadhar_Card_No" && !/^([0-9])+$/i.test(input)) {
        newErrors["Aadhar_Card_No"] = "Only digits are allowed";
      } else if (field === "Aadhar_Card_No" && !/^([0-9]){12}$/.test(input)) {
        newErrors["Aadhar_Card_No"] = "Aadhar number should be 12 digits";
      } else if (field === "Aadhar_Card_No" && !!input && input.length > 12) {
        newErrors["Aadhar_Card_No"] = "Length cannot be more than 12 digits";
      } else {
        delete newErrors["Aadhar_Card_No"];
      }
    }
    if (field == "pan_card") {
      setPanNo(input);
      if (field === "pan_card" && !input) {
        newErrors["pan_card"] = "Field is required";
      } else if (
        field === "pan_card" &&
        !/^[A-Za-z]{5}\d{4}[A-Za-z]$/.test(input)
      ) {
        newErrors["pan_card"] = "Enter Valid PAN Number";
      } else if (field === "pan_card" && !/^([0-9a-zA-Z]){10}$/.test(input)) {
        newErrors["pan_card"] = "Pan number should be 10 Characters";
      } else if (field === "pan_card" && !!input && input?.length > 10) {
        newErrors["pan_card"] = "Length cannot be more than 10 ";
      } else {
        delete newErrors["pan_card"];
      }
    }
    setErrors(newErrors);
  };
  const handleCancel = () => {
    const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
    history.push(redirectURL);
  };
  const submitDocuments = () => {
    let data = { ...newDocuments };
    console.log(data, "submit data");
    //  newDocuments.Aadhar_Card_No_1=newDocuments.Aadhar_Card_No;

    //  let data = {...newDocuments};

    // let data = {
    //   // adding id
    data.id = documents.id;
    // };
    setDisable(true);
    // customeraxios
    //   .patch("customers/get/documents/" + props.lead.user.id, data)
    //   .then((res) => {
    //     props.fetchComplaints()
    //     props.onUpdate(data);
    //     setDisable(false)
    //     // toast.success("Customer Information edited successfully", {
    //     //   position: toast.POSITION.TOP_RIGHT,
    //     //   autoClose: 1000,
    //     // });
    //     props.setIsdisabled(true);
    //   })
    //   .catch(function (error) {
    //     setDisable(false)
    //     // toast.error("Something went wrong", {
    //     //   position: toast.POSITION.TOP_RIGHT,
    //     //   autoClose: 1000,
    //     // });
    //   });
  };

  // upload img

  async function UploadImage(e) {
    let file = e.target.files[0];
    const validExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!file || !validExtensions.includes(fileExtension)) {
      // Show error message or handle invalid file format
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setCustomerIdUploadError({
          isError: true,
          message: "File size exceeds the maximum limit of 5MB.",
        });
        return;
      }
      setCustomerIdUploadError({
        isError: true,
        message: "Invalid file format. Please upload a JPG or PNG file.",
      });
      setTimeout(() => {
        setCustomerIdUploadError({ isError: false, message: "" });
      }, 3000);

      console.error("Invalid file format. Please upload a JPG or PNG file.");
      return;
    }
    let preview = await getBase64(e.target.files[0]);

    setDocuments((preState) => ({
      ...preState,
      customer_pic_preview: preview,
      customer_pic: preview,
    }));
    setNewDocuments((prev) => ({
      ...prev,
      customer_pic_preview: preview,
      customer_pic: preview,
    }));
  }

  async function UploadImage1(e) {
    let file = e.target.files[0];
    const validExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!file || !validExtensions.includes(fileExtension)) {
      // Show error message or handle invalid file format
      setAddressProofUploadError({
        isError: true,
        message: "Invalid file format. Please upload a JPG or PNG file.",
      });
      setTimeout(() => {
        setAddressProofUploadError({ isError: false, message: "" });
      }, 3000);

      console.error("Invalid file format. Please upload a JPG or PNG file.");
      return;
    }
    let preview = await getBase64(e.target.files[0]);

    setDocuments((preState) => ({
      ...preState,
      address_proof_preview: preview,
      address_proof: preview,
    }));
    setNewDocuments((prev) => ({
      ...prev,
      address_proof_preview: preview,
      address_proof: preview,
    }));
  }

  async function UploadImage2(e) {
    let file = e.target.files[0];
    const validExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!file || !validExtensions.includes(fileExtension)) {
      // Show error message or handle invalid file format
      setIdProofUploadError({
        isError: true,
        message: "Invalid file format. Please upload a JPG or PNG file.",
      });
      setTimeout(() => {
        setIdProofUploadError({ isError: false, message: "" });
      }, 3000);

      console.error("Invalid file format. Please upload a JPG or PNG file.");
      return;
    }
    let preview = await getBase64(e.target.files[0]);

    setDocuments((preState) => ({
      ...preState,
      id_proof_preview: preview,
      identity_proof: preview,
    }));

    setNewDocuments((prev) => ({
      ...prev,
      id_proof_preview: preview,
      identity_proof: preview,
    }));
  }
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  // enabled Aadhar field by Marieya
  const requiredFields = ["pan_cards", "Aadhar_Card_No_Doc"];
  //   const { validate, Error } = useFormValidation(requiredFields);

  const validatePanCard = (panCard) => {
    const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
    return panRegex.test(panCard);
  };

  // Aadhar card should have 12 digits
  const validateAadharCard = (aadharCard) => {
    const aadharRegex = /^\d{12}$/;
    return aadharRegex.test(aadharCard);
  };

  const handleSubmit = async () => {
    let data = { ...newDocuments };
    console.log(data, "submit data");
    let newErrors = { ...errors };
    if (data.Aadhar_Card_No && data.Aadhar_Card_No.trim() !== "") {
      let valid = validateAadharCard(data.Aadhar_Card_No);
      console.log(valid, "valid or not aadhar");
      if (!valid) {
        newErrors["Aadhar_Card_No"] = "Please enter valid Aadhar number";
        return;
      } else {
        delete newErrors["Aadhar_Card_No"];
      }
    }
    if (data.pan_card && data.pan_card.trim() !== "") {
      let valid = validatePanCard(data.pan_card);
      console.log(valid, "valid or not");
      if (!valid) {
        newErrors["pan_card"] = "Please enter valid PAN number";
        return;
      } else {
        delete newErrors["pan_card"];
      }
    }
    setErrors(newErrors);
    try {
      setLoaderSpinner(true);
      data.id = documents.id;

      const response = await documentsUpgrade(
        `customers/get/documents/customer/${customerID.id}`,
        data
      );
      if (response.status === 200) {
        setLoaderSpinner(false);
        console.log("success", response);
        Complaintmodaltoggle();

        // const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
        // history.push(redirectURL);
      }
    } catch (e) {
      setLoaderSpinner(false);
      ErrorModalToggle();
    }
    setLoaderSpinner(false);
  };
  const handleUploadDownloadChange = (e) => {
    setUploadDownloadValue(e.target.value);
  };
  const toggle = () => {
    setModal(!modal);
  };
  const sigCanvas = useRef({});
  const clear = () => {
     setModal(!modal);
     signaturemodaltoggle();
     setCheckedmodal(!checkedmodal)
  }
  const save = () => {
    const preview = sigCanvas.current
    .getTrimmedCanvas()
    .toDataURL("image/png");
    console.log(preview,"signDataURL");
    setDocuments((preState) => ({
      ...preState,
      signature: preview,
      signature_preview: preview,
    }));
    setNewDocuments((prev) => ({
      ...prev,
      signature: preview,
      signature_preview: preview,
    }));
     setModal(!modal);
     signaturemodaltoggle();
     setCheckedmodal(!checkedmodal)
  }
  return (
    <>
      <React.Fragment>
        <div className="flex mt-10">
          <h3 className="text-2xl font-bold ml-5">Documents</h3>
        </div>
        <div className="mx-10 mt-10 mb-10">
          <div style={{ backgroundColor: "white" }}>
            <div style={{ paddingLeft: "50px" }} className="container">
              {/* <Form onSubmit={submitDocuments}> */}
              <br /> <br />
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  
                  textAlign: "left",
                }}
              >
                {/* <Col
                  md="6"
                  style={{
                    margin: "0 auto",
                    marginBottom: "20px",
                    width: "40%",
                  }}
                >
                  <p style={paraStyle}>Signature :</p>
                  <br />
                  <img
                    src={documents?.signature_preview}
                    style={{ width: "50%", height: "40%" }}
                  />
                </Col> */}

                <div
                 
                  style={{
                   
                    marginBottom: "20px",
                    width: "50%",
                    textAlign: "left",
                    
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: "-20px",
                      marginBottom: "5px",
                    }}
                  >
                    <>
                      <FormGroup
                        check
                        className={
                          "px-4 pr-2 text-xs flex justify-between items-center"
                        }
                      >
                        <Input
                          name="upload_download"
                          type="radio"
                          value={"Aadhar_Card_No"}
                          checked={uploadDownloadValue === "Aadhar_Card_No"}
                          className={"mx-2"}
                          onChange={handleUploadDownloadChange}
                        />{" "}
                        <Label
                          check
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            marginBottom: "5px",
                          }}
                        >
                          Aadhar
                        </Label>
                      </FormGroup>
                      <FormGroup
                        check
                        className={
                          "px-4 text-xs flex justify-between items-center"
                        }
                      >
                        <Input
                          name="upload_download"
                          type="radio"
                          value={"pan_card"}
                          checked={uploadDownloadValue === "pan_card"}
                          className={"mx-2"}
                          onChange={handleUploadDownloadChange}
                        />{" "}
                        <Label
                          check
                          style={{
                            fontWeight: "500",
                            fontSize: "16px",
                            marginBottom: "5px",
                          }}
                        >
                          Pan Card
                        </Label>
                      </FormGroup>
                    </>
                  </div>
                  {uploadDownloadValue === "Aadhar_Card_No" && (
                    <div>
                      <p style={paraStyle}>Aadhar Number :</p>
                      <br />
                      <input
                        type="text"
                        className={`form-control digits`}
                        name="Aadhar_Card_No"
                        style={select}
                        value={documents?.Aadhar_Card_No}
                        onChange={handleChange}
                        id="afterfocus"
                      ></input>
                      <br />
                      {errors["Aadhar_Card_No"] && (
                        <span className="error-text">
                          {errors["Aadhar_Card_No"]}
                        </span>
                      )}
                    </div>
                  )}
                  {uploadDownloadValue === "pan_card" && (
                    <div>
                      <p style={paraStyle}>PAN Card :</p>
                      <br />
                      <input
                        type="text"
                        className={`form-control digits not-empty`}
                        name="pan_card"
                        style={select}
                        value={documents?.pan_card}
                        onChange={handleChange}
                        id="afterfocus"
                      ></input>
                      <br />
                      {errors["pan_card"] && (
                        <span className="error-text">{errors["pan_card"]}</span>
                      )}
                    </div>
                  )}
                </div>
                {/* <Col md="4" style={{ margin: "0 auto", marginBottom: "20px" }}>
                  <p style={paraStyle}>PAN Card :</p>
                  <br />
                  <input
                    type="text"
                    className={`form-control digits not-empty`}
                    name="pan_card"
                    style={select}
                    value={panNo}
                    onChange={handleChange}
                    id="afterfocus"
                  ></input>
                  <br />
                  {errors["pan_card"] && (
                    <span className="error-text">{errors["pan_card"]}</span>
                  )}
                </Col> */}
              </div>
              <br />
              <Row
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "left",
                  padding: "10px",
                  margin: "5",
                  textAlign: "left",
                }}
              >
                <Col md="6" style={{ width: "50%" }}>
                  <br />
                  <Label className="desc_label" style={{ fontWeight: "500" }}>
                    ID Proof :
                  </Label>
                  <br />
                  <br />
                  {documents.id_proof_preview ? (
                    <img
                      src={documents.id_proof_preview}
                      style={{ width: "250px", height: "250px" }}
                    />
                  ) : (
                    <img
                      src={ADDRESSPROOF}
                      style={{ width: "40%", opacity: "0.3" }}
                    />
                  )}
                  &nbsp;
                  <br />
                  <span class="uploadimagekyc">
                    Re Upload
                    <Input
                      name="identity_proof"
                      onChange={UploadImage2}
                      className="form-control"
                      accept="image/*"
                      type="file"
                      id="upload"
                      style={{
                        paddingTop: "3px",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </Col>
                <Col md="6" style={{ width: "50%" }}>
                  <br />
                  <Label className="desc_label" style={{ fontWeight: "500" }}>
                    Address Proof :
                  </Label>
                  <br />
                  <br />
                  {documents.address_proof_preview ? (
                    <img
                      src={documents.address_proof_preview}
                      style={{ width: "250px", height: "250px" }}
                    />
                  ) : (
                    <img
                      src={ADDRESSPROOF}
                      style={{ width: "250px", opacity: "0.3" }}
                    />
                  )}
                  &nbsp;
                  <br />
                  <span class="uploadimagekyc">
                    Re Upload
                    <Input
                      name="identity_proof"
                      onChange={UploadImage1}
                      className="form-control"
                      accept="image/*"
                      type="file"
                      id="upload"
                      style={{
                        paddingTop: "3px",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                </Col>
              </Row>
              <br />
              <br />
              <Row style={{ display: "flex", textAlign: "left" }}>
                <Col md="6" style={{ width: "50%" }}>
                  <br />
                  <Label className="desc_label" style={{ fontWeight: "500" }}>
                    Customer Photo :
                  </Label>
                  <br />
                  {documents.customer_pic_preview ? (
                    <img
                      src={documents.customer_pic_preview}
                      style={{ height: "150px" }}
                    />
                  ) : (
                    <CardMedia
                      className="avatarProfilePicture"
                      component="img"
                      image={man}
                      alt=""
                      sx={{ width: 250, height: 250 }}
                    />
                  )}
                  &nbsp;
                  <br />
                  <span class="uploadimagekyc">
                    Re Upload
                    <Input
                      name="identity_proof"
                      onChange={UploadImage}
                      className="form-control"
                      accept="image/*"
                      type="file"
                      id="upload"
                      style={{
                        paddingTop: "3px",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    />
                  </span>
                  <br />
                  <br />
                  {customerIdUploadError.isError && (
                    <span style={{ color: "red", marginTop: "5px" }}>
                      {customerIdUploadError.message}
                    </span>
                  )}
                </Col>
                <Col md="6" style={{ width: "50%" }}>
                  <br />
                  <Label className="desc_label" style={{ fontWeight: "500" }}>
                   Signature :
                  </Label>
                  <br />
                  {documents.signature_preview && (
                    <img
                      src={documents.signature_preview}
                      style={{ height: "150px",width:"250px" }}
                    />
                  )}
                  &nbsp;
                  <br />
                  {/* <span class="uploadimagekyc">
                    Re Upload */}
                  {/* <Input
                      name="identity_proof"
                      onChange={signaturemodaltoggle}
                      className="form-control"
                      // accept="image/*"
                      // type="file"
                      // id="upload"
                      style={{
                        paddingTop: "3px",
                        position: "absolute",
                        left: "0",
                        top: "0",
                        opacity: "0",
                        cursor: "pointer",
                      }}
                    /> */}
                  <button
                    className="text-sm primary-button mr-10"
                    style={Renewupgrade}
                    onClick={signaturemodaltoggle}
                  >
                    {"Signature"}
                  </button>{" "}
                  {/* </span> */}
                  <br />
                  <br />
                  {customerIdUploadError.isError && (
                    <span style={{ color: "red", marginTop: "5px" }}>
                      {customerIdUploadError.message}
                    </span>
                  )}
                </Col>
              </Row>
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <button
                  className="text-sm primary-button mr-10"
                  style={Renewupgrade}
                  onClick={handleCancel}
                >
                  {"Cancel"}
                </button>{" "}
                <button
                  className="text-sm primary-button mr-2 marquee"
                  style={{
                    ...Renewupgrade,
                    backgroundColor: disable ? "#CCCCCC" : "",
                  }}
                  type="submit"
                  name="submit"
                  onClick={handleSubmit}
                  // onClick={() => Complaintmodaltoggle(),Comaplinterrortoggle()}
                >
                  <span style={{ position: "absolute", marginLeft: "-20px" }}>
                    {loaderSpinneer ? (
                      <SunspotLoader
                        gradientColors={["#000", "#000"]}
                        color={"#000"}
                        // shadowColor={"#3730A3"}
                        desktopSize={"10px"}
                        mobileSize={"10px"}
                      />
                    ) : null}{" "}
                    &nbsp; &nbsp; &nbsp;
                  </span>
                  {"Update"}
                </button>
                <br />
                <br />
                <br />
              </div>
              {/* </Form> */}
            </div>
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
            <h4>Documents Updated successfully! </h4>
            <br />
          </ModalBody>
          <br />
          <ModalFooter style={{ textAlign: "center" }}>
            <button
              className="text-sm primary-button mr-2 marquee"
              style={Renewupgrade}
              onClick={() => {
                Complaintmodaltoggle();
                const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
                history.push(redirectURL);
              }}
            >
              {"Ok"}
            </button>
          </ModalFooter>
        </Modal>
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
                window.location.reload();
              }}
            >
              {"Ok"}
            </button>
          </ModalFooter>
        </Modal>

        <Modal
          isOpen={signaturemodal}
          toggle={signaturemodaltoggle}
          centered
          backdrop={false}
          style={{maxWidth: '80%',padding:"10px"}}
        >
           <ModalBody style={{ width:"80%",padding: '10px' }}>
        <div>
              <b>
                By accessing or using the Service you agree to be bound by these
                Terms. If you disagree with any part of the terms then you may
                not access the Service.
              </b>
            </div>
            <div
              style={{
                paddingLeft: "3%",
                paddingRight: "30%",
                paddingBottom: "8%",
              }}
            >
              <Label>
                <b style={{ position: "relative", top: "-6%" }}>1. Changes</b>
                <br />
                <span style={{ position: "relative", top: "0%" }}>
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material we
                  will try to provide at least 30 (change this)​ day's notice
                  prior to any new terms taking effect. What constitutes a
                  material change will be determined at our sole discretion.
                </span>
                <br />
                <b style={{ position: "relative", top: "10%" }}>2.Purchases</b>
                <br />
                <span style={{ position: "relative", top: "15%" }}>
                  If you wish to purchase any product or service made available
                  through the Service ("Purchase"), you may be asked to supply
                  certain information relevant to your Purchase including,
                  without limitation
                </span>

                <br />

                <b style={{ position: "relative", top: "27%" }}>3.Contact Us</b>
                <br />
                <span style={{ position: "relative", top: "34%" }}>
                  If you have any questions about these Terms, please contact
                  us.
                </span>
              </Label>
            </div>
            <br />
            <ul className="layout-grid layout-types" style={{ border: "none" }}>
              <li
                data-attr="compact-sidebar"
                //  onClick={(e) => handlePageLayputs(classes[0])}
              >
                <div className="layout-img">
                  <div
                    className="checkbox checkbox-dark m-squar"
                    style={{
                      paddingLeft: "3%",
                      paddingRight: "30%",
                    }}
                  >
                    <Input
                      id="inline-sqr-1"
                      type="checkbox"
                      checked={checkedmodal}
                      onClick={() => setCheckedmodal(!checkedmodal)}
                    />
                    <Label className="mt-0" for="inline-sqr-1">
                      I have read and agree to the Terms and Conditions
                    </Label>
                    <br />
                    <br />
                    <Row style={{ marginTop: "-4%" }}>
                      <span
                        className="sign_border"
                        style={{ position: "relative", top: "0px" }}
                      ></span>
<br/>
                     
                    </Row>
                    {/* {checkedmodal && modal ? (
                   
                   <div>
                     <Modal isOpen={modal} toggle={toggle} backdrop="static">
                     <ModalBody toggle={toggle}>
                     <h5>Signature</h5>
                         <hr/>
                       </ModalBody>

                       <SignaturePad ref={sigCanvas} onEnd={() => { setIsEmptySignature(true)}}/>

                       <ModalFooter>
                         <Button color="secondary" onClick={clear} id="resetid">
                           Clear
                         </Button>
                         <Button
                            color="primary"
                           style={{ backgroundColor: "#7366ff" }}
                           onClick={() => save()}
                           disabled={!isEpmtySignature}
                           id="save_button"
                         >
                           Save
                         </Button>
                       </ModalFooter>
                     </Modal>{" "}
                   </div>
                 ) : null} */}
                  </div>
                </div>
              </li>
            </ul>
          </ModalBody>
          <br />
          <ModalFooter style={{ textAlign: "center" }}>
            {/* <button
              className="text-sm primary-button mr-2 marquee"
              style={Renewupgrade}
              onClick={() => {
                Complaintmodaltoggle();
                const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
                history.push(redirectURL);
              }}
            >
              {"Ok"}
            </button> */}
            <div style={{display:"flex",justifyContent:"center"}}>
             <Button
                       className="text-sm primary-button mr-2"
                        type="button"
                        style={{ marginTop: "-10px",marginRight:"40px"}}
                        onClick={() => setModal(!modal)}
                        disabled={!checkedmodal}
                        id="accept_button"
                      >
                        Accept and Sign
                      </Button>
                      <Button
                        className="text-sm primary-button mr-2"
                        type="button"
                        style={{ marginTop: "-10px"}}
                        onClick={() => signaturemodaltoggle()}
                        id="save_button"
                      >
                        Cancel
                      </Button>
                      </div>
          </ModalFooter>
        </Modal>
        {checkedmodal && modal ? (
                    
                    <div>
                      <Modal isOpen={modal} toggle={toggle} backdrop="static">
                      <ModalBody toggle={toggle}>
                      <h5>Signature</h5>
                      <br/>
                          <hr/>
                        </ModalBody>

                        <SignaturePad ref={sigCanvas} onEnd={() => { setIsEmptySignature(true)}}/>

                        <ModalFooter>
                          <div style={{display:"flex",justifyContent:"space-around"}}>
                          <Button color="secondary" onClick={clear} id="resetid">
                            Clear
                          </Button>
                          <Button
                             className="text-sm primary-button mr-2 marquee"
                            // style={{ backgroundColor: "#7366ff" }}
                            onClick={() => save()}
                            disabled={!isEpmtySignature}
                            id="save_button"
                          >
                            Save
                          </Button>
                          </div>
                        </ModalFooter>
                      </Modal>{" "}
                    </div>
                  ) : null}
      </React.Fragment>
    </>
  );
};

export default DocumentsList;
