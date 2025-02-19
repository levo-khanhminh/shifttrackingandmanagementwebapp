import React, { useEffect } from "react";
import { useState } from "react";
import StaffShiftCustom from "./StaffShiftCustom";
import CustomNotification from "./CustomNotification";
const StaffShiftList = ({ staff, filterOption }) => {
  const [staffShifts, setStaffShifts] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifType, setNotifType] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/staff-shift-event-source-list/" + staff.staffId
    );

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        if (newData) {
          setStaffShifts(newData.shifts);
        }
      } catch (error) {
        console.log("None JSON data", event.data);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);
  let filterStaffShifts;
  const currentDate = new Date(new Date().toDateString());
  if (filterOption === "all") {
    filterStaffShifts = staffShifts;
  } else if (filterOption === "today") {
    filterStaffShifts = staffShifts.filter(
      (shift) =>
        new Date(shift.date).toDateString() === currentDate.toDateString()
    );
  } else if (filterOption === "upcoming") {
    filterStaffShifts = staffShifts.filter(
      (shift) => new Date(new Date(shift.date).toDateString()) > currentDate
    );
  } else {
    filterStaffShifts = staffShifts.filter(
      (shift) => new Date(new Date(shift.date).toDateString()) < currentDate
    );
  }
  const statePriority = {
    "Not Checked": 1,
    "Checked In": 2,
    "Checked Out": 3,
  };
  filterStaffShifts = filterStaffShifts
    .slice()
    .sort((t1, t2) => statePriority[t1.state] - statePriority[t2.state]);
  return (
    <>
      <CustomNotification
        type={notifType}
        message={notifMessage}
        title={notifTitle}
        showNotification={showNotif}
        setShowNotification={setShowNotif}
      />
      <div className="task-viewing">
        {filterStaffShifts.map((shift) => (
          <StaffShiftCustom
            shift={shift}
            setNotifTitle={setNotifTitle}
            setNotifMessage={setNotifMessage}
            setNotifType={setNotifType}
            setShowNotification={setShowNotif}
          />
        ))}
      </div>
    </>
  );
};

export default StaffShiftList;
