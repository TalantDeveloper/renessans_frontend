import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

import {useTranslation} from "react-i18next";
import "slick-carousel/slick/slick.css"; // Slick carousel styles
import "slick-carousel/slick/slick-theme.css"; // Slick carousel theme styles
import classes from "./Batafsil.module.css";
import classerror from "../../../shared/pages/Error404Page.module.css";
import Error404Animation from "../../../shared/assets/animated-placeholders/Error404.json";
import {useNavigate} from "react-router-dom";
import LottieView from "lottie-react";
import { testUrl} from "../BaseData";
import styles from "./newsClasses.module.css";
import moment from "moment";
import { InlineIcon } from "@iconify/react/dist/iconify.js";

const NewsDetails = () => {
    const { new_id } = useParams();
    const navigate = useNavigate();
    const {t, i18n} = useTranslation(); // Access i18n instance
    const [new_data, setNew] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openDropdown, setOpenDropdown] = useState({});
    console.log(categories);


    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchNew = axios.get(
            testUrl + "/api/news/" + new_id
        );
        const fetchCategoriesData = axios.get(
            testUrl + "/api/categories"
        );

        Promise.all([fetchNew, fetchCategoriesData])
            .then(([newResponse, categoriesResponse]) => {
                const responseData = newResponse.data;
                const responceCategories = categoriesResponse.data;
                if (responseData && responceCategories) {
                    setNew(responseData);
                    setCategories(responceCategories);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [new_id  , i18n.language]);

   

    // Get the first staff member
    const toggleDropdown = (id, type) => {
        setOpenDropdown((prev) => ({
            ...prev,
            [id]: {
                activities: type === "activities" ? !prev[id]?.activities : false,
                responsibilities:
                    type === "responsibilities" ? !prev[id]?.responsibilities : false,
            },
        }));
    };
 
    const getNewName = (new_data) => {
        const title = new_data[`name_${i18n.language}`];
        return title || new_data.name_uz || t("no_name_available");
    };

    if (loading) return <p>Yuklanmoqda...</p>;
    if (error) return (
        <div className={classerror["error-page"]}>
            <LottieView className={classerror["animation"]}
            animationData={Error404Animation}
            loop={true}
            />
            <p className={classerror["title"]}>
                {t("sorry")}
            </p>
            <p className={classerror["description"]}>
                {t("back_main")}
            </p>
            <div onClick={() => navigate("/")} className={classerror["button"]}>
                {t("main_menu")}
            </div>
        </div>
    )  

    return (
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>

                <h1 className={classes["page-title"]}>
                    {new_data[`title_${i18n.language}`]}
                </h1>
                <img src={testUrl + new_data?.image} alt="" />
                <div className={styles.newsMeta}>
                    <span className={styles.newsDate} style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <InlineIcon icon="mdi:view-grid" width="16" height="16" color="blue"/>
                        {new_data.category?.[`name_${i18n.language}`] || new_data.category?.name_uz || ''}
                    </span>
                    <span className={styles.newsDate}>
                        {moment(new_data.posted_time)
                            .locale(i18n.language)
                            .format("DD-MMMM, HH:mm")}
                    </span>
                    <span className={styles.newsViews} style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                        <InlineIcon icon="mdi:eye" width="18" height="18" color="#495057"/>
                        {new_data.view_count} views
                    </span>
                </div>
                <div dangerouslySetInnerHTML={{
                    __html: new_data[`full_news_${i18n.language}`],
                }}/>
            </div>
            <div className={classes.sidebar} style={{marginLeft: 0, marginRight: "40px"}}>
                <h3>
                    {t("categories")}
                </h3>
                <ul style={{listStyle: 'none', padding: 0}}>
                    {categories.length > 0 ? (
                        categories.map((category, index) => (
                            <li
                                onClick={() => navigate(`/newscategories/${category.id}`)}
                                key={category.id}
                                style={{marginBottom: '10px'}}
                                className={category.id === new_data.category.id ? classes.active : ''}
                            >
                                <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                <span
                                    style={{cursor: 'pointer', color: '#133654'}}
                                >
                                    {getNewName(category)}
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

export default NewsDetails;