import React, { useEffect, useState, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { FaRegBell, FaRegUserCircle, FaTimes } from "react-icons/fa";
import { capitalizeString } from "../Utils/Constants";
import RenderButtons from "../CommonComponents/RenderButtons";
import TitleComponent from "../CommonComponents/TitleComponent";
import { Link } from "react-router-dom";
import { logOut } from "../Axios/AxiosHelpers";
import ReconnectingWebSocket from "reconnecting-websocket";
import { FaBars } from "react-icons/fa";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const iconStyles = {
  color: "gray",
  cursor: "pointer",
};

const iconSize = {
  width: "30px",
  height: "30px",
  color: "lightgray",
};

const Header = (props) => {
  const [username, setUsername] = useState("XXXXXXXXXX");
  const [first_name, setFirstName] = useState("there");
  const [searchBarFocus, setSearchBarFocus] = useState(false);
  const [searchBarValue, setSearchBarValue] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      setUsername(JSON.parse(userData).username);
      setFirstName(JSON.parse(userData).first_name);
    }
  });

  const firstName = capitalizeString(first_name);

  const date = new Date();
  const hour = date.getHours();

  const handleSearchIconFocus = () => {
    setSearchBarFocus(true);
    searchInputRef && searchInputRef.current && searchInputRef.current.focus();
  };

  const handleSearchIconBlur = () => {
    setSearchBarFocus(false);
    setSearchBarValue("");
  };

  const handleSearchBarValueChange = (e) => {
    setSearchBarValue(e.target.value);
  };

  const searchInputRef = useRef(null);

  const websocketFunc = () => {
    const username = localStorage.getItem("token");
    let billingbaseurl = process.env.REACT_APP_API_URL_CAMPAIGN?.split("//")[1];
    let protocol = window.location.protocol ? "wss:" : "ws:";
    var ws = new ReconnectingWebSocket(
      `${protocol}//${billingbaseurl}/ws/notification/${
        JSON.parse(username)?.username
      }/`
    );
    if (username !== undefined || username !== null) {
      ws.onopen = () => {
        console.log("socket cnxn successful");
      };
      // ws.onclose = (e) => {
      //   ws = null
      //   console.log("socket closed", e);

      // };
      ws.onclose = (e) => {
        // dispatch({ type: 'DISCONNECTED' })
        console.log("socket closed", e);
      };
      ws.onmessage = (e) => {
        console.log(e.data, "responseData");
        let responseData = JSON.parse(e.data);
        console.log(responseData, "responseData");
      };
    } else {
      ws.close();
      console.log("WebSocket connection closed due to logout");
    }
  };

  useEffect(() => {
    websocketFunc();
  }, [firstName]);
  const history = useHistory();
  const logout = () => {
    websocketFunc();
    logOut();
    history.push("/login");
    history.go(0);
  };

  return (
    <React.Fragment>
      <div className="vbc-app-header flex flex-row pt-3 pb-3 items-center">
        <div className="">
          {props.state === true ? (
            <button className="toggle-header" onClick={props.toggleSidebar}>
              {/* <FaBars size={20} /> */}
            </button>
          ) : (
            ""
          )}
          <div className="ml-10">
            <h3>Hello, {firstName}</h3>
          </div>
          <div className="ml-10 text-md">
            {" "}
            {hour >= 12 ? (
              hour >= 16 ? (
                <h5>Good Evening..</h5>
              ) : (
                <h5> Good Afternoon..</h5>
              )
            ) : (
              <h5> Good Morning..</h5>
            )}
          </div>
        </div>

        <div className="ml-auto flex flex-row items-center justify-center mr-10 relative">
          <span className={""}>
            <RenderButtons />
          </span>
          |
          {/* <input
            className={`text-sm transition-width duration-500 ease-in-out ${
              searchBarFocus ? "w-80 bg-white ml-3 p-1" : "w-0 bg-transparent"
            }`}
            value={searchBarValue}
            onBlur={handleSearchIconBlur}
            onChange={handleSearchBarValueChange}
            placeholder={searchBarFocus && "Search"}
            ref={searchInputRef}
          ></input> */}
          {/* <span className={`relative right-5 ${!searchBarFocus && "ml-10"}`}>
            {!searchBarFocus ? (
              <GoSearch style={iconStyles} onClick={handleSearchIconFocus} />
            ) : (
              <FaTimes style={iconStyles} onClick={handleSearchIconBlur} />
            )}
          </span> */}
          <span className="ml-3">
            <FaRegBell style={iconStyles} />

            {/* <div class="dropdown">
            <div class="dropdown-content">
              <ul>
                <li>
                  <p>hi</p>
                </li>
              </ul>
            </div>
          </div> */}
          </span>
          <span className="ml-5 mr-1">
            <FaRegUserCircle style={iconSize} />
          </span>
          <div class="dropdown">
            <h5 style={{ cursor: "pointer" }}>{firstName}</h5>
            <b style={{ cursor: "pointer" }}>{username}</b>
            <div class="dropdown-content">
              <ul>
                {/* <li>My Account</li>
                <li style={{ marginTop: "10px" }}>Settings</li> */}
                <li style={{ marginTop: "9px" }}>
                  <Link to="/">
                    <span className="" onClick={logout}>
                      Logout
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
