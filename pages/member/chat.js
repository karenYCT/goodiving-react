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
import {
  CHAT_MESSAGES,
  CHAT_SAVE_MESSAGE,
  CHAT_USER_NAME,
} from '@/configs/api-path';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

// 開啟連線
export const socket = io('http://localhost:3001', {
  transports: ['websocket'],
});

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected); // 連線的狀態
  const [message, setMessage] = useState(''); // 當前用戶輸入的訊息
  const [messages, setMessages] = useState([]); // 存儲所有訊息的狀態
  const [loading, setLoading] = useState(true); // 加載狀態
  const [conversationId, setConversationId] = useState('');
  const [receiver, setReceiver] = useState('');
  const router = useRouter();
  const { receiverId } = router.query;
  const { auth } = useAuth();

  console.log('看一下一開始的messages', JSON.stringify(messages, null, 4));
  // 發送訊息
  const sendMessage = async () => {
    if (message && conversationId) {
      // 通過 Socket.IO 傳送訊息
      socket.emit('send_message', {
        sender_user_id: auth.user_id,
        receiver_user_id: receiverId,
        message,
        conversation_id: conversationId,
      });

      // 即時更新自己的訊息到畫面
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender_user_id: auth.user_id, message, sent_at: new Date() },
      ]);
      setMessage(''); // 清空輸入框

      // 同步更新到資料庫
      try {
        const response = await fetch(CHAT_SAVE_MESSAGE, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sender_user_id: auth.user_id,
            receiver_user_id: receiverId,
            message,
            conversation_id: conversationId,
          }),
        });

        const result = await response.json();
        if (!result.success) {
          console.error('訊息儲存失敗:', result.message);
        }
      } catch (error) {
        console.error('儲存訊息到資料庫時發生錯誤:', error);
      }
    }
  };

  const findSenderName = async () => {
    try {
      const response = await fetch(
        `${CHAT_USER_NAME}?receiverId=${receiverId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );
      const result = await response.json();
      console.log(
        '伺服器回傳的findSenderName',
        JSON.stringify(result, null, 4)
      );
      setReceiver(result.data.user_full_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (receiverId) {
      findSenderName();
      try {
      } catch (error) {
        toast.error('你們不是朋友');
      }
    } else {
      console.log('findSenderName沒有執行');
    }
  }, [receiverId]);

  useEffect(() => {
    // 開啟聊天室(初始化）
    if (receiverId) {
      setLoading(true); // 開始加載資料
      fetch(CHAT_MESSAGES, {
        method: 'POST',
        body: JSON.stringify({
          sender_user_id: auth.user_id,
          receiver_user_id: receiverId,
        }),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            console.log('收到的訊息資料data:', JSON.stringify(data, null, 4)); // 查看API return的訊息資料結構
            setMessages(data.messages);
            setConversationId(data.conversation_id);
          }
        })
        .finally(() => setLoading(false)); // 資料加載完成，停止 loading
    }
  }, [receiverId]);

  // 當收到訊息時
  useEffect(() => {
    socket.on('receive_message', (newMessage) => {
      console.log('收到新訊息:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 合併新訊息
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  // 監測連線狀態
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('連上線了！');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('連線中斷了！');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // 清理事件監聽器
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  useEffect(() => {
    if (auth && auth.user_id) {
      socket.emit('register', auth.user_id);
      console.log(`已向後端註冊用戶: ${auth.user_id}`);
    }
  }, [auth]);

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <div className={chatStyles['chat-container-box']}>
            <div className={chatStyles['chat-tilte-box']}>
              <p className={chatStyles['chat-tilte-peo']}>{receiver}</p>
              {/* <BtnFillSecondary>訂單資訊</BtnFillSecondary> */}
            </div>

            {/* 聊天訊息區塊 */}
            <div className={chatStyles['chat-messages']}>
              {loading ? (
                <p>正在加載訊息...</p> // 加載期間顯示
              ) : Array.isArray(messages) && messages.length === 0 ? (
                <p>立刻展開對話</p> // 如果沒有訊息則顯示提示
              ) : (
                Array.isArray(messages) &&
                messages.map((v, i) => {
                  // 確保 messages 是陣列再進行 map
                  return (
                    <div
                      key={i}
                      className={
                        v.sender_user_id == auth.user_id
                          ? chatStyles['chat-self']
                          : ''
                      }
                    >
                      <p className={chatStyles['chat-self-text-box']}>
                        {v.message} {/* 渲染訊息內容 */}
                      </p>
                      <p>{new Date(v.sent_at).toLocaleString()}</p>{' '}
                    </div>
                  );
                })
              )}
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
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                role="button"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
