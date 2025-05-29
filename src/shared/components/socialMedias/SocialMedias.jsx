import React from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

import classes from "./SocialMedias.module.css";

const SocialMedias = ({
  team = false,
  instagramUrl = "https://www.instagram.com/renessans.edu./uz/",
  telegramUrl = "https://t.me/renessansedu_uz",
  githubUrl,
}) => {
  const navigate = useNavigate();
  return (
    <div className={classes["social-medias"]}>
      {team ? (
        <>
          <a
            href={instagramUrl}
            target="https://www.instagram.com/renessans.edu./uz/"
            className={classes["social-media-wrapper"]}
          >
            <Icon className={classes["social-media"]} icon="mdi:instagram" />
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            className={classes["social-media-wrapper"]}
          >
            <Icon
              className={classes["social-media"]}
              icon="ic:baseline-telegram"
            />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            className={classes["social-media-wrapper"]}
          >
            <Icon
              className={classes["social-media"]}
              icon="mingcute:github-fill"
            />
          </a>
        </>
      ) : (
        <>
          <div className={classes["social-media-wrapper"]}>
            <a
              href="https://www.instagram.com/renessans.edu./uz/"
              target="blank"
            >
              <Icon className={classes["social-media"]} icon="mdi:instagram" />
            </a>
          </div>

          <div className={classes["social-media-wrapper"]}>
            <a
              href="https://www.facebook.com/profile.php?id=100089585822057"
              target="blank"
            >
              <Icon
                className={classes["social-media"]}
                icon="ri:facebook-fill"
              />
            </a>
          </div>

          <div className={classes["social-media-wrapper"]}>
            <a href="https://t.me/renessansedu_uz" target="blank">
              <Icon
                className={classes["social-media"]}
                icon="ic:baseline-telegram"
              />
            </a>
          </div>

          <div className={classes["social-media-wrapper"]}>
            <a href="https://www.youtube.com/" target="blank">
              {" "}
              <Icon className={classes["social-media"]} icon="mdi:youtube" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default SocialMedias;
