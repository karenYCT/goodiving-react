import React, { useEffect, useState } from 'react';
import styles from '@/components/layouts/layout.module.css';
import Layout from '@/components/layouts/layout';
import LeftSide from '@/components/layouts/leftSide';
import MemberSidebar from '@/components/shirley/memberSidebar';
import chatStyles from './chat.module.css';
import BtnFillSecondary from '@/components/buttons/btn-fill-secondary';
import Input2 from '@/components/shirley/input2';
import { FaRegPaperPlane } from 'react-icons/fa';
import { io } from 'socket.io-client';
import { API_SERVER } from '@/configs/api-path';

// 是不是應該用變數?
export const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

export default function Chat() {
  const [message, setMessage] = useState(''); // 當前用戶輸入的訊息
  const [messages, setMessages] = useState([]); // 存儲所有訊息的狀態

  // 當收到訊息時
  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log('收到新訊息了!');
    });

    // socket.on('disconnect', () => {
    //   console.log('與伺服器斷線了!');
    // });

    // 清理事件監聽器
    return () => {
      socket.off('disconnect');
    };
  }, []);

  // 發送訊息
  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', message);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage(''); // 清空訊息輸入框
    }
  };

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
              {messages.map((v, i) => {
                return (
                  <div key={i} className={chatStyles['chat-self']}>
                    <p className={chatStyles['chat-self-text-box']}>{v}</p>
                    <p>10 / 6 09 : 37</p>
                  </div>
                );
              })}
              {/* <div className={chatStyles['chat-self']}>
                <p className={chatStyles['chat-self-text-box']}>
                  教練您好，想請問您開的ＯＯＯＯ課程，中間會有休息時間嗎?
                </p>
                <p>10 / 6 09 : 37</p>
              </div> */}

              {/* <div className={chatStyles['chat-self']}>
                <p className={chatStyles['chat-self-text-box']}>
                  教練您好，想請問您開的ＯＯＯＯ課程，中間會有休息時間嗎?
                </p>
                <p>10 / 6 09 : 37</p>
              </div>

              <div>
                <p className={chatStyles['chat-you-text-box']}>
                  同學好，至少每一小時會回到海上，中午有約1-1.5小時的用餐時間，下午的課程會比較累，建議同學用完餐後可以把握時間睡午覺多做休息！
                </p>
                <p>10 / 6 15 : 37</p>
              </div>

              <div className={chatStyles['chat-self']}>
                <p className={chatStyles['chat-self-text-box']}>
                  謝謝!感恩惜福!
                </p>
                <p>10 / 6 09 : 37</p>
              </div>

              <div>
                <p className={chatStyles['chat-you-text-box']}>
                  同學，不用擔心，老師口碑很好，很多上完課的同學，也有回來繼續找老師更進階的課，第一次上課不用太緊張，划划水而已
                </p>
                <p>10 / 6 15 : 37</p>
              </div>

              <div className={chatStyles['chat-self']}>
                <p className={chatStyles['chat-self-text-box']}>
                  了解了，謝謝老師，到時候見囉!會有保險嗎
                </p>
                <p>10 / 6 09 : 37</p>
              </div>

              <div>
                <p className={chatStyles['chat-you-text-box']}>有保險喔</p>
                <p>10 / 6 15 : 37</p>
              </div>*/}
            </div>

            {/* 輸入框區塊 */}
            <div className={chatStyles['input-box']}>
              <Input2
                type="text"
                placeholder="請輸入文字...."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <FaRegPaperPlane
                onClick={sendMessage}
                className={chatStyles['third-btn-icon']}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
