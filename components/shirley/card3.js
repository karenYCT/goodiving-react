import styles from './card.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { HiOutlineChatBubbleLeft } from 'react-icons/hi2';

export default function Card(props) {
  const { post } = props;
  return (
    <>
      <div className={styles['article-box']}>
        <div className={styles['article-main']}>
          <div className={styles['img-box']}>
            <Image
              src="https://media.istockphoto.com/id/1007104540/photo/three-divers-among-fish.jpg?s=2048x2048&w=is&k=20&c=Wm-e7XiKGL0eqENyhrMFN0EHvoylkSU7p6wbbEy1OZ8="
              alt=""
              width={178}
              height={125}
              className={styles['article-pic']}
            />
          </div>
          <div className={styles['content']}>
            <h5>潛水勝地推薦：台灣綠島</h5>
            <p className={styles['multiline-ellipsis']}>
              綠島以其清澈的海水和豐富的海洋生態成為潛水愛好者的必去之地。本文將介紹綠島的最佳潛水點及當地的潛水服務，讓您享受一場獨特的潛水之旅！
            </p>
          </div>
        </div>
        <div className={styles['article-info']}>
          <div className={styles['area']}>
            <div className={styles['icon-text']}>
              <FaRegCircleUser className={styles['icon']} />
              <span>藍海</span>
            </div>
            <p>2024/11/10</p>
          </div>
          <div className={styles['area']}>
            <div className={styles['icon-text']}>
              <FaRegHeart className={styles['icon']} />
              <span>3</span>
            </div>
            <div className={styles['icon-text']}>
              <HiOutlineChatBubbleLeft className={styles['icon']} />
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
