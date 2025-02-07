import React from "react";
import DocumentsList from "../CommonComponents/DocumentList";

// import Dashboard from "../Flows/Dashboard";
// import Dashboard from "../Flows/Dashboard/newIndex";
// import Invoices from "../Flows/Invoices";
// import History from "../Flows/History";

const Dashboard = React.lazy(() => import("../Flows/Dashboard/newIndex"));
const Invoices = React.lazy(() => import("../Flows/Invoices"));
const History = React.lazy(() => import("../Flows/History"));
const Complaints = React.lazy(() => import("../Flows/Complaint"));
const Knowledge = React.lazy(() => import("../Flows/Knowledge"));

export const routes = [
  {
    link: "/dashboard",
    linkName: "Dashboard",
    component: () => <Dashboard />,
  },
  {
    link: "/invoices",
    linkName: "Invoices",
    component: () => <Invoices />,
  },
  {
    link: "/session",
    linkName: "Sessions",
    component: () => <History />,
  },
  {
    link: "/complaints",
    linkName: "Complaints",
    component: () => <Complaints />,
  },
  {
    link: "/documents",
    linkName: "Documents",
    component: () => <DocumentsList />,
  },
  // {
  //   link: "/refer_&_earn",
  //   linkName: "Refer_&_Earn",
  //   component: () => <Knowledge />,
  // },
];
