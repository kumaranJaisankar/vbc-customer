import React, { useState, useEffect } from "react";
import Invite from "./Invite";
import Works from "./works";
const ReferaFriend = () => {
  const Backcolor = {
    marginTop: "30px",
    padding: "20px",
  };
  const Code = {
    backgroundColor: "#F5F8FE",
    border: "0.5px dashed rgba(0, 0, 0, 0.5)",
    borderRadius: "4px",
    width: "fit-content",
  };
  const Link = {
    width: "282px",
    height: "44px",
    backgroundColor: "#FFFFFF",
    border: "0.5px solid rgba(0, 0, 0, 0.5)",
    boxSizing: "border-box",
  };
  const Copybutton = {
    width: "82px",
    height: "44px",
    backgroundColor: "#3F79E9",
  };
  const Fontsize = {
    fontSize: "12px",
    marginTop: "7px",
  };

  const Specialtext = {
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "23px",
    color: "#000000",
  };
  return (
    <React.Fragment>
      <div style={Backcolor}>
        <div style={{ backgroundColor: "white" }}>
          <br />
          <br />
          <div className="flex">
            <h3 className="font-bold text-lg ml-11 mb-3">Refer a friend</h3>
          </div>
          <div className="container">
            <div className="grid grid-cols-10 grid-rows-8 gap-6 mx-10">
              <div className=" item1 col-span-10 xl:col-span-1 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
                <p className=" ">Your points</p>
                <p className=" "> 1200</p>
                <p className="data-info-text" style={Fontsize}>
                  {" "}
                  View Statement
                </p>
              </div>
              <div
                className="item1 col-span-10 xl:col-span-1 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2"
                style={{ borderRight: "1px solid" }}
              ></div>
              <div className="item1 col-span-10 xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
                <p style={Specialtext}>
                  Refer a friend and earn 300 reward points when they take a new
                  connection using your code or link.
                </p>
              </div>
              <div
                className="item1 col-span-10 xl:col-span-3 sm:col-span-3 md:col-span-4 sm:col-span-7 row-span-2"
                style={{ textAlign: "-webkit-center" }}
              >
                <p>Your referral code</p>
                <p style={Code}>
                  {" "}
                  &nbsp; 6 &nbsp; 8 &nbsp; 6 &nbsp; 9 &nbsp; 4 &nbsp; 2 &nbsp;
                </p>
                <p>Tap on code to copy</p>
              </div>
              <div className="item1 col-span-10 xl:col-span-3 sm:col-span-4 md:col-span-4 sm:col-span-8 row-span-2 ">
                <p>Your referral link</p>
                <div id="Search">
                  <input
                    style={Link}
                    type="text"
                    name=""
                    value="https://user.vbctv.in/account"
                  />
                  <input type="submit" value="copy" style={Copybutton} />
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <Invite />
          <br />
          <br />
          <br />
          <Works />
          <br />
          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReferaFriend;
