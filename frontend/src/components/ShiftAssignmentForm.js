import React from "react";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const CustomInput = ({ onClick, value }) => {
  return (
    <div className="custom-input" onClick={onClick}>
      <div className="date-form-group">
        <Form.Label>Date</Form.Label>
        <Form.Control
          type="text"
          value={value}
          readOnly
          className="date-input-field"
        />
      </div>
      <span>
        <FontAwesomeIcon icon={faCalendar} className="calendar-icon" />
      </span>
    </div>
  );
};
const ShiftAssignmentForm = ({
  className = "",
  setShowNotification,
  setNotifType,
  setNotifMessage,
  setNotifTitle,
  staff,
  type,
  shift,
  isDisabled = true,
  children,
}) => {
  const [shiftDate, setShiftDate] = useState(!shift ? new Date() : shift.date);
  const [shiftDescription, setShiftDescription] = useState(
    !shift ? "" : shift.shiftDescription
  );
  const [shiftLocation, setShiftLocation] = useState(
    !shift ? "" : shift.location
  );
  const [startTime, setStartTime] = useState(!shift ? "" : shift.startTime);
  const [endTime, setEndTime] = useState(!shift ? "" : shift.endTime);
  const [note, setNote] = useState(!shift ? "" : shift.note);
  function clearData() {
    setShiftDate("");
    setShiftDescription("");
    setStartTime("");
    setEndTime("");
    setShiftLocation("");
    setNote("");
  }
  async function handleSubmitCreate(e) {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/Shift", {
        staffId: staff.staffId,
        shiftDescription: shiftDescription,
        date: shiftDate,
        location: shiftLocation,
        startTime: startTime,
        endTime: endTime,
        note: note,
      });
      setShowNotification(true);
      setNotifTitle("Notification ");
      setNotifType("Infor");
      setNotifMessage("Successfully assign  shift !");
      clearData();
    } catch (error) {
      setShowNotification(true);
      setNotifTitle("Alert Error ");
      setNotifType("Alert");
      setNotifMessage("Unsuccessfully assign shift!");
      console.log(error);
    }
  }
  async function handleSubmitEdit(e) {
    e.preventDefault();
    try {
      const res = await axios.put("http://localhost:3000/Shift/update", {
        staffId: staff.staffId,
        _id: shift._id,
        shiftId: shift.shiftId,
        shiftDescription: shiftDescription,
        date: shiftDate,
        location: shiftLocation,
        startTime: startTime,
        endTime: endTime,
        note: note,
      });
      setShowNotification(true);
      setNotifTitle("Notification ");
      setNotifType("Infor");
      setNotifMessage("Successfully edit shift !");
    } catch (error) {
      setShowNotification(true);
      setNotifTitle("Alert Error ");
      setNotifType("Alert");
      setNotifMessage("Unsuccessfully edit shift !");
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={type === "post" ? handleSubmitCreate : handleSubmitEdit}
      className={`task-assign-form ${className}`}
    >
      <div className="form-staff-name">
        <Form.Label>Staff Name</Form.Label>
        <Form.Control
          type="text"
          className="form-control-name"
          disabled={true}
          value={staff?.fullname}
        />
      </div>
      <div className="form-staff-id">
        <Form.Label>Staff Id</Form.Label>
        <Form.Control
          type="text"
          className="form-control-id"
          value={staff?.staffId}
          disabled={true}
          required
        />
      </div>
      <div className="form-staff-task">
        <Form.Label>Shift Description</Form.Label>
        <Form.Control
          type="text"
          className="form-control-task"
          disabled={!isDisabled}
          value={shiftDescription}
          onChange={(e) => setShiftDescription(e.target.value)}
          required
        />
      </div>
      <div className="form-date">
        <DatePicker
          selected={shiftDate}
          onChange={(date) => setShiftDate(date)}
          customInput={<CustomInput />}
          disabled={!isDisabled}
          required
        />
      </div>
      <div className="form-location">
        <div className="form-location-group">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            className="form-control-location"
            disabled={!isDisabled}
            value={shiftLocation}
            onChange={(e) => setShiftLocation(e.target.value)}
            required
          />
        </div>
        <span>
          {" "}
          <FontAwesomeIcon icon={faLocationDot} className="location-icon" />
        </span>
      </div>
      <div className="form-time">
        <Form.Label>Time</Form.Label>
        <div className="form-time-container">
          <span className="time-labels">From</span>
          <Form.Control
            type="time"
            className="form-control-start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            disabled={!isDisabled}
            required
          />
          <span className="time-labels">To</span>
          <Form.Control
            type="time"
            className="form-control-end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            disabled={!isDisabled}
            required
          />
        </div>
      </div>
      <div className="form-note">
        <Form.Label>Note:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          className="form-control-note"
          disabled={!isDisabled}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          required
        />
      </div>
      {children}
    </form>
  );
};

export default ShiftAssignmentForm;
