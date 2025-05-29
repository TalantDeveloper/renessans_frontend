import React, { useState } from "react";
import classes from "./OnlineLibery.module.css";
import { LIBERY_OBJ, SCIENCES_OBJ } from ".";
import { useNavigate } from "react-router-dom";
import HeaderTabs from "./components/HeaderTabs";

const OnlineLibery = () => {
  const navigate = useNavigate();
  const [buttonColor, setButtonColor] = useState(0);

  return (
    <div className={classes["container"]}>
      <HeaderTabs buttonColor={buttonColor} setButtonColor={setButtonColor} />
      {buttonColor === 0 ? (
        <>
          <h1 className={classes["schoolTitle"]}>Ilmiy maqolalar</h1>
          <div
            style={{
              display: "flex",
              flexFlow: "wrap",
            }}
            className={classes["categoriesContainer"]}
          >
            {LIBERY_OBJ.map((e, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexFlow: "wrap",
                  }}
                  className={classes["category"]}
                  id={e.id}
                  key={index}
                  onClick={() => navigate(`/admin/library/:${e.id}`)}
                >
                  <h4>{e.class}</h4>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <>
          <h1 className={classes["schoolTitle"]}>Badiiy adabiyotlar</h1>
          <div
            style={{
              display: "flex",
              flexFlow: "wrap",
            }}
            className={classes["categoriesContainer"]}
          >
            {SCIENCES_OBJ.map((e, index) => {
              return (
                <div
                  className={classes["category"]}
                  id={e.id}
                  key={index}
                  onClick={() => navigate(`/admin/library/:${e.sciences}`)}
                >
                  <h4>{e.sciences}</h4>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default OnlineLibery;
