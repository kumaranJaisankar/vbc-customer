import React from "react";
import InviteImg from "../../../Assets/inivite.png" 
import Earnimg from "../../../Assets/earn.png"
import Linkimg from "../../../Assets/link.png"
import Referall from "../../../Assets/refeeral.png"
const Works = () => {

  return (
    <React.Fragment>
      <div className="flex">
        <h3 className="font-bold text-lg ml-11 mb-3">How it works ?</h3>
      </div>
      <div className="grid grid-cols-10 grid-rows-8 gap-6 mx-10">
      <div className="item1 col-span-10 xl:col-span-1 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          <img src={Earnimg} style={{paddingTop:"30px"}}/>
          <img src={Linkimg} style={{paddingTop:"70px"}}/>
          <img src={Referall} style={{paddingTop:"80px"}}/>
      </div>
      
          <div className="item1 col-span-10 xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
              <h3>Share your referral link</h3>
              <p>Invite your friends to joing VBConfiber using your referral link or code.</p>
              <br/>
              <h3>Your friend joins VBConfiber</h3>
              <p>Your friend will get 200 points as welcome bonus when they takes VBConfiber connection using your link.</p>
              <br/>
              <h3>Earn rewards</h3>
              <p> On each new connection, you will receive reward points of 300 in you VBC account. Use this points while paying your bill.</p>
          </div>
          <div className="item1 col-span-3 xl:col-span-4 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
         
          </div>
          <div className="item1 col-span- xl:col-span-2 sm:col-span-4 md:col-span-5 sm:col-span-8 row-span-2">
          <img src={InviteImg}  />
          </div>
      </div>
    </React.Fragment>
  );
};
export default Works;
