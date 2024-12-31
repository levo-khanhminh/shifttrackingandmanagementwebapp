import React, { useState } from "react";
import ShiftAssignmentForm from "./ShiftAssignmentForm";
import StaffSummaryList from "./StaffSummaryList";
import CustomNotification from "./CustomNotification";
const ShiftAssignment = ({ shifts, staffs }) => {
  const [assignStaff, setAssignStaff] = useState(null);
  const [showNotif, setShowNotif] = useState(false);
  const [notifType, setNotifType] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  return (
    <>
      <CustomNotification
        type={notifType}
        message={notifMessage}
        title={notifTitle}
        showNotification={showNotif}
        setShowNotification={setShowNotif}
      />
      <div className="assign-task-container">
        <StaffSummaryList
          shifts={shifts}
          staffs={staffs}
          setAssignStaff={setAssignStaff}
        />
        <div className="assign-task-block">
          <p className="assign-task-block-header">Shift Assignment</p>
          <div className="assign-task-block-body">
            <ShiftAssignmentForm
              type="post"
              setNotifTitle={setNotifTitle}
              setNotifMessage={setNotifMessage}
              setNotifType={setNotifType}
              setShowNotification={setShowNotif}
              staff={assignStaff}
            >
              <div className="button-assign-task">
                <button>Create Shift</button>
                <button>Cancle</button>
              </div>
            </ShiftAssignmentForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShiftAssignment;
