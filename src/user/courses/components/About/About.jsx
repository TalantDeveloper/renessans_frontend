import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Sound from '../../assets/sound.png';

import classes from './About.module.css';

const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classes['about']}>
        <div className={classes['container']}>
          <div className={classes['aboutTitle']}>
            <h1>
            {t('aboutTitle')}
              <span className='span_blue'>{t('aboutTitleSpan')}</span>
              {t('aboutTitleSecond')}
            </h1>
            <p>
              {t(
                `aboutDescr`
              )}
            </p>
            <Link to={'/about'}>
            <button>{t('aboutBtn')}</button>
            </Link>
          </div>
        </div>
        <div className={classes['aboutSound']}>
          <img src={Sound} alt='sound' />
        </div>
      </div>
    </div>
  );
};

export default About;
