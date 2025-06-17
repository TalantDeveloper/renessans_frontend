import React, { useEffect, useState, useRef } from "react";
import Pagination from "@mui/material/Pagination";
import CircularProgress from "@mui/material/CircularProgress";
import { NewsCard } from "../card/Card";
import axios from "axios";
import moment from "moment";
import "moment/locale/uz-latn";
import classes from "./Right-bar.module.css";
import { BaseURL } from "../../../BaseData";
export const RightBar = ({
  selectedCategory,
  searchTerm,
  setCategoriesWithCounts,
}) => {
  const [pageApi, setPageApi] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const viewedItems = useRef(new Set());

  const fetchData = () => {
    setLoading(true);
    axios
      .get(BaseURL + "api/news/")
      .then((response) => {
        setData(response.data);
        calculateCategoryCounts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const calculateCategoryCounts = (data) => {
    const counts = data.reduce((acc, item) => {
      const category = item.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});
    setCategoriesWithCounts(counts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleViewCount = (id) => {
    if (viewedItems.current.has(id)) return;
    viewedItems.current.add(id);

    axios
      .patch(BaseURL + `api/news/${id}/increment_views`)
      .catch((error) => {
        console.error("Error incrementing views:", error);
      });
  };

  const itemsPerPage = 2;
  const indexOfLastItem = pageApi * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter((item) => {
      const isCategoryMatch =
        !selectedCategory || item.category === selectedCategory;
      const isSearchMatch =
        searchTerm === "" ||
        item.title_uz.toLowerCase().includes(searchTerm.toLowerCase());
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
              name={value.category}
              date={moment(value.posted_time)
                .locale("uz-latn")
                .format("DD-MMMM, HH:mm")}
              comments={value.assessment}
              views={value.view_count}
              title={value.title_uz}
              descr={value.full_news_uz}
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
