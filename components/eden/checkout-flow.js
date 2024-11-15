// components/Progress.js
import { useRouter } from 'next/router';
import styles from './checkout-flow.module.css';

const steps = [
  { path: '/cart', label: '確認訂單' },
  { path: '/cart/checkout', label: '結帳' },
  { path: '/cart/complete', label: '完成' },
];

export default function CheckoutFlow() {
  const router = useRouter();

  // 定義步驟、名稱和路由對應
  const steps = [
    { id: 1, label: '1', name: '確認訂單資料', route: '/cart' },
    { id: 2, label: '2', name: '選擇付款方式', route: '/cart/checkout' },
    { id: 3, label: '✔', name: '已完成訂購！', route: '/cart/complete' },
  ];

  // 根據當前路由來確定當前步驟
  const getCurrentStep = () => {
    const currentRoute = router.pathname;
    if (currentRoute === '/cart/complete') return 3;
    if (currentRoute === '/cart/checkout') return 2;
    return 1;
  };

  const currentStep = getCurrentStep();

  return (
    <div className={styles.container}>
      {steps.map((step, index) => (
        <div key={step.id} className={styles.stepLineWrapper}>
          {/* 節點及描述 */}
          <div className={styles.stepWithLabel}>
            {/* 節點 */}
            <div
              className={`${styles.step} ${
                currentStep >= step.id ? styles.active : ''
              }`}
            >
              {step.label}
            </div>
            {/* 節點描述 */}
            <div className={styles.stepLabel}>{step.name}</div>
          </div>

          {/* 如果不是最後一個節點，顯示連接線 */}
          {index < steps.length - 1 && (
            <div
              className={`${styles.line} ${
                currentStep > step.id ? styles.lineActive : ''
              }`}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
}
