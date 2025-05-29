import React from "react";
import { useTranslation } from "react-i18next";
import classes from "./SearchBar.module.css";

export const SearchBar = ({ setSearchText, handleSearch }) => {
  const { t } = useTranslation();
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div data-aos="fade-down" className={classes["search-box"]}>
      <input
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => handleEnter(e)}
        className={classes["search-input"]}
        type="text"
        placeholder="Kerakli maqola, kitob yoki jurnalning nomini kiriting"
      />
      <button onClick={() => handleSearch()} className={classes["search-btn"]}>
        <p>{t("searchOfBar")}</p>
      </button>
    </div>
  );
};

export default SearchBar;
