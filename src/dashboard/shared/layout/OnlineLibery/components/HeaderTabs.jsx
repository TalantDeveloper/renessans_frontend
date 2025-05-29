import React from "react";
import classes from "./HeaderTabs.module.css";

const HeaderTabs = ({ buttonColor, setButtonColor }) => {
  return (
    <div className={classes["headerTabs"]}>
      <div className={classes["tabs"]}>
        <button
          onClick={() => {
            setButtonColor(0);
          }}
          style={
            buttonColor !== 0
              ? { borderColor: "#8A8A8A" }
              : {
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                }
          }
          className={classes["headerBtn"]}
        >
          Ilmiy maqolalar
        </button>
        <button
          style={
            buttonColor !== 1
              ? { borderColor: "#8A8A8A" }
              : {
                  borderColor: "var(--primary-color)",
                  color: "var(--primary-color)",
                }
          }
          onClick={() => {
            setButtonColor(1);
          }}
          className={classes["headerBtn"]}
        >
          Badiiy adabiyotlar
        </button>
      </div>
    </div>
  );
};

export default HeaderTabs;
