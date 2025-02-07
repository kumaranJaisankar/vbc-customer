import React from "react";
import "./CommonComponents.style.css";
const TitleComponent = (props) => {
  const { title, renderButton, children } = props;
  return (
    <React.Fragment>
      <div className="vbc-title-component flex flex-col-reverse items-start md:flex-row md:items-center">
        <div className="vbc-title-dashboard">
          <h3 className="text-2xl font-bold ml-5">{title}</h3>
        </div>
        <div className="ml-8 mr-auto w-full">{children}</div>
        <div className="mr-auto ml-8 mb-2 md:ml-auto md:mr-8">
          {renderButton}
        </div>
      </div>
    </React.Fragment>
  );
};
export default TitleComponent;
