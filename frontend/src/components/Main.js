import React from "react";
import SideBar from "./SideBar";
import Profile from "./Profile";
import { useState } from "react";
import Overview from "./Overview";
import StaffList from "./StaffList";
import Scheduling from "./Scheduling";
import ViewSchedule from "./ViewSchedule";

const Main = ({ user, handleSignOut, userInfor, staffs }) => {
  const [displayContent, setDisplayContent] = useState("Profile");
  return (
    <div className="main">
      <SideBar
        handleSignOut={handleSignOut}
        setDisplayContent={setDisplayContent}
        userInfor={userInfor}
        user={user}
      />
      <div className="main-container-left">
        {displayContent === "Overview" && <Overview />}
        {displayContent === "StaffList" && <StaffList staffs={staffs} />}
        {displayContent === "Profile" && (
          <Profile user={user} infor={userInfor} />
        )}
        {displayContent === "Staffs" && <StaffList staffs={staffs} />}
        {displayContent === "Scheduling" && <Scheduling staffs={staffs} />}
        {displayContent === "View Schedule" && (
          <ViewSchedule staff={userInfor} />
        )}
      </div>
    </div>
  );
};

export default Main;
