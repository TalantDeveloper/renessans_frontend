import React from "react";

import SocialMedias from "../../../../shared/components/socialMedias/SocialMedias";

import classes from "./TeamCarousel.module.css";

const TeamCarousel = ({ team }) => {
  return (
    <div className={classes["team-card"]}>
      <div className={classes["image-wrapper"]}>
        <img className={classes["image"]} src={team.img} alt="" />
      </div>
      <div className={classes["team-info"]}>
        <div className={classes["team-fullname"]}>
          {team.name} {team.surename}
        </div>
        <div className={classes["team-fullname"]}>
          {team.school} {team.class}
        </div>
        <p className={classes["team-motivation"]}>{team.motivational}</p>
        <SocialMedias
          team={true}
          instagramUrl={team.link.instagram}
          telegramUrl={team.link.telegram}
          githubUrl={team.link.github}
        />
      </div>
    </div>
  );
};

export default TeamCarousel;
