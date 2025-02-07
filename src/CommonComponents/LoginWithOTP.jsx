import React, { useEffect, useState, useRef } from "react";
import OtpInput from "react-otp-input";
import { loginWithOTP } from "../Axios/";
import { useHistory } from "react-router";
import "./CommonComponents.style.css";
import { SunspotLoader } from "react-awesome-loaders";
export const LoginWithOTP = (props) => {
  const history = useHistory();
  const [otp, setOTP] = useState("");
  const [hasError, setError] = useState(false);
  const [counter, setCounter] = useState(30);
  const [isWrongCredentials, setWrongCredentials] = useState(false);
  const timerID = useRef(null);
  const [errorMessage,setErrorMessage]=useState("")
  const [loaderSpinneer, setLoaderSpinner] = useState(false)
  const handleOTPChange = (otp) => {
    setOTP(otp);
  };

  const handleVerifyAndSubmit = async () => {
    setLoaderSpinner(true);
    const OTPString = otp + "";
    if (OTPString.split("").length < 6) {
      setError(true);
      setLoaderSpinner(false);
    } else {
      clearTimer();
      const userdata = { username: props.userName, otp };
      try {
        const response = await loginWithOTP("/accounts/login", userdata);
        const { data } = response;
        console.log(data);
        setLoaderSpinner(false);
        setOTP("");
        if (
          
          data &&
          data.detail === "No active account found with the given credentials"
        ) {
          setWrongCredentials(true);
          setErrorMessage(data?.detail)
          setLoaderSpinner(false);
          setOTP("");
        } else {
          localStorage.setItem("token", JSON.stringify(data));
          const redirectURL = `${process.env.PUBLIC_URL}/dashboard`;
          history.push(redirectURL);
        }
      } catch (e) {
        setOTP("");
        setLoaderSpinner(false);
        console.log(e,"error")
        setErrorMessage(e?.response?.data?.message)
        setTimeout(() => {
          setErrorMessage("")
          }, 4000);
        
        setWrongCredentials(true);
      }
    }
  };

  const decrementCounter = () => {
    if (counter === 0) {
      setCounter(30);
      clearTimer();
    } else setCounter((prevCounter) => prevCounter - 1);
  };

  const clearTimer = () => {
    setCounter(30);
    clearInterval(timerID.current);
    timerID.current = null;
  };

  useEffect(() => {
    timerID.current = setInterval(() => decrementCounter(), 1000);
  }, []);

  const handleResendClick = () => {
    setOTP("");
    props.handleSendOTPClick();
    props.setLoaderSpinner(true);
    console.log("Resend OTP");
    clearTimer();
    timerID.current = setInterval(() => decrementCounter(), 1000);
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  return (
    <React.Fragment>
      <OtpInput
        value={otp}
        onChange={handleOTPChange}
        numInputs={6}
        separator={<>{`-`}</>}
        containerStyle={""}
        inputStyle={"otp-input"}
        focusStyle={""}
        isInputNum={true}
        hasErrored={true}
      />
   {props.loaderSpinner ? 
    <SunspotLoader 
        gradientColors={["#000", "#000"]}
        color={"#000"}
        // shadowColor={"#3730A3"}
        desktopSize={"10px"}
        mobileSize={"10px"}
    /> :  
    (props.otpExpiry !== null ? 
        <span className="mt-10 mb-5 text-base text-center">
            OTP will Expire in: {formatTime(props.otpExpiry)}
        </span> :
       <span>{props.otpExpiry}</span> 
    )
}

      {isWrongCredentials && (
                <span className="error-text" style={{marginTop:"15px",marginBottom:"-15px"}}>{errorMessage}</span>
              )}
      <span className="mt-10 mb-5 text-base text-center">
        Did not receive code?
        <button className="font-bold ml-2 link" onClick={handleResendClick}>
          Resend again
        </button>
      </span>
      {/* <button
        className="block mb-3 secondary-button w-60 p-1"
        onClick={handleVerifyAndSubmit}
      >
        Verify and Sign in
      </button> */}
      <button
                  className="block mb-3 secondary-button w-60 p-1"
                  onClick={handleVerifyAndSubmit}
                  disabled={loaderSpinneer ? loaderSpinneer : loaderSpinneer}
                >
                  <span style={{position:"absolute",marginLeft:"-20px"}}>

                 {loaderSpinneer ? 
                 
                 <SunspotLoader 
                        gradientColors={["#000", "#000"]}
                        color={"#000"}
                        // shadowColor={"#3730A3"}
                        desktopSize={"10px"}
                        mobileSize={"10px"}
                      /> : null} &nbsp;  &nbsp;  &nbsp; 
                  </span>Verify and Sign in
                </button>
    </React.Fragment>
  );
};
