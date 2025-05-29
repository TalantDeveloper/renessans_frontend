import React from "react";

import classes from "./Map.module.css";

export const Map = () => {
  return (
    <div className={classes["wrapper"]}>
      <iframe
        className={classes["map"]}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1546.5786043269593!2d69.21753182137812!3d41.30405367041031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8bbe518958a3%3A0xabea1d7e79ecbc68!2sRenessans%20universitet!5e0!3m2!1suz!2s!4v1729504241279!5m2!1suz!2s"
        width="100%"
        height="500"
        style={{ border: "none" }}
        allowfullscreen=""
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
