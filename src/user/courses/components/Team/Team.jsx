import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Mousewheel,
  Autoplay,
  Keyboard,
} from "swiper/modules";

import TeamCarousel from "../TeamCarousel/TeamCarousel";

import { groupMemberData } from "../../utils/groupMemberData";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import classes from "./Team.module.css";

const Team = () => {
  const { t } = useTranslation();

  return (
    <div className={classes["team-wrapper"]}>
      <h1 className={classes["team-title"]}>
        {t("professionalTeam")}
        <span className="span_blue">{t("professionalTeamno2")}</span>
      </h1>
      <Swiper
        cssMode={true}
        navigation={true}
        pagination={true}
        mousewheel={true}
        keyboard={true}
        loop
        autoplay={{
          delay: 5000,
        }}
        modules={[Navigation, Pagination, Mousewheel, Autoplay, Keyboard]}
        className={classes["mySwiper"]}
      >
        {groupMemberData.map((team) => {
          return (
            <SwiperSlide key={team.id} className={classes["box"]}>
              <TeamCarousel team={team} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default Team;
