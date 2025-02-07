import React from "react";

export const NewComplaintsButtons = (props) => {
 
  const Renewupgrade = {
    height:"35px",
    borderRadius:"5px",
    width: "max-content"
  }
  const handleButoonshowhandhide = ()=>{
    props.setShowaddcomplaint(true)
    props.setShowcomplaintsbuttons(false)
  }
  return (
    <>
     {props.showCompliantsbutton &&  <button
        className="text-sm primary-button mr-2 marquee" style={Renewupgrade}
        onClick={handleButoonshowhandhide}
      > 
        + New Complaint
      </button>
     }
     
    </>
  );
};



export default NewComplaintsButtons;
