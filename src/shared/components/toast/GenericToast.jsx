import React from 'react';

import './GenericToast.module.css';

const ToastComponent = ({ title, description }) => {
  return (
    <div className='ToastComponent'>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  );
};

export default ToastComponent;
