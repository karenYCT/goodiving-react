import styles from './checkout-flow.module.css';

export default function CheckoutFlow({ currentStep = 1 }) {
  // 定義步驟、名稱
  const steps = [
    {
      id: 1,
      label: '1',
      name: '確認訂單資料',
    },
    {
      id: 2,
      label: '2',
      name: '選擇付款方式',
    },
    {
      id: 3,
      label: '✔',
      name: '已完成預訂！',
    },
  ];

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
