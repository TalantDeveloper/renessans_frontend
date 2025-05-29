import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./CustomCalendar.css";

const CustomCalendar = ({ selectedDate, onDateChange }) => {
  return (
    <div className="custom-calendar-container">
      <Calendar value={selectedDate} onChange={onDateChange} locale="uz-UZ" />
    </div>
  );
};

export default CustomCalendar;
