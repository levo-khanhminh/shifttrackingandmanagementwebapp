import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faSort } from "@fortawesome/free-solid-svg-icons";
function StaffBlock({ staff }) {
  return (
    <div className="staff-block">
      <p className="staff-fullname">{staff?.fullname}</p>
      <p className="staff-phone">{staff?.phoneNumber}</p>
      <p className="staff-email">{staff?.email}</p>
      <p className="staff-address">{staff?.address}</p>
      <p className="staff-joining-date">{staff?.joiningDate}</p>
      <p className={staff?.status === "active" ? "active" : "inactive"}>
        {staff?.status === "active" ? "Active" : "Inactive"}
      </p>
    </div>
  );
}
const StaffList = ({ staffs }) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("option");
  let staffList;
  console.log(staffs[0].joiningDate.split(",").join(""));
  if (sort === "option") staffList = staffs;
  if (sort === "status")
    staffList = staffs
      .slice()
      .sort(
        (s1, s2) =>
          Number(s2.status === "active") - Number(s1.status === "active")
      );

  if (sort === "fullname")
    staffList = staffs
      .slice()
      .sort((s1, s2) => s1.fullname.localeCompare(s2.fullname));
  if (sort === "date") {
    staffList = staffs.slice().sort((s1, s2) => {
      const cleanDate = (dateStr) =>
        dateStr.replace(/(\d+)(st|nd|rd|th)/, "$1").trim();
      const d1 = cleanDate(s1.joiningDate);
      const d2 = cleanDate(s2.joiningDate);
      return new Date(d1) - new Date(d2);
    });
  }
  return (
    <div>
      <h3 className="staff-list-header">Dashboard/Staff List</h3>
      <div className="staff-list-container">
        <div className="staff-list-tool">
          <div className="sort-staff">
            <FontAwesomeIcon icon={faSort} className="sort-icon" />
            <span>Sort</span>
            <select
              className="sort-option"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="fullname">Fullname</option>
              <option value="status">Status</option>
              <option value="option">option</option>
              <option value="date">Date</option>
            </select>
          </div>
          <form action="#" className="search-form">
            <input
              type="text"
              className="search-staff-field"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-btn" />
          </form>
        </div>
        <div className="staff-display">
          <div className="staff-display-header">
            <p>Name</p>
            <p>Phone Number</p>
            <p>Emaill</p>
            <p>Address</p>
            <p>Joining Date</p>
            <p>Status</p>
          </div>
        </div>
        {staffList
          ?.filter((staff) =>
            search === ""
              ? staff
              : staff.fullname.toLowerCase().includes(search.toLowerCase()) ||
                staff.address.toLowerCase().includes(search.toLowerCase()) ||
                staff.email.toLowerCase().includes(search.toLowerCase())
          )
          .map((staff) => (
            <StaffBlock staff={staff} key={staff._id} />
          ))}
      </div>
    </div>
  );
};

export default StaffList;
