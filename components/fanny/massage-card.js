import styles from '@/components/fanny/massage.module.css';
import { FaRegCircleUser } from "react-icons/fa6";
import Heart from '@/components/fanny/heart-icon'

import Message from "@/components/fanny/message-icon"
import TrashCan from "@/components/fanny/trash-icon"


const Card = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.div}>
        <div className={styles.iconicontrashWrapper}>
          <div className={styles.div2}>
            <div className={styles.iconiconuserbcOutlineParent}>
              <FaRegCircleUser />
              <div className={styles.div3}>{props.post?.user_id}</div>
            </div>
            <div className={styles.div4}>{props.post?.message_date}</div>
          </div>
        </div>
        <div className={styles.iconiconheartoutlineParent}>
            <Heart />
            <TrashCan />
          <div className={styles.div5}>3</div>
          <div className={styles.iconicontrashWrapper}>
            
          </div>
        </div>
      </div>
      {/* <div className={styles.div6}>
        不難發現，問題在於該用什麼標準來做決定呢？需要考慮周詳潛水的影響及因應對策。這樣看來，潛水改變了我的命運。潛水因何而發生？潛水的發生，到底需要如何實現，不潛水的發生，又會如何產生。
      </div> */}
    </div>
  );
};

export default Card;
