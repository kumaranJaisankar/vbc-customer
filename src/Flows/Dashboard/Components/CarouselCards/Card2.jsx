import React from "react";
import CardImage21 from "../../../../Assets//image 36.svg";

export const Card2 = () => {
  return (
    <React.Fragment>
      <div className={"vbc-ad-carousel"}>
        <img src={CardImage21} />
        <div className={"text-left p-4"}>
          <h4>IPTV / OTT </h4>
          <p>
            Internet Protocol television (IPTV) is a system through which
            television services are delivered using the Internet Protocol suite
            over a packet-switched network such as a LAN or the Internet,
            instead of being delivered through traditional terrestrial,
            satellite signals, and cable television formats. Unlike downloaded
            media, IPTV offers the ability to stream the media in smaller
            batches, directly from the source. As a result, a client media
            player can begin playing the data (such as a movie) before the
            entire file has been transmitted. This is known as streaming media.
          </p>
          <p className={"text-xs m-2 ml-0"}>*TnC apply</p>
        </div>
      </div>
    </React.Fragment>
  );
};
