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
        placeholder="Kitob nomini kiriting"
      />
      <select className={classes["search-select"]} value={"Filter"}>
        <option value="Barcha Sinflar">{t("allClass")}</option>
        <option value="Darsliklar">Darsliklar</option>
        <option value="Ilmiy maqolalar">Ilmiy maqolalar</option>
        <option value="Jahon adabiyot">Jahon adabiyoti</option>
        <option value="O'zbek adabiyoti">O'zbek adabiyoti</option>
      </select>
      <button onClick={() => handleSearch()} className={classes["search-btn"]}>
        <p>{t("searchOfBar")}</p>
      </button>
    </div>
  );
};

export default SearchBar;
