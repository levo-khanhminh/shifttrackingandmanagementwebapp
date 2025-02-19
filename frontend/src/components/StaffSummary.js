const StaffSummary = ({ shifts, staff, setAssignTaskStaff }) => {
  const staffShifts = shifts?.filter(
    (shift) => shift.staffId === staff.staffId
  );
  return (
    <div
      onClick={() => {
        setAssignTaskStaff(staff);
      }}
      className="summary"
    >
      <img src={`random-icon-${6}.png`} alt="" className="summary-image" />
      <div className="summary-container">
        <p className="staff-name">{staff.fullname}</p>
        <p className="staff-id"> ID:{staff.staffId}</p>
        <p>
          Status:<span className="staff-status">{staff.status}</span>
        </p>
        <p>
          Shift Number :{" "}
          <span className="task-number">{staffShifts.length}</span>
        </p>
      </div>
    </div>
  );
};

export default StaffSummary;
