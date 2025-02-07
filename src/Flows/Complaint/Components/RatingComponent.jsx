import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { Modal, ModalBody, ModalFooter, Form, ModalHeader } from "reactstrap";
import { addFeedback, getRatingInfo } from "../../../Axios";
import "../Complaint.style.css";
import { connect } from "react-redux";
import { setRatingInfo } from "../../../Redux/Complaints/actions";
import { FaStar, FaRegStar } from "react-icons/fa";


const RatingColors = {
  VP: {
    style: {
      color: "#DF3737",
      fontWeight: "bold",
      fontSize: "16px",
    },
    text: "Worst",
    id: 1,
  },
  P: {
    style: {
      color: "#DF3737",
      fontWeight: "bold",
      fontSize: "16px",
    },
    text: "Poor",
    id: 2,
  },
  AVG: {
    style: {
      color: "#000000",
      fontWeight: "bold",
      fontSize: "16px",
    },
    text: "Average",
    id: 3,
  },
  GD: {
    style: {
      color: "#3CA65A",
      fontWeight: "bold",
      fontSize: "16px",
    },
    text: "Good",
    id: 4,
  },
  VG: {
    style: {
      color: "#3CA65A",
      fontWeight: "bold",
      fontSize: "16px",
    },
    text: "Excellent",
    id: 5,
  },
};
export const RatingComponent = (props) => {
  const Verticalcentermodaltoggle = () => setVerticalcenter(!Verticalcenter);
  const [Verticalcenter, setVerticalcenter] = useState(false);
  const [addFeadback, setAddFeadback] = useState({ rating: "" });
  const [inputs, setInputs] = useState([]);
  const teXtArea = {
    backgroundColor: "#F5F5F5",
  };
  const starIcon = {
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
  };
  const heading = {
    textAlign: "center",
  };
  const Renewupgrade = {
    height: "35px",
  };
  const handleButoonshowhandhide = () => {
    props.setShowaddcomplaint(true);
    props.setShowcomplaintsbuttons(false);
  };
  const Imgstyle = {
    height: "18px",
    width: "18px",
    cursor: "pointer",
  };

  const Cancelbutton = {
    textAlign: "center",
    marginTop: "-35px"
  }
  const submitRating = (event) => {
    event.preventDefault();
    var config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    addFeadback.ticket = props.id;
    addFeadback.customer = props.customer_id;
    addFeedback(`/ticket/rating`, addFeadback, config)
      .then((response) => {
        console.log(response.data);
        setAddFeadback({ rating: "", feedback: "" });
        Verticalcentermodaltoggle()
      })
      .catch(function (error) {
        console.error("Something went wrong!", error);
      })
      .finally(function () {
        getRatingData();
      });
  };

  const getRatingData = () => {
    getRatingInfo("feedback/create/list")
      .then((response) => {
        const { data } = response;
        props.setRatingInfo(data);
      })
      .catch((error) => {
        console.log("Something went wrong: ", error);
      })
      .finally(function () {
        console.log("Done");
      });
  };

  const handleInputFeedbackChange = (event) => {
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
        addFeadback.hobbies[value] = value;
      }
    } else {
      setAddFeadback((preState) => ({
        ...preState,
        [name]: value,
      }));
    }
  };

  const handleInputRatingChange = (value) => {
    setAddFeadback((preState) => ({
      ...preState,
      rating: value,
      id: [1, 2, 3, 4, 5],
    }));
  };

  return (
    <>
      <div style={{ display: "flex" }} onClick={Verticalcentermodaltoggle}>

        <div> {RatingColors[props.rating] && RatingColors[props.rating].id >= 1 || RatingColors == "VP" ? <FaStar className="star-1" /> : <FaRegStar className="star-3" />}</div>

        <div> {RatingColors[props.rating] && RatingColors[props.rating].id >= 2 || RatingColors == "P" ? <FaStar className="star-1" /> : <FaRegStar className="star-3" />}</div>

        <div> {RatingColors[props.rating] && RatingColors[props.rating].id >= 3 || RatingColors == "AVG" ? <FaStar className="star-1" /> : <FaRegStar className="star-3" />}</div>


        <div> {RatingColors[props.rating] && RatingColors[props.rating].id >= 4 || RatingColors == "GD" ? <FaStar className="star-1" /> : <FaRegStar className="star-3" />}</div>


        <div> {RatingColors[props.rating] && RatingColors[props.rating].id >= 5 || RatingColors == "VG" ? <FaStar className="star-1" /> : <FaRegStar className="star-3" />}</div>
      </div>

      <Modal
        isOpen={Verticalcenter}
        toggle={Verticalcentermodaltoggle}
        centered
        backdrop={false}
      >
        <Form onSubmit={submitRating}>
          <ModalHeader toggle={Verticalcentermodaltoggle} style={heading}>
            {"Rate your experience"}
          </ModalHeader>
          <ModalBody>
            <div style={starIcon} className="imghover">

              <div value="VP"
                onClick={() =>
                  handleInputRatingChange(
                    addFeadback.rating === "VP" ? "" : "VP"
                  )
                }>{RatingColors[addFeadback.rating] && RatingColors[addFeadback.rating].id >= 1 || RatingColors == "VP" ? <FaStar className="star" /> : <FaRegStar className="star-2" />}  </div>
              {" "}
              &nbsp;

              <div value="P"
                onClick={() =>
                  handleInputRatingChange(addFeadback.rating === "P" ? "" : "P")
                }>{RatingColors[addFeadback.rating] && RatingColors[addFeadback.rating].id >= 2 || RatingColors == "P" ? <FaStar className="star" /> : <FaRegStar className="star-2" />} </div>

              &nbsp;

              <div value="AVG"
                onClick={() =>
                  handleInputRatingChange(
                    addFeadback.rating === "AVG" ? "" : "AVG"
                  )
                }>{RatingColors[addFeadback.rating] && RatingColors[addFeadback.rating].id >= 3 || RatingColors == "AVG" ? <FaStar className="star" /> : <FaRegStar className="star-2" />} </div>
              &nbsp;

              <div value="GD"
                onClick={() =>
                  handleInputRatingChange(
                    addFeadback.rating === "GD" ? "" : "GD"
                  )
                }>{RatingColors[addFeadback.rating] && RatingColors[addFeadback.rating].id >= 4 || RatingColors == "GD" ? <FaStar className="star" /> : <FaRegStar className="star-2" />} </div>
              &nbsp;

              <div value="VG"
                onClick={() =>
                  handleInputRatingChange(
                    addFeadback.rating === "VG" ? "" : "VG"
                  )
                }>{RatingColors[addFeadback.rating] && RatingColors[addFeadback.rating].id >= 5 || RatingColors == "VG" ? <FaStar className="star" /> : <FaRegStar className="star-2" />} </div>
            </div>
            <br />
            {addFeadback.rating && (
              <div
                style={{
                  ...RatingColors[addFeadback.rating].style,
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {RatingColors[addFeadback.rating].text}
              </div>
            )}
            <h4 style={heading}>Your Overall Experience</h4>
            <br />
            <textarea
              cols="40"
              rows="5"
              style={teXtArea}
              placeholder="Please share your feedback here..."
              name="feedback"
              onChange={handleInputFeedbackChange}
            ></textarea>
          </ModalBody>
          <br />
          <ModalFooter >
            <button
              className={`text-sm primary-button mr-2 marquee ${!addFeadback.rating || !addFeadback.feedback ? "disabled" : ""
                }`}
              style={Renewupgrade}
            // onClick={Verticalcentermodaltoggle}
            >
              {"Submit"}
            </button>


          </ModalFooter>
        </Form>
        <div style={Cancelbutton}>

          <button
            className='text-sm primary-button mr-2 marquee'
            style={Renewupgrade}
            onClick={Verticalcentermodaltoggle}
          >
            {"Cancel"}
          </button>
        </div>
      </Modal>
      {props.showCompliantsbutton && (
        <button
          className="text-sm primary-button mr-2 marquee"
          style={Renewupgrade}
          onClick={handleButoonshowhandhide}
        >
          + New Complaint
        </button>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setRatingInfo: (payload) => dispatch(setRatingInfo(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RatingComponent);
