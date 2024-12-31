import { useState } from "react";
import Shift from "./Shift";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import CustomNotification from "./CustomNotification";
const ShiftDisplay = ({ shifts, staffs }) => {
  const [filterOption, setFilterOption] = useState("default");
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [notifType, setNotifType] = useState("");
  const [notifTitle, setNotifTitle] = useState("");
  const [notifMessage, setNotifMessage] = useState("");
  let filterShifts;
  const currentDate = new Date(new Date().toDateString());
  if (filterOption === "default") {
    filterShifts = shifts;
  } else if (filterOption === "today") {
    filterShifts = shifts.filter(
      (shift) =>
        new Date(shift.date).toDateString() === currentDate.toDateString()
    );
  } else if (filterOption === "upcoming") {
    filterShifts = shifts.filter(
      (shift) => new Date(new Date(shift.date).toDateString()) > currentDate
    );
  } else {
    filterShifts = shifts.filter(
      (shift) => new Date(new Date(shift.date).toDateString()) < currentDate
    );
  }
  return (
    <div className="task-container">
      <CustomNotification
        type={notifType}
        message={notifMessage}
        title={notifTitle}
        showNotification={showNotif}
        setShowNotification={setShowNotif}
      />
      <div className="task-header">
        <FontAwesomeIcon icon={faFilter} className="filter-icon" />
        <p>Filter</p>
        <select
          className="task-select"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="today">Today</option>
          <option value="upcoming">Upcoming</option>
          <option value="expired">Expired</option>
          <option value="default">option</option>
        </select>
        <div className="task-search-bar">
          <input
            type="text"
            className="task-search-field"
            placeholder="search ..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
        </div>
      </div>
      <div className="task-block">
        {filterShifts
          ?.filter((shift) =>
            search === ""
              ? filterShifts
              : shift.shiftId.toLowerCase().startsWith(search.toLowerCase()) ||
                new Date(shift.date).getDate() === Number(search)
          )
          .map((shift) => (
            <Shift
              shift={shift}
              setNotifTitle={setNotifTitle}
              setNotifMessage={setNotifMessage}
              setNotifType={setNotifType}
              setShowNotif={setShowNotif}
              staff={staffs.find((staff) => staff.staffId === shift.staffId)}
            />
          ))}
      </div>
    </div>
  );
};

export default ShiftDisplay;
