import React from "react";
const Invite = () => {
  const Link = {
    width: "282px",
    height: "44px",
    backgroundColor: "#FFFFFF",
    border: "0.5px solid rgba(0, 0, 0, 0.5)",
    borderRadius: "8px",
    boxSizing: "border-box",
    outline: "none"
  };
  const Copybutton = {
    width: "133px",
    height: "44px",
    backgroundColor: "#3F79E9",
    color: "white",
    borderRadius: "8px"
  };
  const Status = {
    top: "25%",
    position: "relative"
  }
  const Fontsize = {
    fontSize: "12px",
    marginTop: "7px",
    marginLeft: "10px"
  }

  function checkEmptyValue(e) {
    if (e.target.value == "") {
      e.target.classList.remove("not-empty");
    } else {
      e.target.classList.add("not-empty");
    }
  }
  return (
    <React.Fragment>
      <div className="flex">
        <span style={{ display: "flex" }}>  <h3 className="font-bold text-lg ml-11 mb-3">Invite a friend </h3> <p className="data-info-text" style={Fontsize}>Vire referrals</p></span>
      </div>
      <div className="grid grid-cols-10 grid-rows-8 gap-6 mx-10">
        <div className=" item1 col-span-10 xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          {/* <label for="fname">Name:</label> */}
          <input style={Link} type="text" name="" placeholder="  &nbsp; name" />
        </div>
        <div className=" item1 col-span-10 xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          {/* <label for="fname">Email:</label> */}
          <input style={Link} type="text" name="" placeholder="  &nbsp; Eamil" />
        </div>
        <div className=" item1 col-span-10 xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          {/* <div className="input_wrap">
                      <Input
                        className="form-control"
                        type="text"
                        name="name"
                        onBlur={checkEmptyValue}
                      />
                      <Label className="placeholder_styling">
                        Add Source *
                      </Label>
                    </div> */}
          {/* <label for="fname">Mobile:</label>  */}
          <input style={Link} type="text" name="" placeholder="  &nbsp; Mobile" />
        </div>
        <div className=" item1 col-span-10 xl:col-span-1 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          <input type="submit" value="submit" style={Copybutton} />
        </div>

      </div>
    </React.Fragment>
  );
};
export default Invite;
