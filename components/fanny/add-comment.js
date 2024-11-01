import { useState } from 'react';
import { FaRegCircleUser } from "react-icons/fa6";
import styles from '@/components/fanny/add-comment.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const Frame = () => {
  const [comment, setComment] = useState('');

  const handleChange = (event) => {
    setComment(event.target.value); 
  };

  return (
    <div className={styles.iconiconuserbcOutlineParent}>
      {/* <img
        className={styles.iconiconuserbcOutline}
        alt=""
        src="Icon/Icon/user/bc-outline.svg"
      /> */}
        <FaRegCircleUser />
      <div className={styles.card}>
        <input
          type="text"
          value={comment}
          onChange={handleChange}
          placeholder="留言...(字數上限100字)"
          maxLength={100} 
          className={styles.input}
        />
      </div>
      {/* <img
        className={styles.iconiconuserbcOutline}
        alt=""
        src="Icon/Icon/sent/outline.svg"
      /> */}
      <FontAwesomeIcon icon={faPaperPlane} />
    </div>
  );
};

export default Frame;
