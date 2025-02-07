import React from "react";
import { CgClose } from "react-icons/cg";

export const Alert = (props) => {
  const { message, onClose, anchor, anchorText, onAnchorClick } = props;

  const iconHeight = "25px";
  const iconWidth = "25px";

  return (
    <React.Fragment>
      <div
        role="alert"
        className="alert-wrapper flex justify-between items-center p-2"
      >
        <div className="">
          {message}
          {anchor ? (
            <>
              <a className="underline" href="#" onClick={onAnchorClick}>
              {" "}{anchorText}
              </a>
            </>
          ) : (
            ""
          )}
        </div>
        <CgClose
          onClick={() => onClose()}
          style={{
            height: iconHeight,
            width: iconWidth,
            cursor: "pointer",
          }}
        />
      </div>
    </React.Fragment>
  );
};
