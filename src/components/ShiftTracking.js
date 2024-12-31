import React from "react";
const ShiftTrackingDetail = ({ shift }) => {
  return (
    <div className="task-tracking-detail">
      <p className="task-id">{shift?.shiftId}</p>
      <p>{shift.staffId}</p>
      <p>B11 EIU</p>
      <p>{shift.state}</p>
    </div>
  );
};
const ShiftTracking = ({ shifts }) => {
  const todayShifts = shifts.filter(
    (shift) => new Date(shift.date).toDateString() === new Date().toDateString()
  );
  const checkIns = todayShifts.filter(
    (shift) => shift.state === "Checked In"
  ).length;
  const checkOuts = todayShifts.filter(
    (shift) => shift.state === "Checked Out"
  ).length;
  return (
    <>
      <div className="tracking">
        <div className="tracking-body">
          <div className="tracking-body-title">
            <p>shift ID</p>
            <p>Staff ID</p>
            <p>Location</p>
            <p>State</p>
          </div>
          {todayShifts.map((shift) => (
            <ShiftTrackingDetail shift={shift} />
          ))}
        </div>
        <div className="tracking-header">
          <img src="statistics-icon.png" alt="staffs icon" />
          <div className="tracking-statistics">
            <h2>Summary Status</h2>
            <div className="tracking-statistics-content">
              <p>Today Staff Number</p>
              <p className="figures">{todayShifts.length}</p>
              <p>Today shift Number</p>
              <p className="figures">{todayShifts.length}</p>
              <p>Checked In</p>
              <p className="figures">{checkIns}</p>
              <p>Checked Out:</p>
              <p className="figures">{checkOuts}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShiftTracking;
