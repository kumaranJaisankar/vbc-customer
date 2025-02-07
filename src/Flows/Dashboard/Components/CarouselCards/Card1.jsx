import React from "react";
import CardImage1 from "../../../../Assets//image 33.svg";
export const Card1 = () => {
  return (
    <React.Fragment>
      <div className={"vbc-ad-carousel"}>
        <img src={CardImage1} />
        <div className={"text-left p-4"}>
          <h4>ALL PRODUCTS </h4>
          <p>
            We would like to introduce ourselves as VBC on FIBER. We provide
            Internet services as a 'B' class ISP licensed in ANDHRA PRADESH. We
            use state-of-the-art technology from leaders in the industry to
            ensure that we stay at the leading edge of Internet Technology since
            2012. VBC ON FIBER has a high-performance network infrastructure
            that gives you high-speed Internet. From the beginning, the focus
            has been on speed, bandwidth, and service to our customers to date.
            We offer a full suite of business and personal internet services. A
            range of bandwidth and interfaces are available from 128 kbps to one
            lakh MBPS and above, allowing the services to be customized as per
            requirements. Our vision is that we aim to provide Internet access
            to all individuals through our value-based connectivity services.
            Mission: The purpose of VBC is to provide reliable and
            cost-effective high-speed Internet access to people.
          </p>
          <p className={"text-xs m-2 ml-0"}>*TnC apply</p>
        </div>
      </div>
    </React.Fragment>
  );
};
