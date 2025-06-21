import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./categoryActivities.module.css";
// import classerror from "../../../Error404Page.module.css";
// import Error404Animation from "../../../Error404.json";
import { testUrl } from "../BaseData";

const CategoryActivities = () => {
    const navigate = useNavigate();
    const { dep_name, short_name } = useParams();
    console.log(short_name);
    const {t, i18n } = useTranslation();
    const [categoryActivity, setCategoryActivity] = useState(null);
    const [category, setCategory] = useState(null);
    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [backendSidebarData, setBackendSidebarData] = useState([]);
    console.log(error);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchCategoryActivityData = axios.get(
            testUrl + `/api/activities/${dep_name}/${short_name}`
        );

        const fetchBackendSidebarData = axios.get(
            testUrl + "/api/activitiescategory" // Replace with your actual endpoint
        );
        

        Promise.all([fetchCategoryActivityData, fetchBackendSidebarData])
            .then(([activityResponse, sidebarResponse]) => {
                const activity = activityResponse.data;
                if (activity) {
                    console.log(activity);
                    setCategoryActivity(activity);
                    setCategory(activity?.category || null);
                    setDepartment(activity?.department || null);
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
                
                // Set backend sidebar data
                if (sidebarResponse.data) {
                    setBackendSidebarData(sidebarResponse.data);
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
        
    }, [dep_name, short_name, i18n.language]);
    


    const getDepartmentName = (item) => {
        const title = item[`name_${i18n.language}`];
        return title || item.name_uz || t("no_name_available");
    };


    if (loading) return <p>Yuklanmoqda...</p>;
    // if (error) return (
    //     <div className={classerror["error-page"]}>
    //         <LottieView className={classerror["animation"]}
    //         animationData={Error404Animation}
    //         loop={true}
    //         />
    //         <p className={classerror["title"]}>
    //             {t("sorry")}
    //         </p>
    //         <p className={classerror["description"]}>
    //             {t("back_main")}
    //         </p>
    //         <div onClick={() => navigate("/")} className={classerror["button"]}>
    //             {t("main_menu")}
    //         </div>
    //     </div>
    // )  


    return (
        
        <div className={classes.mainContainer}>
            <div data-aos="fade-up" className={classes["rahbariyat-container"]}>
            
                <h1 className={classes["page-title"]}>
                    {category?.[`name_${i18n.language}`]} 
                </h1>
                <div dangerouslySetInnerHTML={{
                    __html: categoryActivity?.[`content_${i18n.language}`],
                }}/>
                
            </div>

            <div className={classes["sidebar-wrapper"]}>
            
                <div className={classes.sidebar}>
                    
                    <h3 className={classes["sidebar-title"]}>
                        {department?.[`name_${i18n.language}`]}
                    </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {/* Department Directions */}
                        {categoryActivity?.directions && categoryActivity.directions.length > 0 ? (
                            categoryActivity.directions.map((direct, index) => (
                                <li
                                    onClick={() => navigate(`/directions/${direct.short_name}`)}
                                    key={direct.id}
                                    style={{marginBottom: '10px'}}
                                    className={direct.short_name === short_name ? classes.active : ''}
                                >
                                    <span style={{marginRight: '8px', color: '#133654', fontWeight: 'bold'}}>{index + 1}.</span>
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(direct)}
                                    </span>
                                </li>
                            ))
                        ) : null}
                        
                        {/* Backend Sidebar Data */}
                        {backendSidebarData.length > 0 ? (
                            backendSidebarData.map((item, index) => (
                                <li
                                    onClick={() => navigate(`/activities/${dep_name}/${item.short_name}`)}
                                    key={item.id}
                                    style={{marginBottom: '10px'}}
                                    className={item.short_name === short_name ? classes.active : ''}
                                >
                                    <span
                                        style={{cursor: 'pointer', color: '#133654'}}
                                    >
                                        {getDepartmentName(item)}
                                    </span>
                                </li>
                            ))
                        ) : null}
                        
                        {/* Show message if no data available */}
                        {(!categoryActivity?.directions || categoryActivity.directions.length === 0) && 
                         backendSidebarData.length === 0 && (
                            <li>{t("no direction data")}</li>
                        )}
                    </ul>
                </div>
            </div>
            
        </div>

        
    );
};

export default CategoryActivities;
