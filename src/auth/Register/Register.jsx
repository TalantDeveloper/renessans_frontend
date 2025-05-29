import React, { useState } from "react";
import { Link } from "react-router-dom";

import Head from "../../shared/layout/head/Head";

import classes from "./Register.module.css";

import eye from "../../shared/assets/images/icons/eye.svg";

const Register = () => {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [passwordReset, setPasswordReset] = useState("");
  const [reset, setReset] = useState("password");

  const resetPassword = () => {
    if (reset === "password") {
      setReset("test");
    } else {
      setReset("password");
    }
  };

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <>
      <Head title="Register" />
      <div className={classes["logIn"]}>
        <div className={classes["container"]}>
          <div className={classes["logInSection"]}>
            <div className={classes["leftSection"]}>
              <form>
                <h3>Ro‘yxatdan o‘tish</h3>
                <div className={classes["inputSection"]}>
                  <input placeholder="Ismingiz" className={classes["input"]} />
                  <input
                    placeholder="Familiyangiz"
                    className={classes["input"]}
                  />
                  <input
                    placeholder="Telefoningiz"
                    className={classes["input"]}
                  />
                  <div className={classes["inputEye"]}>
                    <input
                      placeholder="Parolingiz"
                      className={classes["input"]}
                      type={type}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                    />
                    <div onClick={handleToggle}>
                      <img
                        src={eye}
                        alt="eye"
                        width={24}
                        height={24}
                        className={classes["eye"]}
                      />
                    </div>
                  </div>
                  <div className={classes["inputEye"]}>
                    <input
                      placeholder="Parolingizni takrorlang"
                      className={classes["input"]}
                      type={reset}
                      name="reset"
                      value={passwordReset}
                      onChange={(j) => setPasswordReset(j.target.value)}
                      autoComplete="current-password"
                    />
                    <div onClick={resetPassword}>
                      <img
                        src={eye}
                        alt="eye"
                        width={24}
                        height={24}
                        className={classes["eye"]}
                      />
                    </div>
                  </div>
                  <div className={classes["forgotPass"]}>
                    <div className={classes["checkBox"]}>
                      <input type="checkbox" />
                      <label className={classes["passParag"]}>
                        Meni eslab qoling
                      </label>
                    </div>
                    <button className={classes["forgotButton"]}>
                      Parolni unutdingizmi?
                    </button>
                  </div>
                </div>
                <button className={classes["send"]}>Ro‘yxatdan o’tish</button>
                <div className={classes["forRegister"]}>
                  <p className={classes["newUser"]}>
                    Allaqachon ro‘yxatdan o’tganmisiz?
                  </p>
                  <Link to="/auth-login">
                    <button className={classes["registerButton"]}>
                      Kirish
                    </button>
                  </Link>
                </div>
              </form>
            </div>
            <div className={classes["rightSection"]}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
