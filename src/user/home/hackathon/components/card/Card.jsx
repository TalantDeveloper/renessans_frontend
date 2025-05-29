import React from "react";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

import classes from "./Card.module.css";
import { hackathonTeamCard } from "../../utils/hackathonTeamData";

export default function CardHackathon() {
  const { t } = useTranslation();
  return (
    <>
      <Swiper
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className={classes["mySwiper"]}
      >
        {hackathonTeamCard.map(
          ({
            id,
            logo,
            schoolNumber,
            place,
            teammate1,
            teammate2,
            teammate3,
          }) => {
            return (
              <SwiperSlide key={id}>
                <div className={classes["card"]}>
                  <img className={classes["card_img"]} src={logo} alt="card1" />
                  <div className={classes["flex"]}>
                    <p className={classes["card_title"]}>
                      {schoolNumber}-Maktab
                    </p>
                    <Icon className={classes["icons"]} icon={place} />
                  </div>
                  <h1 className={classes["team_text"]}>{t(`teamText`)}</h1>
                  <p className={classes["card-descr"]}>
                    1. {teammate1} <br />
                    2. {teammate2} <br />
                    3. {teammate3}
                  </p>
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </>
  );
}
