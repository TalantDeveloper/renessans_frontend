import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Head from "../../shared/layout/head/Head";

import classes from "./LogIn.module.css";

import eye from "../../shared/assets/images/icons/eye.svg";
import hide from "../../shared/assets/images/icons/eye-hide.svg";

const LogIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setType(type === "password" ? "text" : "password");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios
      .post("https://sayt.renessans-edu.uz/users/login/", {
        email,
        password,
      })
      .then((response) => {
        const { tokens } = response.data;
        localStorage.setItem("authToken", tokens.access);
        localStorage.setItem("refreshToken", tokens.refresh);

        navigate("/admin/news");
      })
      .catch((err) => {
        setError("Kirishda xatolik yuz berdi.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <Head title="Login" />
      <div className={classes["logIn"]}>
        <div className={classes["container"]}>
          <div className={classes["logInSection"]}>
            <div className={classes["leftSection"]}>
              <form onSubmit={handleLogin}>
                <h3>Tizimga kirish</h3>
                {error && <p className={classes["error"]}>{error}</p>}
                <div className={classes["inputSection"]}>
                  <input
                    placeholder="Elektron pochtangiz"
                    className={classes["input"]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                      required
                    />
                    <div onClick={handleToggle}>
                      {type === "password" ? (
                        <img
                          src={eye}
                          alt="eye"
                          width={24}
                          height={24}
                          className={classes["eye"]}
                        />
                      ) : (
                        <img
                          src={hide}
                          alt="eye"
                          width={24}
                          height={24}
                          className={classes["eye"]}
                        />
                      )}
                    </div>
                  </div>
                  <div className={classes["forgotPass"]}>
                    <div className={classes["checkBox"]}>
                      <input type="checkbox" />
                      <p className={classes["passParag"]}>Meni eslab qoling</p>
                    </div>
                    <button type="button" className={classes["forgotButton"]}>
                      Parolni unutdingizmi?
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className={classes["send"]}
                  disabled={loading}
                >
                  {loading ? "Kirish..." : "Kirish"}
                </button>
                <div className={classes["forRegister"]}>
                  <p className={classes["newUser"]}>
                    Yangi foydalanuvchimisiz?
                  </p>
                  <Link to="/auth-register">
                    <button type="button" className={classes["registerButton"]}>
                      Ro‘yxatdan o‘tish
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

export default LogIn;
