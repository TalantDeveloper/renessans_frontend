import React from "react";
import CountUp from "react-countup";
import classes from "./Statistics.module.css";

const statisticsData = [
  { label: "Talabalar", value: 2500 },
  { label: "Fakultetlar", value: 6 },
  { label: "Kurslar", value: 120 },
  { label: "Professorlar", value: 150 },
];

const Statistics = () => {
  return (
    <div className={classes["stats-container"]}>
      <h1 className={classes["stats-title"]}>Statistika</h1>
      <div className={classes["stats-grid"]}>
        {statisticsData.map((stat, index) => (
          <div key={index} className={classes["stat-card"]}>
            <h2 className={classes["stat-value"]}>
              <CountUp end={stat.value} duration={2.5} />
            </h2>
            <p className={classes["stat-label"]}>{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
