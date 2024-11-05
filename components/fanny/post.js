import styles from '@/components/fanny/post.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import Heart from '@/components/fanny/heart-icon'
import Message from "@/components/fanny/message-icon"
import Bookmark  from '@/components/fanny/bookmark-icon'
import Faarrowup from '@/components/fanny/faarrowup-icon'
import { useEffect, useState } from 'react';

const Frame = (props) => {
  
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.parent}>
          <div className={styles.div}>{props.post?.bl_name}</div>
          <div className={styles.div1}>
            <div className={styles.iconiconuserbcOutlineParent}>
              <FaRegCircleUser />
              <div className={styles.div2}>{props.post?.user_id}</div>
            </div>
            <div className={styles.div3}>{props.post?.bl_date}</div>
          </div>
        </div>
        <div
          className={styles.div4}
        >{props.post?.bl_content}</div>
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
        <div className={styles.iconiconcollectoutlineParent}>
        </div>
      </div>
    </div>
  );
};

export default Frame;
