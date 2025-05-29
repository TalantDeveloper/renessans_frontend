import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

import { systemApproachData } from '../../utils/systemApproachData';

import classes from './Manner.module.css';
const Manner = () => {
  const { t } = useTranslation();
  const currentLang=localStorage.getItem('i18nextLng')

  return (
    <div id='approach'>
      <div className={classes['manner']}>
        <div className={classes['container']}>
          <div className={classes['mannerTitle']}>
            <h1>
            {t(`mannerTitle`)}
              <span className='span_blue'>{t('mannerTitleSpan')}</span>
              {t('mannerTitleSecond')}
            </h1>
            <p>{t(`mannerDescr`)}</p>
          </div>
          <div className={classes['mannerCards']}>
            {systemApproachData.map((value, index) => (
              <div
                data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                data-aos-duration='2000'
                key={index}
                className={classes['cardSub']}
              >
                <div className={classes['circle']}>
                  <Icon className={classes['icons']} icon={value.icon} />
                </div>
                <h1>{t(`${value[currentLang].name}`)}</h1>
                <p>{t(`${value[currentLang].descr}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manner;
