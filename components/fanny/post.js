import styles from '@/components/fanny/post.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Heart from '@/components/fanny/heart-icon';
import Message from '@/components/fanny/message-icon';
import Bookmark from '@/components/fanny/bookmark-icon';
import Faarrowup from '@/components/fanny/faarrowup-icon';
import dayjs from 'dayjs';

const Frame = (props) => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.parent}>
          <div className={styles.div}>{props.post?.name}</div>
          <div className={styles.div1}>
            <div className={styles.iconiconuserbcOutlineParent}>
              <FaRegCircleUser />
              <div className={styles.div2}>{props.post?.user_full_name}</div>
            </div>
            <div className={styles.div3}>
              {dayjs(props.post.created_at).format('YYYY-MM-DD HH:mm')}
            </div>
          </div>
        </div>
        <div className={styles.div4}>{props.post?.content}</div>
        {props.post?.imageIds?.map((imageId) => (
          <img
            key={imageId}
            className={styles.icon}
            alt=""
            width={360}
            height={360}
            src={`${process.env.NEXT_PUBLIC_API_PATH}/api/blog/images/${imageId}`}
          />
        ))}
        <div className={styles.iconContainer}>
          <Bookmark />
          <Faarrowup />
        </div>
      </div>
      <div className={styles.group}>
        <div className={styles.div6}>
          <div className={styles.div7}>
            <div className={styles.iconContainer2}>
              <Heart />
            </div>
          </div>
          <div className={styles.div7}>
            <div className={styles.iconContainer3}>
              <Message />
            </div>
          </div>
        </div>
        <div className={styles.iconiconcollectoutlineParent}></div>
      </div>
    </div>
  );
};

export default Frame;
