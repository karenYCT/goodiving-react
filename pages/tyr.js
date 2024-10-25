import React, { useState } from 'react';
import InputRadio from '@/components/inputs/input-radio';

export default function Tyr() {
  const [selectedRadio, setSelectedRadio] = useState('man');
  const [privacy, setPrivacy] = useState('public'); // 第二組選項
  
  const options = [
    { label: '男生', value: 'man' },
    { label: '女生', value: 'woman' },
    { label: '不告訴你', value: 'unknow' },
  ];

  const privacyOptions = [
    { label: '公開', value: 'public' },
    { label: '私人', value: 'private' },
  ];

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
  };

  const handleRadioChange2 = (value) => {
    setPrivacy(value);
  };

  return (
    <>
      <InputRadio 
        name="b"
        options={options} 
        selectedRadio={selectedRadio} 
        onChange={handleRadioChange} 
      />
      <InputRadio 
        name="a"
        options={privacyOptions} 
        selectedRadio={privacy} 
        onChange={handleRadioChange2} 
      />
    </>
  );
}