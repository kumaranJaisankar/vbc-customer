import React from "react";
import HistoryDataTable from "./Components/HistoryTableComponent";
import TitleComponent from "../../CommonComponents/TitleComponent";
import RenderButtons from "../../CommonComponents/RenderButtons";

const SelectInput = (props) => {
  return (
    <React.Fragment>
      <label for="sort_by">Sort By:</label>

      <select name="sort_by" id="sort_by">
        <option>Month</option>
        <option>Day</option>
        <option>Hour</option>
      </select>
    </React.Fragment>
  );
};

export default () => {
  return (
    <React.Fragment>
      <TitleComponent title={"Sessions"}  />
      <HistoryDataTable />
    </React.Fragment>
  );
};
