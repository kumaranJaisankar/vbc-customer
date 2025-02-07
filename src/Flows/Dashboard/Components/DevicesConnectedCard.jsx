import React from "react";
import { ReactComponent as MobileIcon } from "../../../Assets/mobile.svg";
import { ReactComponent as LaptopIcon } from "../../../Assets/laptop.svg";
import { ReactComponent as DesktopIcon } from "../../../Assets/desktop.svg";
import { ReactComponent as OthersIcon } from "../../../Assets/Others.svg";

const titleStyle = {
  margin: "10px",
};

const iconHeight = 15;
const iconWidth = 15;

const iconPositionShift = {
  right:"5px"
}

const textPositionShift = {
  position: "relative",
  left: "3px"
}

const inlineDisplay = { display: "inline" }

const DevicesConnected = (props) => {
  return (
    <React.Fragment>
      <div className="vbc-app-devices-connected card h-2/3">
        <span style={titleStyle} className="text-lg font-bold">Devices Connected</span>
        <div className="vbc-app-devices row">
          <div className="one pb-2">
            <span className="vbc-app-icon-positions">
              <MobileIcon style={inlineDisplay} height={iconHeight} width={iconWidth} />
            </span>
            <span>3 Mobiles</span>
          </div>
          <div className="two">
            <span className="vbc-app-icon-positions">
              <LaptopIcon style={inlineDisplay} height={iconHeight} width={iconWidth} />
            </span>
            <span style={textPositionShift}>2 Laptops</span>
          </div>
        </div>
        <div className="vbc-app-devices row">
          <div className="one pb-2">
            <span className="vbc-app-icon-positions">
              <DesktopIcon style={inlineDisplay} height={iconHeight} width={iconWidth} />{" "}
            </span>
            <span>0 Desktops</span>
          </div>
          <div className="two">
            <span className="vbc-app-icon-positions" style={iconPositionShift}>
              <OthersIcon style={inlineDisplay} height={iconHeight} width={iconWidth} />
            </span>
            <span>0 Others</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(DevicesConnected);
