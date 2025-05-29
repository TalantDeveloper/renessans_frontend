import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';

import Discord from '../../assets/images/discord.png';

import classes from './ContactUs.module.css';

const ContactUs = () => {
  const { t } = useTranslation();
  return (
    <div>
      <div className={classes['webBrain']}>
        <div className={classes['container']}>
          <div className={classes['webMain']}>
            <div className={classes['brainLeft']}>
              <img src={Discord} alt='' />
              <div className={classes['leftWords']}>
                <h1>{t('Digital Olmazor')}</h1>
                <p>{t(`Course`)}</p>
              </div>
            </div>
            <div className={classes['brainRight']}>
              <a target='_blank' href='https://digitalolmazor.uz'>
                <button>
                  <Icon
                    className={classes['earth_icon']}
                    icon='icon-park:earth'
                  />
                  {t('ContactEnterWeb')}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
