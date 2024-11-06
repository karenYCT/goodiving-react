import styles from '@/components/fanny/card.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Message from '@/components/fanny/message-icon';
import Heart from '@/components/fanny/heart-icon';
import dayjs from 'dayjs';

export default function Card(props) {
  const { post } = props;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.parent}>
            <img
              className={styles.icon}
              alt=""
              src="https://media.istockphoto.com/id/1007104540/photo/three-divers-among-fish.jpg?s=2048x2048&w=is&k=20&c=Wm-e7XiKGL0eqENyhrMFN0EHvoylkSU7p6wbbEy1OZ8="
            />
            <div className={styles.cardText}>
              <b className={styles.b}>{post?.name}</b>
              <div className={styles.div}>{post?.content}</div>
            </div>
          </div>
          <div className={styles.div1}>
            <div className={styles.div2}>
              <div className={styles.div3}>
                <div className={styles.iconiconuserbcOutlineParent}>
                  <FaRegCircleUser />

                  <div className={styles.div4}>{post?.user_id}</div>
                </div>
                <div className={styles.div4}>
                  {dayjs(post?.created_at).format('YYYY-MM-DD HH:mm')}
                </div>
                <div className={styles.div6}>已編輯</div>
              </div>
            </div>
            <div className={styles.div7}>
              <div className={styles.div8}>
                <Heart />
              </div>
              <div className={styles.div8}>
                <Message />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
