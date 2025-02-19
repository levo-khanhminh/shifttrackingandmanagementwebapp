import { useEffect, useState } from "react";
import Main from "./Main";
import { DotLoader } from "react-spinners";
import axios from "axios";
import CustomNotification from "./CustomNotification";
export const Dashboard = ({
  user,
  userInfor,
  children,
  setCurrentUser,
  handleSignOut,
  setCurrentUserInfor,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [staffList, setStaffList] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  const [notifType, setNotifType] = useState("");
  useEffect(() => {
    getStaffs();
    if (localStorage.getItem("userInfor") && localStorage.getItem("user")) {
      reload();
    } else {
      findUserInfor();
    }
    setTimeout(() => {
      setIsLoading(false);
      setNotifTitle("Notification");
      setNotifMessage("Successfully login");
      setNotifType("Infor");
      setShowNotif(true);
    }, 1500);
  }, []);
  function reload() {
    setCurrentUserInfor(JSON.parse(localStorage.getItem("userInfor")));
    setCurrentUser(JSON.parse(localStorage.getItem("user")));
  }
  async function findUserInfor() {
    const userId = user._id;
    try {
      const res = await axios.get(
        `http://localhost:3000/${
          user.role === "STAFF" ? "StaffInfo" : "ManagerInfor"
        }/${userId}`
      );
      console.log(res);
      setCurrentUserInfor(res.data.userInfor[0]);
      localStorage.setItem("userInfor", JSON.stringify(res.data.userInfor[0]));
    } catch (error) {
      console.log(error);
    }
  }

  async function getStaffs() {
    try {
      const res = await axios.get("http://localhost:3000/Staffs");
      setStaffList(res.data.staffs);
    } catch (error) {
      console.log(error);
    }
  }

  if (isLoading)
    return (
      <div className="spinner">
        {" "}
        <DotLoader color="#03dac6" size={150} className="spinner" />
      </div>
    );
  return (
    <div>
      <CustomNotification
        type={notifType}
        message={notifMessage}
        title={notifTitle}
        showNotification={showNotif}
        setShowNotification={setShowNotif}
      />
      {children}
      <Main
        user={user}
        userInfor={userInfor}
        handleSignOut={handleSignOut}
        staffs={staffList}
      />
    </div>
  );
};
