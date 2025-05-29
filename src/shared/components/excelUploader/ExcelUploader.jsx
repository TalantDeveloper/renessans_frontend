import React, { useRef } from 'react';
import { Icon } from '@iconify/react';
import { read, utils } from 'xlsx';

import classes from './ExcelUploader.module.css';

const ExcelUploader = ({ setUserData, setIsLoading }) => {
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });

      // Assuming the first sheet in the workbook
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json(worksheet, { header: 1 });

      const headers = jsonData[0];
      const rows = jsonData.slice(1);

      const parsedData = rows.map((row) =>
        headers.reduce(
          (obj, header, index) => ({
            ...obj,
            [header.toLowerCase()]: row[index],
          }),
          {}
        )
      );

      const formattedData = parsedData.sort((a, b) =>
        a.class.localeCompare(b.class)
      );

      setIsLoading(true);
      setUserData(formattedData);
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div onClick={handleContainerClick} className={classes['container']}>
      <Icon className={classes['icon']} icon={'material-symbols:upload'} />
      <p className={classes['text']}>CHSB Baholarini Yuklash</p>
      <input
        className={classes['input']}
        ref={fileInputRef}
        id='nmadur'
        type='file'
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ExcelUploader;
