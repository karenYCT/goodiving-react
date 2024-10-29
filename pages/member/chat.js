import React, { useState, useEffect } from 'react';
import styles from '@/components/layouts/layout.module.css';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import chatStyles from '@/styles/shirley/chat.module.css';
import BtnFillSecondary from '@/components/buttons/btn-fill-secondary';
import Input2 from '@/components/shirley/input2';
import { FaRegPaperPlane } from 'react-icons/fa';

export default function Chat({ children }) {
  const [inputText, setInputText] = useState('');
  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <div className={chatStyles['chat-container-box']}>
            <div className={chatStyles['chat-tilte-box']}>
              <p className={chatStyles['chat-tilte-peo']}>客服</p>
              <BtnFillSecondary>訂單資訊</BtnFillSecondary>
            </div>

            {/* 聊天訊息區塊 */}
            <div className={chatStyles['chat-messages']}>
              {/* 這裡動態渲染聊天訊息 */}
              <div className={chatStyles['chat-self']}>
                <p className={chatStyles['chat-self-text-box']}>教練您好，想請問您開的ＯＯＯＯ課程，中間會有休息時間嗎?</p>
                <p>10 / 6  09 : 37</p>
              </div>
              <div >
                <p className={chatStyles['chat-you-text-box']}>
                  同學好，至少每一小時會回到海上，中午有約1-1.5小時的用餐時間，下午的課程會比較累，建議同學用完餐後可以把握時間睡午覺多做休息！
                </p>
                <p>10 / 6  15 : 37</p>
              </div>
            </div>

            {/* 輸入框區塊 */}
            <div className={chatStyles['input-box']}>
              <Input2
                placeholder="請輸入文字...."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <FaRegPaperPlane className={chatStyles['third-btn-icon']} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
