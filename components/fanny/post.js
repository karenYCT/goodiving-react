import styles from '@/components/fanny/post.module.css';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaRegHeart } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';
import { FaRegBookmark } from 'react-icons/fa6';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

const Frame = () => {
  return (
    <div className={styles.frameParent}>
      <div className={styles.frameGroup}>
        <div className={styles.parent}>
          <div className={styles.div}>潛水</div>
          <div className={styles.div1}>
            <div className={styles.iconiconuserbcOutlineParent}>
              {/* <img
                className={styles.iconiconuserbcOutline}
                alt=""
                src="Icon/Icon/user/bc-outline.svg"
              /> */}
              <FaRegCircleUser />
              <div className={styles.div2}>西瓜</div>
            </div>
            <div className={styles.div3}> 2024/10/10 01:42</div>
          </div>
        </div>
        <div
          className={styles.div4}
        >{`不難發現，問題在於該用什麼標準來做決定呢？需要考慮周詳潛水的影響及因應對策。這樣看來，潛水改變了我的命運。潛水因何而發生？潛水的發生，到底需要如何實現，不潛水的發生，又會如何產生。迪斯累利曾經提到過，我們無法從書中了解人類。這段話對世界的改變有著深遠的影響。問題的核心究竟是什麼？老舊的想法已經過時了。培根說過，深窺自己的心，而後發覺一切的奇蹟在你自己。但願各位能從這段話中獲得心靈上的滋長。潛水的存在，令我無法停止對他的思考。說到潛水，你會想到什麼呢？ `}</div>
        <div
          className={styles.div4}
        >{`不難發現，問題在於該用什麼標準來做決定呢？需要考慮周詳潛水的影響及因應對策。這樣看來，潛水改變了我的命運。潛水因何而發生？潛水的發生，到底需要如何實現，不潛水的發生，又會如何產生。迪斯累利曾經提到過，我們無法從書中了解人類。這段話對世界的改變有著深遠的影響。問題的核心究竟是什麼？老舊的想法已經過時了。培根說過，深窺自己的心，而後發覺一切的奇蹟在你自己。但願各位能從這段話中獲得心靈上的滋長。潛水的存在，令我無法停止對他的思考。說到潛水，你會想到什麼呢？ `}</div>
        <div className={styles.iconContainer}>
          <FaRegBookmark />
          <FaArrowUpRightFromSquare />
        </div>

        {/* <img className={styles.frameChild} alt="" src="Rectangle 13.png" /> */}
      </div>
      <div className={styles.group}>
        <div className={styles.div6}>
          <div className={styles.div7}>
            {/* <img
              className={styles.iconiconuserbcOutline}
              alt=""
              src="Icon/Icon/heart/fill/danger.svg"
            /> */}
            <div className={styles.iconContainer2}>
            <FaRegHeart />
            </div>
            <div className={styles.div8}>3</div>
          </div>
          <div className={styles.div7}>
            {/* <img
              className={styles.iconiconuserbcOutline}
              alt=""
              src="Icon/Icon/massage/outline.svg"
            /> */}
            <div className={styles.iconContainer3}>
            <FiMessageCircle />
            </div>
            <div className={styles.div8}>3</div>
          </div>
        </div>
        <div className={styles.iconiconcollectoutlineParent}>
          {/* <img
            className={styles.iconiconcollectoutline}
            alt=""
            src="Icon/Icon/collect/outline.svg"
          /> */}
          {/* <img
            className={styles.iconiconuserbcOutline}
            alt=""
            src="Icon/Icon/share.svg"
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Frame;
