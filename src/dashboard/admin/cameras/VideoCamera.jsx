import React from "react";
import classes from "./Cameras.module.css";
import { useParams, useNavigate } from "react-router-dom";

const VideoCamer = () => {
  const { schoolId, gradeId, classId } = useParams();
  const { cameraId } = useParams();
  const navigate = useNavigate();

  const videoURL = `/admin/cameras/school/${schoolId}/grades/${gradeId}/class/${classId}`;

  return (
    <div>
      <h3 className={classes["videoFor"]}>
        Video for {schoolId ? `${schoolId} school` : ""} - {cameraId || ""}
      </h3>
      <div
        style={{
          width: "300px",
          height: "200px",
          backgroundColor: "#ddd",
          margin: "10px auto",
          borderBottomLeftRadius: "20px",
          borderTopLeftRadius: "30px",
          boxShadow: "rgba(32, 21, 92, 0.15) 0px 48px 100px 0px",
        }}
        className={classes["videoPlaceholder"]}
      ></div>
    </div>
  );
};

export default VideoCamer;
