import React, { useState, useEffect } from 'react';
import InputCheck from '@/components/inputs/input-check';
import Modal from '@/components/shirley/modal';


export default function TryCkeck({ children }) {
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const hobbyOptions = [
    { label: '潛水', value: 'diving' },
    { label: '爬山', value: 'hiking' },
    { label: '閱讀', value: 'reading' },
    { label: '音樂', value: 'music' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <div>父元件</div>
      <InputCheck
        name="hobby"
        options={hobbyOptions}
        selectedValues={selectedHobbies}
        onChange={setSelectedHobbies}
      />
      <button onClick={openModal}>登入</button>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <p>內容</p>
      </Modal>
      <br/>
      <a onClick={openModal} hrdf='./member/login'>會員登入</a>
    </>
  );
}
