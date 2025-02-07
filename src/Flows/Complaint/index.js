import React, { useState, useEffect } from "react";
import ComplaintsTable from "./Components/ComplaintsTable";
import TitleComponent from "../../CommonComponents/TitleComponent";
import NewComplaintsButtons from "./Components/newcomplaintbuttons";
import { getDashboardData } from "../../Axios/index";

/* These two lines to get customer id */
import { connect } from "react-redux";
import { setDashBoardData } from "../../Redux/Dashboard/actions";

const Complaints = (props) => {
  const [showaddCompliants, setShowaddcomplaint] = useState(false);
  const [showCompliantsbutton, setShowcomplaintsbuttons] = useState(true);

  useEffect(() => {
    if (!props.customer_id) {
      (async function () {
        try {
          const response = await getDashboardData("/customers/web/app");
          const { data } = response;
          props.setDashBoardData(data);
        } catch (e) {
          console.log(e);
        }
      })();
    }
  }, []);

  return (
    <React.Fragment>
      <TitleComponent 
        title={showaddCompliants ? "New Complaint" : "Complaints"}
        renderButton={
          <NewComplaintsButtons
            setShowaddcomplaint={setShowaddcomplaint}
            showaddCompliants={showaddCompliants}
            setShowcomplaintsbuttons={setShowcomplaintsbuttons}
            showCompliantsbutton={showCompliantsbutton}
          />
        }
      />
      <ComplaintsTable
        showaddCompliants={showaddCompliants}
        setShowaddcomplaint={setShowaddcomplaint}
        setShowcomplaintsbuttons={setShowcomplaintsbuttons}
        customer_id={props.customer_id}
      />
    </React.Fragment>
  );
};

/* These lines */
const mapStateToProps = (state) => {
  const { dashboardData } = state.dashBoard;
  const { complaints } = state.complaints;
  let customer_id = "";
  if (dashboardData) {
    customer_id = dashboardData.customer_id;
  }
  return {
    customer_id,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setDashBoardData: (payload) => dispatch(setDashBoardData(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Complaints);