import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {useTranslation} from "react-i18next";
import {FaLink} from "react-icons/fa"; // Importing Link icon
import {BaseURL, testUrl} from "../BaseData";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import {Navigation, Pagination, Keyboard, Autoplay} from "swiper/modules";

import classes from "./Partnership.module.css";

const teamSlider = {
    spaceBetween: 20,
    navigation: true,
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        576: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3,
        },
    },
};

export const Partnership = () => {
    const {t} = useTranslation();
    const [partners, setPartners] = useState([]);

    // Fetch partner data from the API
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await fetch(
                    testUrl + "/api/partners/"
                );
                const data = await response.json();
                setPartners(data);
            } catch (error) {
                console.error("Error fetching partner data:", error);
            }
        };
        fetchPartners();
    }, []);

    return (
        <div id="partner" className={classes["wrapper"]}>
            <h1 className={classes["title"]}>
                {t(`partnerTitle`)}{" "}
                <span className="span_blue">{t(`partnerTitleSpan`)}</span>{" "}
            </h1>
            <Swiper
                data-aos="fade-up"
                {...teamSlider}
                loop={true}
                slidesPerView={4}
                spaceBetween={10}
                keyboard={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination, Navigation, Keyboard, Autoplay]}
                className={classes["mySwiper"]}
            >
                {partners.map((partner) => {
                    return (
                        <SwiperSlide key={partner.id} className={classes["box"]}>
                            <div className={classes["card"]}>
                                <div className={classes["img-wrapper"]}>
                                    <img
                                        className={classes["img"]}
                                        src={partner.image}
                                        alt={partner.name}
                                    />
                                </div>
                                <div className={classes["content"]}>
                                    <h3 className={classes["name"]}>{partner.name}</h3>
                                    <a
                                        href={partner.link_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={classes["link"]}>
                                        <FaLink className={classes["link-icon"]}/>
                                        {partner.link_name}
                                    </a>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};
