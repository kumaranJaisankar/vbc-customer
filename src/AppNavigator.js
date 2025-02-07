import React, { Suspense } from "react";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Store/index";

import LeftSideNavBar from "./CommonComponents/LeftSideNavBar";
import SidePanes from "./CommonComponents/SidePanes";
import Header from "./CommonComponents/Header";
import Loader from "./CommonComponents/Loader";
import { routes } from "./Routes";
import Login from "./CommonComponents/Login";
import { getCurrentUserSession } from "./Axios/AxiosHelpers";

const AppNavigator = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [state,setState] = React.useState(false)
  const getInitialRedirectURL = () => {
    if (window.location.pathname === "/") {
      return "/dashboard";
    } else return window.location.pathname;
  };

  const toggleSidebar = () => {
    console.log("clicked")
    setIsSidebarOpen(!isSidebarOpen);
    setState(true)
}
  return (
    <React.Fragment>
      <Provider store={store}>
        <BrowserRouter basename={`/`}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <div className="vbc-app-main-container">
              <LeftSideNavBar isSidebarOpen={isSidebarOpen} 
    toggleSidebar={toggleSidebar}
/>
              <div className="vbc-app-main-content">
                <Header  toggleSidebar={toggleSidebar} state={state}/>
                <Suspense fallback={<Loader />}>
                  <Route
                    // exact
                    path={"/"}
                    render={() => {
                      return getCurrentUserSession() ? (
                        <Redirect
                          to={getInitialRedirectURL()}
                        />
                      ) : (
                        <Redirect to={"/login"} />
                      );
                    }}
                  />
                  {routes.map((route, index) => (
                    <Route key={route + index} path={route.link}>
                      {route.component()}
                    </Route>
                  ))}
                </Suspense>
                <SidePanes />
              </div>
            </div>
          </Switch>
        </BrowserRouter>
      </Provider>
    </React.Fragment>
  );
};

export default AppNavigator;
