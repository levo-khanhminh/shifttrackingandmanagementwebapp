import React from "react";
import StaffSummary from "./StaffSummary";
const StaffSummaryList = ({ shifts, staffs, setAssignStaff }) => {
  return (
    <div className="staff-list-block">
      <p className="staff-list-block-header">Staff Summary List</p>
      {staffs.map((staff) => (
        <StaffSummary
          setAssignTaskStaff={setAssignStaff}
          staff={staff}
          key={staff?._id}
          shifts={shifts}
        />
      ))}
    </div>
  );
};

export default StaffSummaryList;
