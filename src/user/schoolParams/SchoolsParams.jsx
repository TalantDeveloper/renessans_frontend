import React, { useEffect, useState } from "react";
import classes from "./SchoolsParams.module.css";
import { useParams } from "react-router-dom";
import { schoolsData } from "../home/schools/utils/schoolsData";

export const SchoolParams = () => {
  const { schoolId } = useParams();
  const [oneData, setOneData] = useState([]);

  useEffect(() => {
    const filtered = schoolsData.filter(
      (value) => value.id === parseInt(schoolId.replace(":", ""))
    );
    setOneData(filtered[0]);
  }, [schoolId]);

  return (
    <div className={classes["schoolAbout"]}>
      <div className={classes["container"]}>
        <div className={classes["about"]}>
          <div className={classes["schoolLeft"]}>
            <img src={oneData.images} alt="schoolImg" />
          </div>
          <div className={classes["schoolRight"]}>
            <h1>{oneData.title}</h1>
            <h4>
              <i>{oneData.director}</i>
            </h4>
            <p>{oneData.lorem}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolParams;
