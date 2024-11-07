import { useState, useCallback } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import styles from '@/components/fanny/add-comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Frame = ({ sendComment }) => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = useCallback(async () => {
    if (comment && comment.trim() !== '') {
      await sendComment(comment);
      setComment('');
    }
  }, [comment, sendComment]);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className={styles.iconiconuserbcOutlineParent}>
      <FaRegCircleUser />
      <div className={styles.card}>
        <input
          type="text"
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="留言...(字數上限100字)"
          maxLength={100}
          className={styles.input}
        />
      </div>
      <FontAwesomeIcon
        icon={faPaperPlane}
        onClick={handleSubmit}
        style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default Frame;
