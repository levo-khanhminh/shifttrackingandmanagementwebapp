import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//FontAwesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
function BoxButton({ icon, text = "task", handleOnClick }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      className={`box ${isHover ? "boxHover" : " "}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={handleOnClick}
    >
      <span className={`faIcons ${isHover ? "faIconsHover" : " "}`}>
        {icon}
      </span>
      <span className="texts">{text}</span>
    </div>
  );
}

const SideBar = ({ handleSignOut, userInfor, setDisplayContent, user }) => {
  const navigate = useNavigate();
  return (
    <div className="side-bar">
      <div className="side-bar-title">
        <span className="iconUser">
          <FontAwesomeIcon icon={faUserTie} color={"#ffffff"} />
        </span>
        <span>Welcome!</span>
        <span className="userName">{userInfor.fullname}</span>
      </div>
      {user?.role === "MANAGER" && (
        <BoxButton
          text="Scheduling"
          icon={<FontAwesomeIcon icon={faCalendarDays} />}
          handleOnClick={() => setDisplayContent("Scheduling")}
        />
      )}
      {user?.role === "MANAGER" && (
        <BoxButton
          handleOnClick={() => setDisplayContent("Staffs")}
          text="Staffs"
          icon={<FontAwesomeIcon icon={faUsers} />}
        />
      )}
      <BoxButton
        text="Profile"
        icon={<FontAwesomeIcon icon={faUser} />}
        handleOnClick={() => setDisplayContent("Profile")}
      />
      {user.role === "STAFF" && (
        <BoxButton
          text="View Schedule"
          icon={<FontAwesomeIcon icon={faListCheck} />}
          handleOnClick={() => setDisplayContent("View Schedule")}
        />
      )}
      <BoxButton text="Messages" icon={<FontAwesomeIcon icon={faEnvelope} />} />
      {user?.role === "MANAGER" && (
        <BoxButton
          text="Overview"
          icon={<FontAwesomeIcon icon={faBars} />}
          handleOnClick={() => setDisplayContent("Overview")}
        />
      )}

      <BoxButton
        handleOnClick={() => {
          handleSignOut();
          navigate("/login");
        }}
        text="Sign out"
        icon={<FontAwesomeIcon icon={faPowerOff} />}
      />
    </div>
  );
};

export default SideBar;
