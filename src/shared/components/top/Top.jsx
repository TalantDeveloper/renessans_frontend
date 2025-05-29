import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

import classes from './Top.module.css';

const Top = () => {
  const [y, setY] = useState();

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setY(window.scrollY);
    });
  }, []);

  return (
    <>
      {y >= 400 ? (
        <div
          onClick={() => window.scrollTo(0, 0)}
          data-aos='fade-down'
          className={classes['container']}
        >
          <Icon className={classes['icon']} icon='ep:top' />
        </div>
      ) : null}
    </>
  );
};

export default Top;
