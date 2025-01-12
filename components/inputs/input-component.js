import { useState } from 'react';
import styles from './input-component.module.css';

export default function InputComponent({ isError, errorMessage }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        className={`${styles.inputField} ${isFocused ? styles.focused : ''} ${
          isError ? styles.error : ''
        }`}
        placeholder="請輸入文字"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <p
        className={styles.errorMessage}
        style={{ visibility: isError ? 'visible' : 'hidden' }}
      >
        {errorMessage}
      </p>
    </div>
  );
}
