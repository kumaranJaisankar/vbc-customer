import React from "react";
import { ReactComponent as UploadIcon } from "../../../Assets/upload.svg";
import { ReactComponent as DownloadIcon } from "../../../Assets/download.svg";

const iconHeight = 24;
const iconWidth = 24;

const iconStyles = {
  position: "relative",
  top: 0,
  left: "3px",
}
const inlineDisplay = { display: "inline" }
const height = "h-1/3";

const UploadDownloadCard = (props) => {
  const { downloadGB, uploadGB } = props;
  return (
    <React.Fragment>

      <div className="vbc-app-upload-download card mt-1">
        <div className="vbc-app-upload">
          Upload<span style={iconStyles} ><UploadIcon style={inlineDisplay} height={iconHeight} width={iconWidth} /></span>
          <p className="data-info-text mt-1">{uploadGB ? (
            parseFloat(uploadGB).toFixed(1)
          ) : (
            "0"
          )}GB</p>
        </div>
        <div className="vbc-app-download">
          Download<span style={iconStyles}><DownloadIcon style={inlineDisplay} height={iconHeight} width={iconWidth} /></span>
          <p className="data-info-text mt-1">{downloadGB ? (
            parseFloat(downloadGB).toFixed(1)
          ) : ("0")}GB</p>
        </div>
      </div>
    </React.Fragment>
  );
};

UploadDownloadCard.defaultProps = {
  downloadGB: 0,
  uploadGB: 0
};

export default React.memo(UploadDownloadCard);
