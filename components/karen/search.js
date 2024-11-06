import React, { useState, useEffect } from 'react';
import SelectRect from '@/components/dropdown/select-rect';
import ButtonOP2 from '@/components/buttons/btn-outline-primary2';
import ButtonOP from '@/components/buttons/btn-outline-primary';
import styles from './search.module.css';
import Modal from './modal-search';

export default function Search({
  isOpen = false,
  closeModal = () => {},
  regions = [],
  methods = [],
  levels =[],
  onApplyFilters = () => {},
  initialFilters = {}, 
}) {

  const [searchFilters, setSearchFilters] = useState({
    region: null,
    method: null,
    level: null,
  });

  // 當 Modal 開啟時，載入當前的篩選條件
  useEffect(()=>{
    if (isOpen){
      setSearchFilters(initialFilters);
    }
  },[isOpen, initialFilters]);

  //處理『篩選』邏輯按鈕
  const handleFilterClick = (type, value) => {
    setSearchFilters((prev) => ({ 
      ...prev, 
      [type]: prev[type]  === value ? null : value , // 再次點擊同一個選項會取消選擇
    }));
  };

  //處理『套用』按鈕
  const handleApply =()=>{
    onApplyFilters(searchFilters);
    closeModal();
  }


  //處理『清除』按鈕
  const handleClear = () => {
    setSearchFilters({
      region: null,
      method: null,
      level: null,
    });
  };

  // useEffect(() => {
  //   console.log('Methods received in Search:', methods);
  // }, [methods]);

  return (
    <>
      <Modal className={styles.modal} isOpen={isOpen} closeModal={closeModal}>
        <div className={styles.container}>
          <div className={styles.section}>
            <h5>排序條件</h5>
            <SelectRect />
          </div>
          <div className={styles.section}>
            <h5>地區</h5>
            <div className={styles.body}>
              {regions.map((region) => (
                <ButtonOP2
                  className={`${
                    searchFilters.region === region.region_id ? styles.active : ''
                  }`}
                  key={region.region_id}
                  onClick={() => handleFilterClick('region', region.region_id)}
                >
                  {region.region_name}
                </ButtonOP2>
              ))}
            </div>
          </div>
          <div className={styles.section}>
            <h5>潛水方式</h5>
            <div className={styles.body}>
              {Array.isArray(methods) && methods.map((method)=>(
                <ButtonOP2 
                className={`${
                  searchFilters.method === method.method_id ? styles.active : ''
                  } ${styles.customButton}`}
                key={method.method_id}
                onClick={()=> handleFilterClick('method', method.method_id)}
                >
                {method.method_name}
                </ButtonOP2>
                ))}
            </div>
          </div>
          <div className={styles.section}>
            <h5>難易度</h5>
            <div className={styles.body}>
            {Array.isArray(levels) && levels.map((level)=>(
                <ButtonOP2 
                className={`${
                  searchFilters.level === level.level_id ? styles.active : ''
                  } ${styles.customButton}`}
                key={level.level_id}
                onClick={()=> handleFilterClick('level', level.level_id)}
                >
                {level.level_name}
                </ButtonOP2>
                ))}
            </div>
          </div>
          <div className={styles.function}>
            <ButtonOP className={styles.customButton} onClick={handleClear}>清除</ButtonOP>
            <ButtonOP className={styles.customButton} onClick={handleApply}>套用</ButtonOP>
          </div>
        </div>
      </Modal>
    </>
  );
}
