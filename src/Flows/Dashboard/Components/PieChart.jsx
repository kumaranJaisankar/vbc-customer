import React from "react";

import { PieChart } from "react-minimal-pie-chart";

const PieChartComponent = (props) => {
  const { remaining_data, used_data, used_today } = props;
  const remaining_value = remaining_data - remaining_data%10;
  const used_value = used_data - used_data%10;

  return (
    <React.Fragment>
      <div className="relative">
        <PieChart
          data={[
            { title: `${remaining_data} GB remaining`, value: remaining_value, color: "#d7d7d7" },
            { title: `${used_data} GB used`, value: used_value, color: "#3f78e9" },
          ]}
          lineWidth={20}
          radius={25}
          animate
          animationDuration={500}
        />
        <div className="absolute vbc-app-pie-chart-text">
          <span className="block">Today</span>
          <span className="block font-bold">{parseFloat(used_today).toFixed(1) + "GB"}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PieChartComponent;
