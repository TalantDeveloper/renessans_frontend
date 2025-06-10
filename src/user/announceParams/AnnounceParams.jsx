import React from "react";
import {useParams} from "react-router-dom";
import {announcementsData} from "../../user/home/hackathon/utils/announcements";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";
import classes from "./AnnounceParams.module.css";

const AnnounceParams = () => {
    const {announcementId} = useParams();
    const navigate = useNavigate();
    const announcement = announcementsData.find(
        (ann) => ann.id.toString() === announcementId
    );

    if (!announcement) {
        return <div>Announcement not found!</div>;
    }

    return (
        <div className={classes["container"]}>
            <div className={classes["opener"]}>
                <div className={classes["opener_content"]}>
                    <h1 className={classes["titleMain"]}>{announcement.title}</h1>
                    <p onClick={() => navigate(`/`)}>
                        Asosiy sahifa -
                        <span className={classes["highlight"]}>e'lonlar</span>
                    </p>
                </div>
            </div>

            <div className={classes["announcement_detail"]}>
                <h1 className={classes["title"]}>{announcement.title}</h1>
                <div className={classes["image_wrapper"]}>
                    <img
                        className={classes["announcement_image"]}
                        src={announcement.image}
                        alt="Top Announcement"
                    />
                </div>
                <div className={classes["announcement_contents"]}>
          <span className={classes["posted_time"]}>
            {announcement.postedTime}
          </span>
                    <span className={classes["views"]}>{announcement.views} views</span>
                </div>
                <div className={classes["announcement_content"]}>
                    <p>{announcement.description}</p>
                </div>
            </div>
        </div>
    );
};

export default AnnounceParams;
