import React, { useState } from "react";
import CustomCalendar from "./util/MyCalendar";
import classes from "./classtable.module.css";

const ClassTable = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const classSchedule = {
    dushanba: ["Matematika 101", "Fizika 201", "Tarix 102"],
    seshanba: ["Biologiya 202", "Kimyo 101", "Falsafa 101"],
    chorshanba: ["Ingliz tili 103", "Iqtisodiyot 101", "Kompyuter fanlari 101"],
    payshanba: ["Matematika 102", "Fizika 202", "San’at tarixi 101"],
    juma: ["Biologiya 203", "Kimyo 102", "Falsafa 102"],
    shanba: ["Musiqa 101", "Jismoniy tarbiya 101", "Psixologiya 101"],
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getWeekdayInfo = (dayIndex) => {
    const days = [
      "Dushanba",
      "Seshanba",
      "Chorshanba",
      "Payshanba",
      "Juma",
      "Shanba",
    ];
    const today = new Date(selectedDate);
    const startOfWeek = today.getDate() - today.getDay() + 1;
    const day = new Date(today.setDate(startOfWeek + dayIndex));
    const formattedDate = day.toLocaleDateString("uz-UZ", {
      day: "2-digit",
      month: "2-digit",
    });

    return { dayName: days[dayIndex], date: formattedDate };
  };

  return (
    <div className={classes["table-container"]}>
      <div className={classes["header"]}>
        <h2>Universitet Dars Jadvali</h2>
      </div>

      <div className={classes["calendar-container"]}>
        <CustomCalendar
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>

      <div className={classes["schedule-wrapper"]}>
        {/* Left Column: Monday to Wednesday */}
        <div className={classes["column"]}>
          <div className={classes["day-header"]}>
            {getWeekdayInfo(0).dayName} ({getWeekdayInfo(0).date})
          </div>
          {classSchedule.dushanba.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}

          <div className={classes["day-header"]}>
            {getWeekdayInfo(1).dayName} ({getWeekdayInfo(1).date})
          </div>
          {classSchedule.seshanba.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}

          <div className={classes["day-header"]}>
            {getWeekdayInfo(2).dayName} ({getWeekdayInfo(2).date})
          </div>
          {classSchedule.chorshanba.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}
        </div>

        {/* Right Column: Thursday to Saturday */}
        <div className={classes["column"]}>
          <div className={classes["day-header"]}>
            {getWeekdayInfo(3).dayName} ({getWeekdayInfo(3).date})
          </div>
          {classSchedule.payshanba.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}

          <div className={classes["day-header"]}>
            {getWeekdayInfo(4).dayName} ({getWeekdayInfo(4).date})
          </div>
          {classSchedule.juma.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}

          <div className={classes["day-header"]}>
            {getWeekdayInfo(5).dayName} ({getWeekdayInfo(5).date})
          </div>
          {classSchedule.shanba.map((subject, index) => (
            <div key={index} className={classes["class-item"]}>
              {subject}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassTable;
