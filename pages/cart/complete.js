import CheckoutFlow from '@/components/eden/checkout-flow';
import Layout from '@/components/layouts/layout';
import styles from './complete.module.css';
import Button1 from '@/components/buttons/btn-outline-primary';
import Button2 from '@/components/buttons/btn-fill-primary';
import Image from 'next/image';

export default function Complete() {
  const order = {
    image: '/example.jpg',
    title: '商品名稱',
    price: 99.99,
    quantity: 1,
    size: 'M',
    color: '藍色',
    total: 999.99,
  };

  return (
    <Layout>
      <div className={styles.container}>
        <CheckoutFlow />
        <div className={styles.content}>
          {/* 左邊商品列 */}
          <div className={styles.list}>
            <h4>商品清單 </h4>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                {/* 替換為實際商品圖片 */}
                <Image
                  src={order.image}
                  alt="Product"
                  className={styles.image}
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{order.title}</div>
                <div className={styles.sizeColor}>
                  <span className={styles.size}>尺寸: {order.size}</span>
                  <span className={styles.color}>顏色: {order.color}</span>
                </div>
                <div className={styles.quantityPrice}>
                  <span className={styles.quantity}>
                    數量: {order.quantity}
                  </span>
                  <span className={styles.price}>單價: NT${order.price}</span>
                </div>
                <div className={styles.subtotal}>總價: NT${order.total}</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                {/* 替換為實際商品圖片 */}
                <Image
                  src={order.image}
                  alt="Product"
                  className={styles.image}
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{order.title}</div>
                <div className={styles.sizeColor}>
                  <span className={styles.size}>尺寸: {order.size}</span>
                  <span className={styles.color}>顏色: {order.color}</span>
                </div>
                <div className={styles.quantityPrice}>
                  <span className={styles.quantity}>
                    數量: {order.quantity}
                  </span>
                  <span className={styles.price}>單價: NT${order.price}</span>
                </div>
                <div className={styles.subtotal}>總價: NT${order.total}</div>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.imageContainer}>
                {/* 替換為實際商品圖片 */}
                <Image
                  src={order.image}
                  alt="Product"
                  className={styles.image}
                  width={150}
                  height={150}
                />
              </div>
              <div className={styles.productInfo}>
                <div className={styles.productName}>{order.title}</div>
                <div className={styles.sizeColor}>
                  <span className={styles.size}>尺寸: {order.size}</span>
                  <span className={styles.color}>顏色: {order.color}</span>
                </div>
                <div className={styles.quantityPrice}>
                  <span className={styles.quantity}>
                    數量: {order.quantity}
                  </span>
                  <span className={styles.price}>單價: NT${order.price}</span>
                </div>
                <div className={styles.subtotal}>總價: NT${order.total}</div>
              </div>
            </div>
          </div>
          {/* 右邊總結列 */}
          <div className={styles.right}>
            <div className={styles['info-container']}>
              <h4>訂單資訊</h4>
              <div className={styles.info}>
                <h5>運送方式</h5>
                <p>宅配</p>
                <hr />
                <h5>運送地址</h5>
                <p>台北市信義區松高路123號</p>
                <hr />
                <h5>付款方式</h5>
                <p>信用卡</p>
                <hr />
                <h5>消費金額</h5>
                <p>NT$999.99</p>
              </div>
            </div>

            <div className={styles['btn-container']}>
              <Button1>繼續購物</Button1>
              <Button2>查看其他訂單</Button2>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
