import React, { useEffect, useState } from "react";
import { ReactComponent as LoginIllustration } from "../Assets/family_illustration.svg";
import { useHistory } from "react-router";
import { authenticateUser, sendOTPToVerifyAndLogin } from "../Axios/index";
import { IoMdArrowBack } from "react-icons/io";
import { validate } from "../Utils/Constants";
import { LoginWithOTP } from "./LoginWithOTP";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SunspotLoader } from "react-awesome-loaders";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
const iconStyles = {
  color: "gray",
};

const eyeicon = {
  display: "flex",
  position: "relative",
};

const Login = (props) => {
  const history = useHistory();
  // spinner
  const [loaderSpinneer, setLoaderSpinner] = useState(false);
  const [isLoginWithUsername, setIsLoginWithUserName] = useState(false);
  const [isWrongCredentials, setWrongCredentials] = useState(false);
  const [userNameForOTP, setUserNameForOTP] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [registeredMobileMessage, setRegisteredMobileMessage] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const Errortoggle = () => {
    setWrongCredentials(!isWrongCredentials);
  };
  const handleLogin = (e) => {
    loginWithJwt();
  };

  const loginWithJwt = async () => {
    setLoaderSpinner(true);
    const authURL = `/accounts/customer/token`;
    try {
      const response = await authenticateUser(authURL, { username, password });
      const { data } = response;
      console.log(data);
      if (
        data &&
        data.detail === "No active account found with the given credentials"
      ) {
        setWrongCredentials(true);
      } else {
        localStorage.setItem("token", JSON.stringify(data));
        const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
        history.push(redirectURL);
      }
    } catch (e) {
      setLoaderSpinner(false);
      Errortoggle(true);
    }
  };

  const handleLoginWithUsername = () => {
    setIsLoginWithUserName(true);
  };

  const handleBackButtonClick = () => {
    setIsLoginWithUserName(false);
    setShowOTPForm(false);
    setUserNameForOTP("");
  };

  const loginFormHeaderText = !isLoginWithUsername
    ? showOTPForm
      ? "Verify Phone"
      : "Enter username"
    : "Enter username and password";

  const loginProcessText = !isLoginWithUsername
    ? !showOTPForm
      ? "We will send a OTP code to registered mobile number"
      : `OTP sent to your mobile number ${
          registeredMobileMessage.split(" ")[3]
        }`
    : "";

  const userNameErrorText = "Please enter valid username";
  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUserNameForOTPChange = (e) => {
    setFormError(false);
    setUserNameForOTP(e.target.value);
  };

  useEffect(() => {
    if (otpExpiry === 0) {
      setOtpExpiry(null);
    }
    if (!otpExpiry) return;
    const intervalId = setInterval(() => {
      setOtpExpiry(otpExpiry - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [otpExpiry]);

  const handleSendOTPClick = async () => {
    setOtpExpiry(null);
    /*const errors = validate(userNameForOTP, "username");
    if (errors["mobile_number"]) {
      setFormError(true);
    } else {
      console.log(response);
    }
    */
    setLoaderSpinner(true);
    try {
      const userdata = {
        username: userNameForOTP,
      };
      const response = await sendOTPToVerifyAndLogin(
        "/accounts/customer/otp/send",
        userdata
      );
      const { message } = response.data;
      setOtpExpiry(180);
      setShowOTPForm(true);
      setRegisteredMobileMessage(message);
      setLoaderSpinner(false);
    } catch (e) {
      setOtpExpiry(null);
      setFormError(true);
      setTimeout(() => {
        setFormError(false);
      }, 3000);
      setLoaderSpinner(false);
    }
  };

  const HideShowPassword = (userpassword) => {
    setShowpassword(!userpassword);
  };

  return (
    <React.Fragment>
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full hidden md:block">
          <LoginIllustration className="bg-gray-100" />
        </div>
        <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gray-100">
          <div className="relative w-max h-3/4 p-10 text-center flex flex-col justify-start items-center bg-gray-100 neomorphic-login">
            {(isLoginWithUsername || showOTPForm) && (
              <span
                className="absolute left-4 top-4 cursor-pointer"
                onClick={handleBackButtonClick}
              >
                <IoMdArrowBack style={iconStyles} />
              </span>
            )}
            <>
              {/* comment */}
              <h3 className="mt-4">Login</h3>
              <br />
              <br />
              <h4>{loginFormHeaderText}</h4>
              <span className="block text-xs mb-10">{loginProcessText}</span>
              {formError && (
                <span className="error-text mb-2">{userNameErrorText}</span>
              )}
            </>
            {!isLoginWithUsername && !showOTPForm && (
              <>
                <span className="block mb-5">
                  <input
                    className={`w-60 p-1 ${formError && "invalid"}`}
                    placeholder="Enter Username"
                    value={userNameForOTP}
                    onChange={handleUserNameForOTPChange}
                  ></input>
                </span>
                {/* <button
                  className={`block mb-3 secondary-button w-60 p-1
                  ${   userNameForOTP.length < 3 && "disabled"  }
                   `
                 }

                  onClick={handleSendOTPClick}
                  disabled={userNameForOTP.length < 3}

                >
                  Send OTP
                </button> */}
                <button
                  className={`block mb-3 secondary-button w-60 p-1
                 ${userNameForOTP.length < 3 && "disabled"}
                  `}
                  onClick={handleSendOTPClick}
                  //  disabled={userNameForOTP.length < 3 }

                  // disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer}
                  disabled={userNameForOTP.length < 3 || loaderSpinneer}
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
                  Send OTP
                </button>
                <span className="mb-3" id="vbc-app-OR">
                  or
                </span>
                <button
                  className="block secondary-button w-60 p-1"
                  onClick={() => handleLoginWithUsername()}
                >
                  Login with username
                </button>
              </>
            )}

            {isLoginWithUsername && (
              <>
                <span className="block mb-5">
                  <input
                    className="w-60 p-1"
                    placeholder="Username"
                    value={username}
                    onChange={handleUserNameChange}
                  ></input>
                </span>
                <span className="block mb-5" style={eyeicon}>
                  <input
                    type={showpassword ? "" : "password"}
                    className="w-60 p-1"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  ></input>
                  <div
                    className="show-hide"
                    style={{ top: "8px", right: "8px", position: "absolute" }}
                    onClick={() => HideShowPassword(showpassword)}
                  >
                    {showpassword ? <FaEye /> : <FaEyeSlash />}
                  </div>
                </span>
                <button
                  className="block secondary-button w-60 p-1"
                  onClick={() => handleLogin()}
                  disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer}
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
                  Sign in
                </button>
              </>
            )}

            {showOTPForm && (
              <LoginWithOTP
                handleSendOTPClick={handleSendOTPClick}
                userName={userNameForOTP}
                otpExpiry={otpExpiry}
                setOtpExpiry={setOtpExpiry}
                setLoaderSpinner={setLoaderSpinner}
                loaderSpinneer={loaderSpinneer}
              />
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isWrongCredentials}
        toggle={Errortoggle}
        centered
        backdrop={false}
      >
        <ModalBody>
          <br />
          <h4>
            No active account found with the given credentials, <br />
            So please connect call center (0891) 6677 - 123 , 6677 - 124
          </h4>
          <br />
        </ModalBody>
        <br />
        <ModalFooter style={{ textAlign: "center" }}>
          <button
            className="text-sm primary-button mr-2 marquee"
            onClick={Errortoggle}
          >
            {"Ok"}
          </button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
};

export default Login;
