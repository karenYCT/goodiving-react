import styles from '@/components/fanny/card.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Message from '@/components/fanny/message-icon';
import Heart from '@/components/fanny/heart-icon';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export default function Card(props) {
  const { post } = props;
  const router = useRouter();

  const handleChat = () => {
    router.push(`/member/chat?receiverId=${post?.user_id}`); // 使用查詢參數
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.parent}>
            <img
              className={styles.icon}
              alt=""
              src={
                post.imageId
                  ? `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/images/${post.imageId}`
                  : 'https://media.istockphoto.com/id/1007104540/photo/three-divers-among-fish.jpg?s=2048x2048&w=is&k=20&c=Wm-e7XiKGL0eqENyhrMFN0EHvoylkSU7p6wbbEy1OZ8='
              }
            />
            <div className={styles.cardText}>
              <div className={styles['title-box']}>
                <b className={styles.b}>{post?.name}</b>
                <div
                  onClick={handleChat}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  role="button"
                  tabIndex={0}
                  className={styles['chat-button']}
                >
                  私訊
                </div>
              </div>
              <div className={styles.div}>{post?.content}</div>
            </div>
          </div>
          <div className={styles.div1}>
            <div className={styles.div2}>
              <div className={styles.div3}>
                <div className={styles.iconiconuserbcOutlineParent}>
                  <FaRegCircleUser />

                  <div className={styles.div4}>{post?.user_full_name}</div>
                </div>

                <div className={styles.div4}>
                  {dayjs(post?.created_at).format('YYYY-MM-DD HH:mm')}
                </div>
                <div className={styles.div6}></div>
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
