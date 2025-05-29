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
          Universitetning ilmiy ishlanmalar bazasi
        </h1>
        <p className={classes["descr"]}>
          Bu yerda siz o'zingizga kerakli ilmiy maqolani yoki jurnalni
          topishingiz mumkin.
        </p>
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
              Ilmiy jurnallar
            </h1>
            <div className={classes["flex"]}>
              {publishdata.map((value, index) => {
                return (
                  <PublishCard
                    key={value.id_p}
                    index={index}
                    img={value.img_p}
                    title={value.title_p}
                    type={value.type_p}
                    usage={value.usage_p}
                    pdfLink={value.pdfLink_p}
                  />
                );
              })}
            </div>
            <h1
              style={{
                textAlign: "center",
                fontSize: "40px",
                marginBottom: "30px",
                marginTop: "50px",
              }}
            >
              Ilmiy maqolalar
            </h1>
            <div className={classes["flex"]}>
              {publishdata.map((value, index) => {
                return (
                  <PublishCard
                    key={value.id_p}
                    index={index}
                    img={value.img_p}
                    title={value.title_p}
                    type={value.type_p}
                    usage={value.usage_p}
                    pdfLink={value.pdfLink_p}
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
