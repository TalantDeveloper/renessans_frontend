import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { RightBar } from "./components/right-bar/Right-bar";
import { LeftBar } from "./components/left-bar/LeftBar";
import Head from "../../../shared/layout/head/Head";
import classes from "./News.module.css";

export const NewsPage2 = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriesWithCounts, setCategoriesWithCounts] = useState({});

  return (
    <div className={classes["wrapper"]}>
      <Head title={"News"} />
      <div className={classes["container"]}>
        <h1 className={classes["title"]}>
          {t("newsPart")}
          </h1>
        <p className={classes["text"]}>
          {t("newsPartDescr")}
          </p>
        <div className={classes["main_section"]}>
          <RightBar
            selectedCategory={selectedCategory}
            searchTerm={searchTerm}
            setCategoriesWithCounts={setCategoriesWithCounts}
          />
          <LeftBar
            setSelectedCategory={setSelectedCategory}
            setSearchTerm={setSearchTerm}
            categoriesWithCounts={categoriesWithCounts}
          />
        </div>
      </div>
    </div>
  );
};
