import React, { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { NewsCard } from "../card/Card";
import "moment/locale/uz-latn";
import classes from "./Right-bar.module.css";
import { BaseURL } from "../BaseData";


export const RightBar = ({
  selectedCategory,
  searchTerm,
  setCategoriesWithCounts,
}) => {
  const { t, i18n } = useTranslation();
  const [pageApi, setPageApi] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const viewedItems = useRef(new Set());

  const fetchData = () => {
    setLoading(true);
    axios
      .get(BaseURL + "api/news/")
      .then((response) => {
        const sortedData = response.data.sort(
          (a, b) => new Date(b.posted_time) - new Date(a.posted_time)
        );
        setData(sortedData);
        calculateCategoryCounts(sortedData);
      })
      .catch((error) => console.error("Error fetching data:", error))
      .finally(() => setLoading(false));
  };

  const calculateCategoryCounts = (data) => {
    const counts = data.reduce((acc, item) => {
      const category = item.category[`name_${i18n.language}`];
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    setCategoriesWithCounts(counts);
  };

  useEffect(() => {
    fetchData();
  }, [i18n.language]);

  const handleViewCount = (id) => {
    if (viewedItems.current.has(id)) return;
    viewedItems.current.add(id);
    axios
      .patch(`${BaseURL}api/news/${id}/increment_views`)
      .catch((error) => console.error("Error incrementing views:", error));
  };

  const itemsPerPage = 2;
  const indexOfLastItem = pageApi * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = data
    .filter((item) => {
      const isCategoryMatch =
        !selectedCategory ||
        item.category[`name_${i18n.language}`] === selectedCategory;
      const isSearchMatch =
        !searchTerm ||
        item[`title_${i18n.language}`]
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      return isCategoryMatch && isSearchMatch;
    })
    .slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className={classes["box1"]}>
      {loading ? (
        <div className={classes["center_div"]}>
          <CircularProgress size={"50px"} />
        </div>
      ) : (
        <>
          {currentItems.map((value) => (
            <NewsCard
              key={value.id}
              id={value.id}
              img={value.image}
              name={value.category[`name_${i18n.language}`]}
              date={moment(value.posted_time)
                .locale(i18n.language)
                .format("DD-MMMM, HH:mm")}
              comments={value.assessment}
              views={value.view_count}
              title={value[`title_${i18n.language}`] || value.title_uz}
              descr={value[`full_news_${i18n.language}`] || value.full_news_uz}
              link={`news/${value.id}`}
              onView={() => handleViewCount(value.id)}
            />
          ))}
          <div className={classes["center_div"]}>
            <Pagination
              onChange={(e, value) => setPageApi(value)}
              count={Math.ceil(data.length / itemsPerPage)}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </>
      )}
    </div>
  );
};
