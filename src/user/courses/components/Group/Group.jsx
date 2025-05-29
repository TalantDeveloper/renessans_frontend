import React from 'react';
import { Icon } from '@iconify/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from 'react-i18next';
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';

import { groupMemberData } from '../../utils/groupMemberData';
import Avatar from '../../assets/avatar.png';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/keyboard';
import 'swiper/css/navigation';

import classes from './Group.module.css';

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

const Group = () => {
  const { t } = useTranslation();

  return (
    <div id='team' className={classes.group}>
      <div className={classes.container}>
        <div className={classes.groupTitle}>
          <h1>
            {t('Bizning professional')}
            <span className='span_blue'>{t(' jamoa')}</span>
          </h1>
          <p>
            {t(
              `Har bir online darslik asoschilari bilan tanishib oling va ularning professional darsliklarini ko'rib o'z bilmlaringizni yanada orttiring!`
            )}
          </p>
          <a href='#more-info'>
            <button>{t('More about  →')}</button>
          </a>
        </div>
        <div data-aos='fade-up' className={classes['avatars']}>
          <Swiper
            {...teamSlider}
            centeredSlides={true}
            slidesPerView={3}
            spaceBetween={30}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            keyboard={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            modules={[Pagination, Autoplay, Navigation, Keyboard]}
            className='mySwipper'
          >
            {groupMemberData.map((value) => {
              return (
                <SwiperSlide>
                  <div
                    className={`${classes.avatarCard} ${classes.mobileAvatarCard}`}
                  >
                    <img src={Avatar} alt='' />
                    <h4>
                      {t(`${value.name}`)} {t(`${value.surename}`)}
                    </h4>
                    <p>
                      {t(`${value.school}`)} {t(`${value.class}`)}
                    </p>
                    <div className={classes.hoveredImg}>
                      <div className={classes['social-medias']}>
                        <a target='_blank' href={value.link.instagram}>
                          <div className={classes['social-media-wrapper']}>
                            <Icon
                              className={classes['social-media']}
                              icon='mdi:instagram'
                            />
                          </div>
                        </a>
                        <a target='_blank' href={value.link.telegram}>
                          <div className={classes['social-media-wrapper']}>
                            <Icon
                              className={classes['social-media']}
                              icon='ic:baseline-telegram'
                            />
                          </div>
                        </a>
                        <a target='_blank' href={value.link.github}>
                          <div className={classes['social-media-wrapper']}>
                            <Icon
                              className={classes['social-media']}
                              icon='mdi:github'
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Group;
