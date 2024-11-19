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
  CHAT_RECENT_CONTACTS,
  CHAT_USER_DETAILS,
  API_SERVER,
} from '@/configs/api-path';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import BtnOnline from '@/components/shirley/btn-online';
import { forEach } from 'lodash';

// 開啟連線
export const socket = io(API_SERVER, {
  transports: ['websocket'],
});

export default function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected); // 連線的狀態
  const [message, setMessage] = useState(''); // 當前用戶輸入的訊息
  const [messages, setMessages] = useState([]); // 存儲所有訊息的狀態
  const [loading, setLoading] = useState(true); // 加載狀態
  const [conversationId, setConversationId] = useState('');
  const [receiver, setReceiver] = useState(''); // 目前聊天的對方是誰
  const [recentContacts, setRecentContacts] = useState([]); // 最近聊天對象（中文名字＋id）
  const [onlineUsers, setOnlineUsers] = useState([]); // 在線用戶
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

  // 當前聊天對象的名字
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

  // 過往有聊過天的清單
  const finduserDetial = async (contactList) => {
    const userIds = [];
    for (let i = 0; i < contactList.length; i++) {
      userIds.push(contactList[i]);
    }
    try {
      const response = await fetch(CHAT_USER_DETAILS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_ids: userIds }),
        credentials: 'include',
      });

      const result = await response.json();
      console.log(
        '伺服器回傳的finduserDetial',
        JSON.stringify(result, null, 4)
      );

      if (result.success) {
        // 將 user_id 和 user_full_name 整合成陣列
        const chatList = result.users.map((user) => ({
          user_id: user.user_id,
          user_full_name: user.user_full_name,
        }));

        console.log('整理後的聊天對象清單:', chatList);

        // 更新到 recentContacts 狀態
        setRecentContacts(chatList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    if (!receiverId) {
      console.log('findSenderName沒有執行');
      return;
    }
  
    const fetchSenderName = async () => {
      try {
        await findSenderName();
      } catch (error) {
        toast.error('你們不是朋友');
      }
    };
  
    fetchSenderName();
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
            // console.log('收到的訊息資料data:', JSON.stringify(data, null, 4));
            setMessages(data.messages);
            setConversationId(data.conversation_id);
          }
        })
        .finally(() => setLoading(false)); // 資料加載完成，停止 loading
    }
  }, [receiverId]);

  // 當收到訊息時
  useEffect(() => {
    const receiveMessageHandler = (newMessage) => {
      console.log('收到新訊息:', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]); // 合併新訊息
    };

    socket.on('receive_message', receiveMessageHandler);

    return () => {
      socket.off('receive_message', receiveMessageHandler); // 清除事件監聽器
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

      // 接收在線用戶列表
      socket.on('online_users', (users) => {
        setOnlineUsers(users); // 更新在線用戶狀態
        console.log('在線用戶列表:', users);
      });

      return () => {
        socket.off('online_users');
      };
    }
  }, [auth]);

  useEffect(() => {
    if (auth.user_id) {
      // 找最近聊天的對象
      fetch(`${CHAT_RECENT_CONTACTS}/${auth.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            const contactList = data.contacts.map(
              (contact) => contact.contact_id
            );
            console.log('所有聊天對象的 ID:', contactList);
            finduserDetial(contactList);
          }
        })
        .catch((err) => console.error('Error fetching recent contacts:', err));
    }
  }, [auth.user_id]);

  // 如果網址上沒有帶 receiverId 參數，則取最近一筆聊天對象並跳轉
  useEffect(() => {
    if (!receiverId && auth.user_id) {
      fetch(`${CHAT_RECENT_CONTACTS}/${auth.user_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.contacts.length > 0) {
            const mostRecentContact = data.contacts[0].contact_id; // 最近的聊天對象
            router.push(`/member/chat?receiverId=${mostRecentContact}`);
          } else {
            console.log('沒有找到最近的聊天對象');
          }
        })
        .catch((err) => console.error('Error fetching recent contacts:', err));
    }
  }, [receiverId, auth.user_id]);

  return (
    <>
      <Layout>
        <LeftSide>
          <MemberSidebar />
        </LeftSide>
        <div className={styles.main}>
          <div className={chatStyles['online-box']}>
            {recentContacts.length > 0 ? (
              recentContacts.map((recentContact) => (
                <BtnOnline
                  key={recentContact.user_id}
                  name={recentContact.user_full_name}
                  url={recentContact.user_id}
                  isOnline={onlineUsers.includes(
                    recentContact.user_id.toString()
                  )}
                />
              ))
            ) : (
              <p>目前沒有聊天對象</p>
            )}
          </div>
          <div className={chatStyles['chat-container-box']}>
            <div className={chatStyles['chat-tilte-box']}>
              <p className={chatStyles['chat-tilte-peo']}>{receiver}</p>
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
                          : chatStyles['chat-you']
                      }
                    >
                      <p
                        className={
                          v.sender_user_id == auth.user_id
                            ? chatStyles['chat-self-text-box']
                            : chatStyles['chat-you-text-box']
                        }
                      >
                        {v.message} {/* 渲染訊息內容 */}
                      </p>
                      <p className={chatStyles['time-text']}>
                        {new Date(v.sent_at).toLocaleString()}
                      </p>{' '}
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
