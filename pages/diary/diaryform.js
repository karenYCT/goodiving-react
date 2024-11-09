import React, { useState, useEffect } from 'react'
import Modallog from '@/components/karen/modal-log';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import ButtonFG from '@/components/buttons/btn-fill-gray2';
import { FaCamera } from "react-icons/fa6";
import DatePicker from '@/components/karen/date-picker';
import SelectRect from '@/components/karen/select-rect';
import InputComponent from '@/components/karen/input-component';
import Radio from '@/components/karen/input-radio';
import styles from '@/pages/diary/diaryform.module.css';

export default function DiaryForm() {

  const VisiOptions = [
    { label: '極好', value: '1' },
    { label: '普通', value: '2' },
    { label: '差', value: '3' },
  ];

  const PrivateOptions = [
    { label: '公開', value: '1' },
    { label: '私人', value: '2' },
  ];

  return (

    <Modallog>
        <div className={styles.functionContainer}>
          <ButtonFG >儲存成草稿</ButtonFG>
          <ButtonFP2 >發佈</ButtonFP2>
        </div>
      <div className={styles.container}>
        <div className={styles.imgContainer} >
          <FaCamera />
          <h5>點擊新增照片</h5>
        </div>

        <div className={styles.itemContainer}>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
              <span>潛水日期：</span>
            </label>
            <DatePicker/>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>潛水區域：</span>
            </label>
            <SelectRect/>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>潛水名稱：</span>
            </label>
            <SelectRect/>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>最大深度：</span>
            </label>
            <InputComponent/>
            <span className={styles.unitBox}>米</span>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>潛水時間：</span>
            </label>
            <InputComponent/>
            <span className={styles.unitBox}>分鐘</span>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>水下溫度：</span>
            </label>
            <InputComponent/>
            <span className={styles.unitBox}>度</span>
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>能見度：</span>
            </label>
            <Radio 
              className={styles.radioBox}
              name="能見度"
              options={VisiOptions}
            />
          </div>

          <div className={styles.inputBox}>
            <label className={styles.inputLabel}>
            <span>心得：</span>
            </label>
            <textarea
              className={styles.textarea}
              placeholder="輸入文章內容（字數上限600字）"
              maxLength={500}
            />
          </div>

          <div className={styles.inputBox}>
          <label className={styles.inputLabel}>
          <span>隱私設定：</span>
          </label>
          <Radio 
            className={styles.radioBox}
            name="隱私設定"
            options={PrivateOptions}
          />
          </div>

        </div>
      </div>
    </Modallog>

  )
}
