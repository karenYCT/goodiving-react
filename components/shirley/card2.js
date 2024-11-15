import styles from './card.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Image from 'next/image';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';

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
            <h5>潛水裝備挑選指南：從呼吸器到蛙鞋</h5>
            <p className={styles['multiline-ellipsis']}>
              選擇合適的潛水裝備對於潛水體驗至關重要。本文將深入介紹如何挑選適合的呼吸器、蛙鞋和潛水服，讓您在海中更加自信自在。
            </p>
          </div>
        </div>
        <div className={styles['article-info']}>
          <div className={styles['area']}>
            <div className={styles['icon-text']}>
              <FaRegCircleUser className={styles['icon']} />
              <span>藍海</span>
            </div>
            <p>2024/10/30</p>
          </div>
          <div className={styles['area']}>
            <div className={styles['icon-text']}>
              <FaRegHeart className={styles['icon']} />
              <span>3</span>
            </div>
            <div className={styles['icon-text']}>
              <IoChatbubbleEllipsesOutline className={styles['icon']} />
              <span>5</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
