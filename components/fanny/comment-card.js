import styles from '@/components/fanny/massage.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Heart from '@/components/fanny/heart-icon';
import TrashCan from '@/components/fanny/trash-icon';
import dayjs from 'dayjs';

const Card = ({ comment }) => {
  return (
    <div className={styles.card}>
      <div className={styles.div}>
        <div className={styles.iconicontrashWrapper}>
          <div className={styles.div2}>
            <div className={styles.iconiconuserbcOutlineParent}>
              <FaRegCircleUser />
              <div className={styles.div3}>{comment?.user_full_name}</div>
            </div>
            <div className={styles.div4}>
              {dayjs(comment?.created_at).format('YYYY-MM-DD HH:mm')}
            </div>
          </div>
        </div>
        <div className={styles.iconiconheartoutlineParent}>
          <Heart />
          <TrashCan />
          <div className={styles.div5}>3</div>
          <div className={styles.iconicontrashWrapper}></div>
        </div>
      </div>
      <div className={styles.div6}>{comment?.content}</div>
    </div>
  );
};

export default Card;
