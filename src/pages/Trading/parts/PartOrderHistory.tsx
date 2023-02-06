import React, { useState } from 'react';
import AppRadioBtn from 'src/components/AppRadioBtn';

const OPTIONS_RADIO = [
  { value: '1 Day', label: '1 Day' },
  { value: '1 Week', label: '1 Week' },
  { value: '1 Month', label: '1 Month' },
  { value: '3 Months', label: '3 Months' },
  { value: 'Time', label: 'Time' },
];

const PartOrderHistory = () => {
  const [valueRadio, setValueRadio] = useState('1 Day');
  return (
    <div>
      <AppRadioBtn
        value={valueRadio}
        onChange={setValueRadio}
        options={OPTIONS_RADIO}
      />
    </div>
  );
};

export default PartOrderHistory;
