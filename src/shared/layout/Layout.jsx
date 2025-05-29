import React from "react";

import Navbar from "./navbar/Navbar";
import Pages from "../routes/Pages";
import Footer from "./footer/Footer";

import classes from "./Layout.module.css";
import Top from "../components/top/Top";

const Layout = () => {
  return (
    <div className={classes["container"]}>
      <Navbar />
      <Pages />
      <Footer />
      <Top />
    </div>
  );
};

export default Layout;
