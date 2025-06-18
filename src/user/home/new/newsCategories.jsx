import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./News.module.css";
import styles from "./newsClasses.module.css";
import { testUrl } from "../BaseData";
import {Link} from "react-router-dom";
import search from "../../news/assets/icons/search.svg";
import SocialMedias from "../../../shared/components/socialMedias/SocialMedias";
import "moment/locale/uz-latn";
import moment from "moment";

const NewsCategories = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {t, i18n } = useTranslation();
    const [news_data, setNews] = useState(null);
    const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchNewsData = axios.get(
            testUrl + "/api/categories/" + id
        );

        const fetchCategoriesData = axios.get(
            testUrl + "/api/categories"
        );
        
        
        Promise.all([fetchNewsData, fetchCategoriesData])
            .then(([newsResponse, categoriesResponse]) => {
                const news = newsResponse.data;
                const categoris =categoriesResponse.data;
                
                if (news && categoris) {
                    setNews(news?.news || []);
                    setCategories(categoris || []);
                    console.log(news);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
                
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
        
    }, [id, i18n.language]);
    
    

    if (loading) return <p>Yuklanmoqda...</p>;
    
    return (
        
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["newsSection"]}>
            
                <h1 className={classes["page-title"]}>
                </h1>
                
                    <div className={styles.facultyList}>
                        {news_data.length > 0 ? (
                            news_data.map((new_data) => (
                                <Link
                                    key={new_data.id}
                                    to={`/news/${new_data.id}`}
                                    className={styles.facultyCard}
                                >
                                    <img
                                        src={testUrl + new_data?.image || "/default-image.jpg"}
                                        alt=" "
                                        className={styles.facultyImage}
                                    />
                                    <div className={styles.facultyInfo}>
                                        <h3>
                                            {new_data?.title_uz}
                                            </h3>
                                    </div>
                                    <div className={styles.newsMetadata}>
                                        <span>
                                        {moment(new_data.posted_time)
                                            .locale(i18n.language)
                                            .format("DD-MMMM, HH:mm")}
                                        </span>
                                        <span>{new_data.view_count} views</span>
                                    </div>
                                    <div className={styles.viewMore}>
                                        <span>
                                            {t("see_more")}
                                        </span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div>{t("no_kafedra_found")}</div>
                        )}
                    </div>
                </div>
                <div className={classes.sidebar} style={{marginLeft: 0, marginRight: "40px"}}>
                <h3>
                    {t("categories")}
                </h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <li
                                onClick={() => navigate(`/newscategories/` + category?.id)}
                                key={category.id}
                                style={{marginBottom: '10px'}}
                                >
                                <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                <span
                                    style={{cursor: 'pointer', color: '#133654'}}
                                >
                                    {category[`name_${i18n.language}`]}
                                </span>
                            </li>
                        ))
                    ) : (
                        <li>{t("no_departments_found")}</li>
                    )}
                </ul>
            </div>
        </div>

    );
};

export default NewsCategories;
