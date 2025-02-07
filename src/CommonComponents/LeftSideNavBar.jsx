import React from "react";
import "./CommonComponents.style.css";
import { Link, withRouter } from "react-router-dom";
import { SIDE_NAV_LINKS, ADDITIONAL_SIDE_NAV_LINKS } from "../Utils/Constants";
import { ReactComponent as DashboardIcon } from "../Assets/dashboard.svg";
import { ReactComponent as InvoiceIcon } from "../Assets/invoice.svg";
import { ReactComponent as ComplaintsIcon } from "../Assets/complaints.svg";
import { ReactComponent as SettingsIcon } from "../Assets/news.svg";
import { ReactComponent as FAQsIcon } from "../Assets/faqs.svg";
import { ReactComponent as KnowledgeIcon } from "../Assets/knowledge.svg";
import { ReactComponent as NewsIcon } from "../Assets/news.svg";
import { ReactComponent as LogoutIcon } from "../Assets/logout.svg";
import { ReactComponent as HistoryIcon } from "../Assets/history.svg";
import { FaBars } from 'react-icons/fa';



import { routes } from "../Routes";

import logoSrc from "../Assets/logo.jpg";
// import logoSrc from "../Assets/app_logo.PNG";

import { logOut } from "../Axios/AxiosHelpers";


const iconHeight = 15;
const iconWidth = 15;
const fillColor = "#3F79E9";
const nonSelectedFillColor = "#808080";

const logoStyles = {
  width: "100px",
  height: "50px",
};

const getSideBarIcon = (linkName, currentPath) => {
  const isLinkNameEqualsCurrentRoute = linkName.toLowerCase() === currentPath;
  const iconColor = isLinkNameEqualsCurrentRoute
    ? fillColor
    : nonSelectedFillColor;
  switch (linkName) {
    case "Dashboard":
      return (
        <DashboardIcon height={iconHeight} width={iconWidth} fill={iconColor} />
      );
    case "Invoices":
      return (
        <InvoiceIcon height={iconHeight} width={iconWidth} fill={iconColor} />
      );
    case "Sessions":
      return (
        <HistoryIcon height={iconHeight} width={iconWidth} fill={iconColor} />
      );
    case "Complaints":
      return (
        <ComplaintsIcon
          height={iconHeight}
          width={iconWidth}
          fill={iconColor}
        />
      );
       case "Documents":
      return (
        <SettingsIcon height={iconHeight} width={iconWidth} fill={iconColor} />
      );
    // case "Settings":
    //   return (
    //     <SettingsIcon height={iconHeight} width={iconWidth} fill={iconColor} />
    //   );
    // case "FAQs":
    //   return (
    //     <FAQsIcon height={iconHeight} width={iconWidth} fill={iconColor} />
    //   );
    // case "Refer_&_Earn":
    //   return (
    //     <KnowledgeIcon height={iconHeight} width={iconWidth} fill={iconColor} />
    //   );
    // case "News":
    //   return (
    //     <NewsIcon height={iconHeight} width={iconWidth} fill={iconColor} />
    //   );
    default:
      return <></>;
  }
};

const getLinkToFromLinkName = (linkName) => {
  const routeObj = routes.find((item) => item.linkName === linkName);
  return routeObj ? routeObj.link : "/";
};

const LeftSideNavBar = (props) => {
  const currentPath = window.location.pathname.split("/")[1];
  if (!props.isSidebarOpen) return null;

  return (
    <div className={`vbc-app-left-side-bar ${props.isSidebarOpen ? 'open' : ''}`} >
      <div className="vbc-app-logo mt-2">
        <img src={logoSrc} style={logoStyles} />
      </div>
      <button className="toggle-sidebar-btn" onClick={props.toggleSidebar}>
    <FaBars size={20} />
</button>
      {SIDE_NAV_LINKS.map((link) => {
        return (
          <Link to={getLinkToFromLinkName(link)} >
                {/* <FaBars/> */}
            <div className="flex flex-col items-center">
              <span className={`sidebar-icon`}>
                {getSideBarIcon(link, currentPath)}
              </span>
              <div
                className={`sidebar ${
                  link.toLowerCase() === currentPath
                    ? "link-selected font-bold"
                    : ""
                }`}
              >
                {link.split("_").join(" ")}
              </div>
            </div>
          </Link>
        );
      })}
      {ADDITIONAL_SIDE_NAV_LINKS.map((link) => {
        return (
          <>
            <span className={`sidebar-icon`}>{getSideBarIcon(link)}</span>
            <div
              className={`sidebar ${
                link.toLowerCase() === currentPath
                  ? "link-selected font-bold"
                  : ""
              }`}
            >
              {link}
            </div>
          </>
        );
      })}

      <Link to="/">
        <span
          className="relative top-4 text-center flex flex-col items-center"
          onClick={logOut}
        >
          {/* <span className={`sidebar-icon`}>
            <LogoutIcon
              height={iconHeight}
              width={iconWidth}
              fill={nonSelectedFillColor}
            />
          </span>
          <div className={`sidebar`}>{"Log out"}</div> */}
        </span>
      </Link>
    </div>
  );
};

export default withRouter(LeftSideNavBar);
