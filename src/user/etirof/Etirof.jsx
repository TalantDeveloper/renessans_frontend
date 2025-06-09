import React, {useEffect} from "react";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {FaEnvelope, FaLinkedin, FaTwitter, FaUserTie} from "react-icons/fa";
import styles from "./Etirof.module.css";
import Expert1 from "./istockphoto-667701302-170667a.jpg";
import Expert2 from "./user-female-icon.webp";
import {useTranslation} from "react-i18next";

const experts = [
    {
        id: 1,
        name: "Michael Thompson",
        occupation: "Sun'iy intellekt tadqiqotchisi",
        image: Expert1,
        full_text:
            "Michael sun’iy intellekt sohasida 15 yildan ortiq tajribaga ega bo‘lib, avtomatlashtirilgan tizimlar va mashinaviy o‘rganish bo‘yicha global yetakchilardan biri hisoblanadi. Uning tadqiqotlari ko‘plab kompaniyalar tomonidan amaliyotga joriy qilingan. U inson va AI o‘rtasidagi samarali integratsiyani rivojlantirishga katta hissa qo‘shgan.",
        email: "michael.thompson@example.com",
        linkedin: "https://www.linkedin.com/in/michaelthompson",
        twitter: "https://twitter.com/michaelthompson",
    },
    {
        id: 2,
        name: "Sophie Laurent",
        occupation: "Innovatsion strateg",
        image: Expert2,
        full_text:
            "Sophie yirik texnologik kompaniyalarga strategik yo‘nalishlarni belgilashda yordam beruvchi yetakchi mutaxassis. U innovatsiyalarni joriy etish va kompaniyalarning global bozor talablariga moslashishida katta rol o‘ynaydi. Uning yetakchiligida bir nechta startaplar muvaffaqiyatli rivojlanib, xalqaro miqyosda tan olingan.",
        email: "sophie.laurent@example.com",
        linkedin: "https://www.linkedin.com/in/sophielaurent",
        twitter: "https://twitter.com/sophielaurent",
    },
    {
        id: 3,
        name: "Hiroshi Tanaka",
        occupation: "Robototexnika muhandisi",
        image: Expert1,
        full_text:
            "Hiroshi robototexnika va avtomatlashtirilgan tizimlar bo‘yicha yetakchi muhandislardan biri hisoblanadi. Uning ishlanmalari sog‘liqni saqlash, ishlab chiqarish va kiberxavfsizlik sohalarida keng qo‘llaniladi. Uning texnologiyalari inson hayotini yengillashtirishga qaratilgan bo‘lib, bir necha mukofotlarga sazovor bo‘lgan.",
        email: "hiroshi.tanaka@example.com",
        linkedin: "https://www.linkedin.com/in/hiroshitanaka",
        twitter: "https://twitter.com/hiroshitanaka",
    },
    {
        id: 4,
        name: "Emma Johansson",
        occupation: "Ekologiya bo‘yicha ekspert",
        image: Expert2,
        full_text:
            "Emma ekologiya va barqaror rivojlanish sohasida yetakchi ekspertlardan biri bo‘lib, u atrof-muhit muhofazasiga bag‘ishlangan ko‘plab xalqaro loyihalarda ishtirok etgan. U yangi texnologiyalar yordamida ekologik inqirozlarni yumshatish bo‘yicha tadqiqotlar olib boradi. Uning tavsiyalari davlat siyosatlarida inobatga olinib kelinadi.",
        email: "emma.johansson@example.com",
        linkedin: "https://www.linkedin.com/in/emmajohansson",
        twitter: "https://twitter.com/emmajohansson",
    },
];

const Etirof = () => {
    const {t} = useTranslation();

    useEffect(() => {
        new Swiper(".swiper-container", {
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
        });
    }, []);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{t("expertOpinionsTitle")}</h1>
            <p className={styles.description}>{t("expertOpinionsDescription")}</p>
            <div className="swiper-container">
                <div className="swiper-wrapper">
                    {experts.map((expert) => (
                        <div key={expert.id} className="swiper-slide">
                            <div className={styles.card}>
                                <div className={styles.quoteIcon}>&#8221;</div>
                                <div className={styles.left}>
                                    <div className={styles.imageContainer}>
                                        <img
                                            src={expert.image}
                                            alt={expert.name}
                                            className={styles.image}
                                        />
                                    </div>
                                    <h3 className={styles.name}>{expert.name}</h3>
                                    <p className={styles.occupation}>
                                        <FaUserTie className={styles.occupationIcon}/>
                                        {expert.occupation}
                                    </p>
                                    <div className={styles.socialIcons}>
                                        <a
                                            href={expert.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaLinkedin className={styles.icon}/>
                                        </a>
                                        <a
                                            href={expert.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaTwitter className={styles.icon}/>
                                        </a>
                                        <a
                                            href={`mailto:${expert.email}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaEnvelope className={styles.icon}/>
                                        </a>
                                    </div>
                                </div>
                                <div className={styles.right}>
                                    <p className={styles.fullText}>{expert.full_text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Etirof;
