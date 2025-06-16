import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import classes from "./directionDetails.module.css";
// import classerror from "../../../Error404Page.module.css";
// import Error404Animation from "../../../Error404.json";
import { BaseURL, testUrl } from "../BaseData";
console.log(BaseURL);

const DirectionDetails = () => {
    const navigate = useNavigate();
    const { short_name } = useParams();
    console.log(short_name);
    const {t, i18n } = useTranslation();
    const [direction, setDirection] = useState(null);
    const [kafedra, setKafedra] = useState(null);
    // const [boss, setBoss] = useState(null);
    // const [employees, setEmployees] = useState([]);
    const [directions, setDirections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    console.log(error);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchDirectionData = axios.get(
            testUrl + "/api/directions/" + short_name
        );
        

        Promise.all([fetchDirectionData])
            .then(([directionResponse]) => {
                const direction = directionResponse.data;
                if (direction) {
                    console.log(direction);
                    setDirection(direction?.direction || null);
                    setDirections(direction?.directions || []);
                    setKafedra(direction?.kafedra || null);
                    // setFakultet(direction.fakultet?.[0] || null);
                    // setResults(direction.results || []);
                    // setBoss(direction.boss?.[0] || null);
                    // setEmployees(direction.employees || []);
                    // setDirectionsData(direction.directions || []);
                    // setKafedralar(direction.direction || [])
                } else {
                    setError("Ma'lumotlar topilmadi");
                }
            })
            .catch(() => setError("Ma'lumotlarni yuklashda xatolik"))
            .finally(() => setLoading(false));
        
    }, [short_name, i18n.language]);


    const getDepartmentName = (direction) => {
        const title = direction[`name_${i18n.language}`];
        return title || direction.name_uz || t("no_name_available");
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
                    {direction[`name_${i18n.language}`]}
                </h1>
                {/* <img src={fakultet?.image} alt="" /> */}
                <div dangerouslySetInnerHTML={{
                    __html: direction[`content_${i18n.language}`],
                }}/>
                
            </div>

            <div className={classes["sidebar-wrapper"]}>
            
                <div className={classes.sidebar}>
                    
                    <h3 className={classes["sidebar-title"]}>
                        {kafedra[`name_${i18n.language}`]}
                    </h3>
                    <ul style={{listStyle: 'none', padding: 0}}>
                        {directions.length > 0 ? (
                            directions.map((direct, index) => (
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
                        ) : (   
                            <li>{t("no direction data")}</li>
                        )}
                    </ul>
                </div>
            </div>
            
        </div>

        
    );
};

export default DirectionDetails;

