import React from "react";
import {
    FaUniversity,
    FaRegCalendarAlt,
    FaFlask,
    FaBasketballBall,
    FaHandsHelping,
    FaArrowRight,
} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import styles from "./AboutUni.module.css";
import image1 from "./2023-12-06-11-42-11_de5c1964d5cbd031111ff75f26d40c20.jpeg";
import image2 from "./2023-12-06-12-08-12_86c004eb08997bbeaaded0bae3b85222.jpeg";
import image3 from "./2023-12-12-11-55-10_01f330709a3bed71e61dedfa3db0af1b.jpeg";
import image4 from "./2024-05-27-08-41-42_7069139b96e46e3ff1e9c280560ab3e8.jpeg";

const TalabaHayoti = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.allContainer}>
            <div className={styles.container}>
                {/* Talaba Hayoti Bo'limi */}
                <div className={`${styles.section} ${styles.circleSection}`}>
                    <div className={styles.imageWrapper}>
                        <img src={image1} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            <FaUniversity/> Talaba Hayoti
                        </h2>
                        <p className={styles.description}>
                            Universitetda tahsil olayotgan talabalar ijtimoiy va madaniy
                            tadbirlarda qatnashish imkoniyatiga ega bo'lishadi. Kampusda
                            yashash talabalarga yangi do'stlar orttirish va qiziqarli hayot
                            tarzini yaratish imkonini beradi. Talabalar turar joyi zamonaviy
                            qulayliklar bilan jihozlangan bo'lib, dam olish va o'qishga mos
                            sharoit yaratadi.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={image4} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                </div>

                {/* Qiziqarli Tadbirlar Bo'limi */}
                <div className={`${styles.section} ${styles.diamondSection}`}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image2}
                            alt="Universitet Tadbirlar"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            <FaRegCalendarAlt/> Qiziqarli Tadbirlar
                        </h2>
                        <p className={styles.description}>
                            Universitet yil davomida qiziqarli tadbirlarni o'tkazadi. Ilmiy
                            seminarlar, madaniy kechalar, va sport festivallari har bir talaba
                            uchun quvonchli voqealardan biridir. Bu tadbirlar orqali talabalar
                            bir-birlarini yaqindan tanib, bilimlarini kengaytiradilar.
                        </p>
                        <p className={styles.description}>
                            Har yili an'anaviy festival va o'zbek milliy bayramlari keng
                            nishonlanadi, bu esa talabalarni o'z madaniyatlariga
                            yaqinlashtiradi.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={image4} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                </div>

                {/* Ilmiy Tadqiqotlar Bo'limi */}
                <div className={`${styles.section} ${styles.hexagonSection}`}>
                    <div className={styles.imageWrapper}>
                        <img src={image3}
                            alt="Ilmiy Tadqiqotlar"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            <FaFlask/> Ilmiy Tadqiqotlar
                        </h2>
                        <p className={styles.description}>
                            Universitetda ilmiy tadqiqotlar uchun keng imkoniyatlar mavjud.
                            Ilmiy guruhlarda talabalar tajriba almashadilar va mustaqil
                            loyihalar ustida ishlaydilar. O'qituvchilar bilan birgalikda ilmiy
                            maqolalar tayyorlash, xalqaro anjumanlarda ishtirok etish kabi
                            imkoniyatlar mavjud.
                        </p>
                        <p className={styles.description}>
                            Talabalar laboratoriya jihozlari bilan ishlashni o'rgatadi.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={image1} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                </div>

                {/* Sport Faoliyatlari Bo'limi */}
                <div className={`${styles.section} ${styles.triangleSection}`}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image1}
                            alt="Sport Faoliyatlari"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            <FaBasketballBall/> Sport Faoliyatlari
                        </h2>
                        <p className={styles.description}>
                            Universitet sport uchun keng imkoniyatlarga ega. Talabalar suzish,
                            basketbol, futbol kabi sport turlari bilan shug'ullanishlari
                            mumkin. Sport zallar va maydonlar talabalar uchun har kuni ochiq
                            bo'lib, ularga sport orqali salomatlikni mustahkamlash imkonini
                            beradi.
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={image4} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                </div>

                {/* Ijtimoiy Loyihalar Bo'limi */}
                <div className={`${styles.section} ${styles.waveSection}`}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={image2}
                            alt="Ijtimoiy Loyihalar"
                            className={styles.image}
                        />
                    </div>
                    <div className={styles.contentWrapper}>
                        <h2 className={styles.title}>
                            <FaHandsHelping/> Ijtimoiy Loyihalar
                        </h2>
                        <p className={styles.description}>
                            Universitet talabalariga ijtimoiy loyihalarda qatnashish va
                            jamiyatga hissa qo'shish imkoniyatlarini taqdim etadi. Ko'ngilli
                            loyihalarda qatnashish, mahalliy hamjamiyatlar bilan ishlash,
                            ekologik tadbirlarda qatnashish orqali talabalar ijtimoiy
                            mas'uliyatlarini yanada kengaytiradilar.
                        </p>
                        <p className={styles.description}>
                            Ushbu loyihalar orqali talabalar jamiyat bilan yaqin aloqada
                            bo'lib turadi
                        </p>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={image4} alt="Talaba Hayoti" className={styles.image}/>
                    </div>
                </div>
            </div>

            <div className={styles.sidebar}>
                <h3>Universitet</h3>
                <ul>
                    <li className={styles.active} onClick={() => navigate("/about-uni")}>
                        <FaArrowRight className={styles.sidebarIcon}/>
                        Talabalar hayoti
                    </li>
                    <li onClick={() => navigate("/our-campions")}>Bizning chempionlar</li>
                    <li onClick={() => navigate("/good-st")}>Universitet a'lochilari</li>
                    <li onClick={() => navigate("/university-union")}>
                        University Union
                    </li>
                    <li onClick={() => navigate("/scholarship")}>
                        Bizning stipendiantlar
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default TalabaHayoti;
