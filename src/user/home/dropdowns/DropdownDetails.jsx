import React, {useEffect, useState} from "react";
import {useParams, NavLink} from "react-router-dom";
import DOMPurify from "dompurify";
import axios from "axios";
import styles from "./DetailsPage.module.css";
import {FaSpinner} from "react-icons/fa";
import {MdErrorOutline} from "react-icons/md";
import Slider from "react-slick";
import {useTranslation} from "react-i18next";
import moment from "moment";
import SocialMedias from "../../../shared/components/socialMedias/SocialMedias";
import {BaseURL, testUrl} from "../BaseData";

const DetailsPage = () => {
    const {t, i18n} = useTranslation(); // Use the translation hook
    const {slug} = useParams();
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [dropdowns, setDropdowns] = useState([]);


    useEffect(() => {
        setError(null);
        setLoading(true);
        const fetchDropdown = axios.get(
            testUrl + "/api/dropdowns/" + slug
        );
        const fetchDropdownsData = axios.get(
            testUrl + "/api/dropdowns/"
        );

        Promise.all([fetchDropdown, fetchDropdownsData])
            .then(([dropdownResponse, dropdownsResponce]) => {
                const responseData = dropdownResponse.data;
                const responseDropdowns = dropdownsResponce.data;
                console.log(responseDropdowns);
                if (responseData && responseDropdowns) {
                    setDetails(responseData);
                    setDropdowns(responseDropdowns);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
    }, [slug  , i18n.language]);

    console.log(dropdowns);

    if (loading) {
        return (
            <div className={styles.center}>
                <FaSpinner className={styles.spinner}/>
                <p>{t("loading")}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.center}>
                <MdErrorOutline className={styles.errorIcon}/>
                <p>{t("error")}</p>
            </div>
        );
    }

    // Retrieve language-specific fields
    const siteTitle = details[`site_title_${i18n.language}`];
    const siteDetails = details[`site_details_${i18n.language}`];

    // const mainNews = news.filter((item) => item.is_main).slice(0, 2);
    // const latestNews = news.filter((item) => !item.is_main).slice(0, 4);

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     autoplay: true,
    //     autoplaySpeed: 3000,
    //     arrows: false,
    //     fade: true,
    // };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentContainer}>
                <h1 className={styles.title}>
                    {siteTitle}
                    </h1>
                <div
                    className={styles.content}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(siteDetails, {
                            ADD_TAGS: ["iframe"],
                            ADD_ATTR: [
                                "allow",
                                "allowfullscreen",
                                "frameborder",
                                "scrolling",
                            ],
                        }),
                    }}
                />
                
            </div>

            <div className={styles.sidebar}>
                <h3 className={styles.sidebarTitle}>
                    {details.menu?.[`name_${i18n.language}`]}
                </h3>
                <ul className={styles.menuList}>
                    {dropdowns.length > 0 ? (
                    dropdowns.map((item) => (
                        <li
                                key={item.id}
                                className={`${styles.menuItem} ${
                                    item.slug === slug ? styles.active : ""
                                }`}
                            >
                                <NavLink
                                    to={`/dropdown/${item.slug}`}
                                    className={styles.menuLink}
                                >
                                    {item[`site_title_${i18n.language}`]}
                                </NavLink>
                            </li>
                        ))
                    ) : (
                        <li>{t("no_departments_found")}</li>
                    )
                    }

                </ul>
                <div className={styles.section}>
                    <h3>{t("socialMedias")}</h3>
                    <SocialMedias/>
                </div>
            </div>
        </div>
    );
};

export default DetailsPage;
