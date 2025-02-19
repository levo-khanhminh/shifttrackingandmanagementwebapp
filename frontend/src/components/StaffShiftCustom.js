import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const StaffShiftCustom = ({
  shift,
  setShowNotification,
  setNotifType,
  setNotifMessage,
  setNotifTitle,
}) => {
  const [isShow, setIsShow] = useState(false);
  const taskDate = new Date(new Date(shift.date).toDateString());
  const currentDate = new Date(new Date().toDateString());
  const compare = currentDate > taskDate ? -1 : currentDate < taskDate ? 1 : 0;
  const fithteenMinutes = 15 * 60 * 1000;
  const fiveMinutes = 5 * 60 * 1000;
  function hanldeCheckIn() {
    const startTime = getDateAndTime(shift.date, shift.startTime);
    const before = startTime.getTime() - fithteenMinutes;
    const after = startTime.getTime() + fithteenMinutes;
    const currentTime = new Date().getTime();
    console.log(before, after, currentTime);
    if (currentTime >= before && currentTime <= after) {
      console.log("Valid checked In time");
      handleUpdateTaskState("check-in");
      setShowNotification(true);
      setNotifTitle("Notification ");
      setNotifType("Infor");
      setNotifMessage("Successfully check in shift !");
    } else {
      console.log("Invalid Checked In Time");
      setShowNotification(true);
      setNotifTitle("Alert Error ");
      setNotifType("Alert ");
      setNotifMessage("Unsuccessfully check in shift !");
    }
  }
  function hanldeCheckOut() {
    const endTime = getDateAndTime(shift.date, shift.endTime);
    const before = endTime.getTime() - fiveMinutes;
    const currentTime = new Date().getTime();
    console.log(before, currentTime);
    if (currentTime > before && shift.state === "checked-in") {
      console.log("Valid checked Out time");
      handleUpdateTaskState("check-out");
      setShowNotification(true);
      setNotifTitle("Notification ");
      setNotifType("Infor");
      setNotifMessage("Successfully check out shift !");
    } else {
      console.log("Invalid Checked Out Time");
      setShowNotification(true);
      setNotifTitle("Alert Error ");
      setNotifType("Alert ");
      setNotifMessage("Unsuccessfully check out shift !");
    }
  }
  async function handleUpdateTaskState(checkType) {
    const newState = checkType === "check-in" ? "checked-in" : "checked-out";
    try {
      const res = await axios.put("http://localhost:3000/shift/update", {
        ...shift,
        state: newState,
      });
    } catch (error) {
      console.log(error);
    }
  }
  function getDateAndTime(date, time) {
    const sDate = new Date(date);
    const year = sDate.getFullYear();
    const month = sDate.getMonth();
    const day = sDate.getDate();
    const [hours, minutes] = time.split(":").map(Number);
    return new Date(year, month, day, hours, minutes);
  }
  return (
    <>
      <Modal show={isShow} onHide={() => setIsShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Shift Checking Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>shift ID : {shift.shiftId}</h3>
          <h5>{new Date(shift.date).toDateString()}</h5>
          <p>
            * You are only allowed to check in before and after 15 minutes of
            start time
          </p>
          <p>* Not allow to check out before 5 minutes of end time</p>
        </Modal.Body>
        <Modal.Footer className="check-box">
          <div className="check-btns">
            {shift.state === "unchecked" && (
              <button onClick={hanldeCheckIn}>Check In</button>
            )}
            {shift.state === "checked-in" && (
              <button onClick={hanldeCheckOut}>Check out</button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
      <div className="staff-task-box" onClick={() => setIsShow(true)}>
        <div
          className="staff-task-title"
          style={{
            backgroundColor: `${
              compare === -1 ? "#ff90a6" : compare === 1 ? "#a2e6ff" : "#f6efa7"
            }`,
          }}
        >
          <h5>{new Date(shift.date).toDateString()}</h5>
          <FontAwesomeIcon icon={faEllipsis} className="three-dot-icon" />
        </div>
        <div className="staff-task-content">
          <div
            className="task-state"
            style={{
              color: `${
                shift.state === "unchecked"
                  ? "#FF6F61"
                  : shift.state === "checked-in"
                  ? "#45B8AC"
                  : "#0072B5"
              }`,
            }}
          >
            {shift.state === "unchecked" ? (
              <FontAwesomeIcon icon={faSquare} className="square-icons" />
            ) : shift.state === "checked-in" ? (
              <FontAwesomeIcon icon={faSquareCheck} className="square-icons" />
            ) : (
              <FontAwesomeIcon icon={faSquareXmark} className="square-icons" />
            )}

            <p className="staff-task-state">
              {shift.state === "unchecked"
                ? "Unchecked"
                : shift.state === "checked-in"
                ? "Checked-In"
                : "Checked-Out"}
            </p>
          </div>
          <p className="staff-task-desc">{shift.shiftDescription}</p>
        </div>
        <div className="staff-task-footer">
          <div className="staff-location">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="location-dot-icon"
            />
            <p>{shift.location}</p>
          </div>
          <div className="staff-time">
            <FontAwesomeIcon icon={faClock} className="clock-staff-icon" />
            <p>
              {shift.startTime} - {shift.endTime}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaffShiftCustom;
