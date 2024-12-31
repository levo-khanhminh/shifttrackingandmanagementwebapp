import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import ShiftAssignmentForm from "./ShiftAssignmentForm";
const ShiftDetailModal = ({
  isView,
  setIsView,
  shift,
  staff,
  setNotifTitle,
  setNotifMessage,
  setNotifType,
  setShowNotification,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <Modal
      show={isView}
      onHide={() => setIsView(false)}
      className="modal-edit"
      size="lg"
      close
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Shift Detail
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ShiftAssignmentForm
          staff={staff}
          type="put"
          shift={shift}
          className="is-edit"
          isDisabled={isEdit}
          setNotifMessage={setNotifMessage}
          setShowNotification={setShowNotification}
          setNotifTitle={setNotifTitle}
          setNotifType={setNotifType}
        >
          <div className="edit-footer">
            {isEdit ? (
              <div className="edit-btns">
                <button>Save </button>
                <button onClick={() => setIsEdit(false)}>Cancel</button>
              </div>
            ) : (
              <button onClick={() => setIsEdit(true)}>Edit Shift</button>
            )}
          </div>
        </ShiftAssignmentForm>
      </Modal.Body>
    </Modal>
  );
};
const Shift = ({
  shift,
  staff,
  setNotifTitle,
  setNotifMessage,
  setNotifType,
  setShowNotif,
}) => {
  const shiftDate = new Date(new Date(shift.date).toDateString());
  const currentDate = new Date(new Date().toDateString());
  const compare =
    currentDate > shiftDate ? -1 : currentDate < shiftDate ? 1 : 0;
  function getformatTaskDate(date) {
    const dates = new Date(date).toDateString().split(" ");
    return dates[1] + " " + dates[2] + " " + dates[3];
  }

  const [isView, setIsView] = useState(false);

  return (
    <>
      <div
        className="task"
        style={{
          backgroundColor: `${
            compare === -1 ? "#ff90a6" : compare === 1 ? "#a2e6ff" : "#f6efa7"
          }`,
        }}
      >
        <h3
          style={{
            color: `${
              compare === -1 ? "#fe1618" : compare === 1 ? "#339dc2" : "#dfbb1d"
            }`,
          }}
        >
          {getformatTaskDate(shift.date)}
        </h3>
        <div className="task-body">
          <hr></hr>
          <p
            style={{
              color: `${
                compare === -1
                  ? "#fe1618"
                  : compare === 1
                  ? "#339dc2"
                  : "#dfbb1d"
              }`,
            }}
            className="task-body-content"
          >
            {shift.shiftId}
          </p>
          <hr></hr>
        </div>
        <button
          className="button-view-detail"
          onClick={() => setIsView(true)}
          style={{
            backgroundColor: `${
              compare === -1
                ? " #ff4c4c"
                : compare === 1
                ? "#339dc2"
                : "#dfbb1d"
            }`,
          }}
        >
          View Detail
        </button>
      </div>
      {isView ? (
        <ShiftDetailModal
          staff={staff}
          shift={shift}
          isView={isView}
          setIsView={setIsView}
          setNotifTitle={setNotifTitle}
          setNotifMessage={setNotifMessage}
          setNotifType={setNotifType}
          setShowNotification={setShowNotif}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Shift;
