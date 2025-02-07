import React from "react";
import { SunspotLoader } from "react-awesome-loaders";
export default () => {
  return (
    <><div className="flex w-full h-full justify-center items-center">
      <SunspotLoader
        gradientColors={["#6366F1", "#E0E7FF"]}
        shadowColor={"#3730A3"}
        desktopSize={"128px"}
        mobileSize={"100px"}
      />
      </div>
    </>
  );
};
