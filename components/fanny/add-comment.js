import { useState, useCallback } from 'react'; // 匯入 React 的 useState 和 useCallback hook，用來管理狀態和優化函數的記憶
import { FaRegCircleUser } from 'react-icons/fa6';
import styles from '@/components/fanny/add-comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// 定義 Frame 元件，接收 sendComment 作為 prop
const Frame = ({ sendComment }) => {
  const [comment, setComment] = useState('');

  // 使用 useState hook 定義 `comment` 狀態，並提供 `setComment` 函數來更新它，初始化為空字符串

  // 處理留言內容變更的函數
  const handleChange = (event) => {
    setComment(event.target.value); // 更新 `comment` 狀態為輸入框中的內容
  };

  // 提交留言的函數，只有在留言不為空時才會發送
  const handleSubmit = useCallback(async () => {
    if (comment && comment.trim() !== '') {
      // 確保留言不為空或者只包含空格
      console.log('Submitting comment:', comment);

      try {
        await sendComment(comment); // 呼叫 `sendComment` 函式（來自父元件）來發送留言
        setComment(''); // 發送完留言後，清空留言框
      } catch (error) {
        console.error('Error sending comment:', error); // 發生錯誤時顯示錯誤訊息
      }
    }
  }, [comment, sendComment]);
  // `handleSubmit` 依賴 `comment` 和 `sendComment`，只有當這兩者改變時才會重新創建函數

  // 處理鍵盤事件，當按下 Enter 鍵時觸發提交
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 如果按下的是 Enter 鍵
      event.preventDefault(); // 防止按下 Enter 鍵時頁面重整
      handleSubmit(); // 執行 `handleSubmit` 函數來發送留言
    }
  };

  return (
    // 返回渲染的 JSX 元素
    <div className={styles.iconiconuserbcOutlineParent}>
      <FaRegCircleUser />
      <div className={styles.card}>
        <input // 用來輸入留言的文本框
          type="text" // 設定為文字類型的輸入框
          value={comment} // 輸入框的值來自 `comment` 狀態
          onChange={handleChange} // 當輸入框的內容改變時，觸發 `handleChange`
          onKeyDown={handleKeyDown} // 監聽按鍵事件，按下 Enter 鍵時觸發 `handleKeyDown`
          placeholder="留言...(字數上限100字)" // 提示文字，告訴用戶可以輸入留言，並提示字數限制
          maxLength={100} // 設定最大字數為 100 字
          className={styles.input} // 套用 CSS 樣式
        />
      </div>
      <div  className={styles.icon}>
      <FontAwesomeIcon // 顯示紙飛機圖標，作為發送留言的按鈕
        icon={faPaperPlane} // 設定圖標為紙飛機
        onClick={handleSubmit} // 當點擊圖標時，觸發 `handleSubmit` 函數來發送留言
        style={{ cursor: 'pointer' }} // 設定點擊時游標為手型，提示用戶可點擊
      />
      </div>
    </div>
  );
};

export default Frame;
