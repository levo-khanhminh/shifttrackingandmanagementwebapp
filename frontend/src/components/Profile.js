import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDetaill from "./ProfileDetaill";
const Profile = ({ user, infor }) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className="profile-container">
      <h3 className="title">Dashboard/Profile</h3>
      <div className="profile">
        <div className="card-profile">
          <Card bg="light">
            <p className="card-header">Profile Image</p>
            <Card.Img
              variant="top"
              src={
                user.role === "STAFF" ? `random-icon-3.png` : "managericon.webp"
              }
            />
            <Card.Body>
              <Card.Title>
                {user?.role === "STAFF" ? "Staff" : "Manager"}
              </Card.Title>
              <Card.Text>
                {user?.role === "STAFF"
                  ? `A dedicated and detail-oriented staff member`
                  : `As an experienced manager with a passion for leadership and team
                development, I excel in guiding projects from concept to
                completion.`}
              </Card.Text>
            </Card.Body>
          </Card>
          <button className="btn-edit" onClick={() => setIsEdit(!isEdit)}>
            Edit Profile
          </button>
        </div>
        <ProfileDetaill
          user={user}
          infor={infor}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      </div>
    </div>
  );
};

export default Profile;
