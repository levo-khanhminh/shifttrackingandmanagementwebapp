import React, { useState } from "react";
import StaffShiftList from "./StaffShiftList";
const ViewSchedule = ({ staff }) => {
  const [selection, setSelection] = useState("all");
  return (
    <div className="view-schedule-container">
      <div className="view-schedule-container-header">
        <h4>Dashboard / View Schedule</h4>
      </div>
      <div className="view-schedule-container-body">
        <div className="view-schedule-container-first">
          <h3>Shifts</h3>
          <select
            className="select-staff-task"
            value={selection}
            onChange={(e) => setSelection(e.target.value)}
          >
            <option value="today">Today</option>
            <option value="all">All Shifts</option>
            <option value="expired">Expired</option>
            <option value="upcoming">Upcoming</option>
          </select>
          <StaffShiftList
            staff={staff}
            filterOption={selection}
            setFilterOption={setSelection}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;
