import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
const CustomNotification = ({
  message = "Notification Message",
  title = "Notification Title",
  showNotification,
  setShowNotification,
  messageIcon,
  type,
}) => {
  return (
    <div>
      <Modal
        className="modal notification"
        show={showNotification}
        onHide={() => setShowNotification(false)}
        animation
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="modal-title-label">
              <p>{title} </p>
              {type === "Infor" ? (
                <FontAwesomeIcon icon={faBell} className="notification-icons" />
              ) : (
                <FontAwesomeIcon
                  className="notification-icons"
                  icon={faCircleExclamation}
                />
              )}
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="notification-content">
            {message} <span>{messageIcon}</span>
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CustomNotification;
