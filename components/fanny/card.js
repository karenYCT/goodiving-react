import styles from '@/components/fanny/card.module.css';
import { FaRegCircleUser } from "react-icons/fa6";
import { FiMessageCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";


export default function Card() {



  return (
    <>
    <div className={styles.container}>
  <div className={styles.card}>
      <div className={styles.parent}>
        <img className={styles.icon} alt="" src="https://media.istockphoto.com/id/1007104540/photo/three-divers-among-fish.jpg?s=2048x2048&w=is&k=20&c=Wm-e7XiKGL0eqENyhrMFN0EHvoylkSU7p6wbbEy1OZ8=" />
        <div className={styles.cardText}>
          <b className={styles.b}>潛水</b>
          <div className={styles.div}>
            {`不難發現，問題在於該用什麼標準來做決定呢？需要考慮周詳潛水的影響及因應對策。這樣看來，潛水改變了我的命運。潛水因何而發生？潛水的發生，到底需要如何實現，不潛水的發生，又會如何產生。迪斯累利曾經提到過，我們無法從書中了解人類。這段話對世界的改變有著深遠的影響。問題的核心究竟是什麼？老舊的想法已經過時了。培根說過，深窺自己的心，而後發覺一切的奇蹟在你自己。但願各位能從這段話中獲得心靈上的滋長。潛水的存在，令我無法停止對他的思考。說到潛水，你會想到什麼呢？ `}
          </div>
        </div>
      </div>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <div className={styles.div3}>
            <div className={styles.iconiconuserbcOutlineParent}>
              {/* <img className={styles.iconiconuserbcOutline} alt="" src="" /> */}
              <FaRegCircleUser />
            
              <div className={styles.div4}>西瓜</div>
            </div>
            <div className={styles.div4}>2024/10/10</div>
            <div className={styles.div6}>已編輯</div>
          </div>
        </div>
        <div className={styles.div7}>
          <div className={styles.div8}>
            {/* <img className={styles.iconiconuserbcOutline} alt="" src="Icon/Icon/heart/fill/danger.svg" /> */}
            {/* <div className={styles.div9}>3</div> */}
            <FaRegHeart />
          </div>
          <div className={styles.div8}>
            {/* <img className={styles.iconiconuserbcOutline} alt="" src="Icon/Icon/massage/outline.svg" /> */}
            {/* <div className={styles.div9}>3</div> */}
            <FiMessageCircle />
          </div>
        </div>
      </div>
    </div>
</div>

    </>
  
  );
}
