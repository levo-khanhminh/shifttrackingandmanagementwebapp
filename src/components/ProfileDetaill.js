import React from "react";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
const ProfileDetaill = ({ isEdit, user, infor, setIsEdit }) => {
  return (
    <div className="infor">
      <p className="header">
        {isEdit ? "Profile Detail Edit" : "Profile Details"}
      </p>
      <div className="username-grid">
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
          type="text"
          id="username"
          className="username"
          aria-describedby="usernameHelpBlock"
          disabled
          style={{ width: "500px" }}
          value={user?.username}
        />
      </div>
      <div>
        <Form.Label htmlFor="fullname">Fullname</Form.Label>
        <Form.Control
          type="text"
          id="fullname"
          aria-describedby="fullnameHelpBlock"
          disabled={!isEdit}
          value={infor?.fullname}
        />
      </div>
      <div>
        <Form.Label htmlFor="email">Email</Form.Label>
        <Form.Control
          type="email"
          id="email"
          aria-describedby="emailHelpBlock"
          disabled={!isEdit}
          value={infor?.email}
        />
      </div>
      <div>
        {" "}
        <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
        <Form.Control
          type="text"
          id="phoneNumber"
          aria-describedby="phoneNumberHelpBlock"
          disabled={!isEdit}
          value={infor?.phoneNumber}
        />
      </div>
      <div>
        <Form.Label htmlFor="adrress">Address</Form.Label>
        <Form.Control
          type="text"
          id="address"
          aria-describedby="addressHelpBlock"
          disabled={!isEdit}
          value={infor?.address}
        />
      </div>
      {isEdit ? (
        <div>
          <button className="btn-save">Save changes</button>
          <button className="btn-cancle" onClick={() => setIsEdit(!isEdit)}>
            Cancel
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileDetaill;
