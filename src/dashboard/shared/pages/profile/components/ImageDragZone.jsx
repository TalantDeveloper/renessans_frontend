import React, { useState } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import classes from './ImageDragZone.module.css';

const ImageDragZone = ({ userImage, setUserImage }) => {
  const { t } = useTranslation();

  const [dragging, setDragging] = useState(false);

  const imageDragZoneClasses = classNames({
    [`${classes['image-drag-zone']}`]: true,
    [`${classes['dragging']}`]: dragging,
  });

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    const imageFile = files[0];
    if (imageFile && imageFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target.result;
        setUserImage(imageUrl);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div
      className={imageDragZoneClasses}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>{!userImage && t('Drag & Drop Your Image Here')}</p>
      {userImage && (
        <img
          width={'200px'}
          className={classes['uploaded-image']}
          src={userImage}
          alt='Uploaded'
        />
      )}
    </div>
  );
};

export default ImageDragZone;
