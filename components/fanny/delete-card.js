import styles from '@/components/fanny/delete-card.module.css';
import Button from '@/components/fanny/btn-fill-gray'
import Button1 from '@/components/fanny/btn-fill-primary';

export default function Card () {
  return (
    <div className={styles.card}>
      <div className={styles.parent}>
        <div className={styles.cardText}>
          <div className={styles.group}>
            <div className={styles.div}>{`2024/10/10  01:42 `}</div>
            <div className={styles.div1}>{`已編輯 `}</div>
          </div>
          <img className={styles.icon} alt="" src="https://media.istockphoto.com/id/1007104540/photo/three-divers-among-fish.jpg?s=2048x2048&w=is&k=20&c=Wm-e7XiKGL0eqENyhrMFN0EHvoylkSU7p6wbbEy1OZ8=" />
          <div className={styles.b}>潛水</div>
          <div
            className={styles.div2}
          >{`不難發現，問題在於該用什麼標準來做決定呢？需要考慮周詳潛水的影響及因應對策。這樣看來，潛水改變了我的命運。潛水因何而發生？潛水的發生，到底需要如何實現，不潛水的發生，又會如何產生。迪斯累利曾經提到過，我們無法從書中了解人類。這段話對世界的改變有著深遠的影響。問題的核心究竟是什麼？老舊的想法已經過時了。培根說過，深窺自己的心，而後發覺一切的奇蹟在你自己。但願各位能從這段話中獲得心靈上的滋長。潛水的存在，令我無法停止對他的思考。說到潛水，你會想到什麼呢？ `}</div>
        </div>
      </div>
      <div className={styles.buttonFunctionParent}>
        <div className={styles.buttonFunction}>
          <div className={styles.buttonText}>
            <div className={styles.div3}>
              <Button>刪除</Button>
            </div>
          </div>
        </div>
        <div className={styles.buttonFunction1}>
          <div className={styles.buttonText}>
            <div className={styles.div3}>
            <Button1>編輯</Button1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

