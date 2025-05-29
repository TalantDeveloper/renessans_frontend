import React, { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

import BookCard from "./component/bookCard/BookCard";
import SearchBar from "./component/searchBar/SearchBar";
import { bookData, publishdata } from "./utils/bookData"; // Import publishdata
import { useTranslation } from "react-i18next";

import classes from "./LibraryPage.module.css";
import PublishCard from "./component/publishCard/PublishCard";

export const LibraryPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [bookDataFetcher, setBookDataFetcher] = useState(bookData);

  const handleSearch = () => {
    const filtered = bookData.filter((value) =>
      value.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
    );
    setBookDataFetcher(filtered);
    setIsLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [bookDataFetcher]);

  const { t } = useTranslation();
  return (
    <section className={classes["wrapper"]}>
      <div className={classes["container"]}>
        <h1 className={classes["header"]}>
          <span className="span_blue">{t("titleLibruary")}</span>
          {t("titleLibruarySpan")}
          !!!
        </h1>
        <p className={classes["descr"]}>{t(`libruaryDescr`)}</p>
        <SearchBar setSearchText={setSearchText} handleSearch={handleSearch} />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <h1
              style={{
                textAlign: "center",
                fontSize: "40px",
                marginBottom: "30px",
              }}
            >
              Kerakli kitoblar
            </h1>
            <div className={classes["flex"]}>
              {bookDataFetcher.map((value, index) => {
                return (
                  <BookCard
                    key={value.id}
                    index={index}
                    img={value.img}
                    title={value.title}
                    type={value.type}
                    usage={value.usage}
                    pdfLink={value.pdfLink}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default LibraryPage;
