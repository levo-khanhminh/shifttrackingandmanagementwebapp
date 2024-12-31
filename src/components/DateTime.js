import React from "react";
import { useState, useEffect } from "react";
const DateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    setInterval(() => setCurrentDate(new Date()), 1000);
  }, []);
  return (
    <div className="scheduling-time">
      <div className="scheduling-time-header">
        <h4>Date</h4>
        <p>{currentDate.toDateString()}</p>
        <h4>Time</h4>
        <p>{currentDate.toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default DateTime;
