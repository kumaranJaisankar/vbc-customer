import React from "react";
import InvoicesDataTable from "./Components/InvoicesTableComponent";
import TitleComponent from "../../CommonComponents/TitleComponent";
import RenderButtons from "../../CommonComponents/RenderButtons";
export default () => {
  return (
    <React.Fragment>
      <TitleComponent title={"Invoices"}  />
      <InvoicesDataTable />
    </React.Fragment>
  );
};
