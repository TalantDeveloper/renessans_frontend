import React from 'react';
import { Icon } from '@iconify/react';

import classes from './Modal.module.css';

export const GenericModal = ({
  children,
  title,
  isOpen,
  setIsOpen,
  onClick,
  btn_text,
}) => {
  return (
    <div
      style={isOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
      className={classes['wrapper']}
    >
      <div
        style={isOpen ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}
        className={classes['container']}
      >
        <Icon
          onClick={() => setIsOpen(false)}
          className={classes['icon']}
          icon='ph:x-bold'
        />
        <h1 className={classes['title']}>{title}</h1>
        {children}
        <button type='submit' onClick={onClick} className={classes['btn']}>
          {btn_text}
        </button>
      </div>
    </div>
  );
};
