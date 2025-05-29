import React from 'react';

import classes from './Input.module.css';

export const GenericInput = ({
  labelText,
  name,
  onChange,
  type = 'text',
  value,
}) => {
  return (
    <div className={classes['container']}>
      <label className={classes['text']}>{labelText} </label>
      <input
        name={name}
        onChange={onChange}
        className={classes['input']}
        type={type}
        value={value}
        required
      />
    </div>
  );
};
