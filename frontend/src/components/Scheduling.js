import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import ShiftAssignment from "./ShiftAssignment";
import ShiftDisplay from "./ShiftDisplay";
import ShiftTracking from "./ShiftTracking";
import DateTime from "./DateTime";

const Scheduling = ({ staffs }) => {
  const [tabOption, setTabOption] = useState("assign");
  const [shifts, setShifts] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:3000/shift-event-source-list"
    );

    eventSource.onmessage = (event) => {
      try {
        const newData = JSON.parse(event.data);
        if (newData) {
          setShifts(newData.shifts);
        }
      } catch (error) {
        console.log("None JSON data", event.data);
      }
    };

    return () => {
      eventSource.close();
    };
  }, []);
  return (
    <div className="scheduling">
      <h3 className="scheduling-header">Dashboard/Scheduling</h3>
      <div className="scheduling-container">
        <div className="scheduling-container-top">
          <div className="box-header">
            <img src="staffs-icon.png" alt="staffs icon" />
            <div className="box-main">
              <h3>Number of staffs</h3>
              <span className="box-number">{staffs.length}</span>
            </div>
          </div>
          <div className="box-header">
            <img src="project-status.png" alt="staffs icon" />
            <div className="box-main">
              <h4>Total Shift number</h4>
              <span className="box-number">{shifts.length}</span>
            </div>
          </div>
          <DateTime></DateTime>
        </div>
        <div className="scheduling-containter-bottom">
          <div className="scheduling-container-bottom-header">
            <button
              className={`tab-button ${
                tabOption === "assign" ? "style-scheduling-tab" : ""
              }`}
              onClick={() => setTabOption("assign")}
            >
              Assign Shift
            </button>
            <button
              className={`tab-button ${
                tabOption === "view" ? "style-scheduling-tab" : ""
              }`}
              onClick={() => setTabOption("view")}
            >
              View Shift
            </button>
            <button
              className={`tab-button ${
                tabOption === "tracking" ? "style-scheduling-tab" : ""
              }`}
              onClick={() => setTabOption("tracking")}
            >
              Tracking
            </button>
          </div>
          <div className="scheduling-container-bottom-body">
            {tabOption === "assign" && (
              <ShiftAssignment shifts={shifts} staffs={staffs} />
            )}
            {tabOption === "view" && (
              <ShiftDisplay shifts={shifts} staffs={staffs} />
            )}
            {tabOption === "tracking" && <ShiftTracking shifts={shifts} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
