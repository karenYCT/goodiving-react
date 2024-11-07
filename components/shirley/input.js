import { useState } from 'react';
import styles from './input.module.css';

export default function InputComponent({
  isError,
  errorMessage,
  placeholder = '',
  value = '',
  onChange = () => {},
  onBlur = () => {},
  type = 'text',
  name = '',
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur(); // 當欄位 unfocus 時調用傳入的 onBlur
  };

  return (
    <div className={styles.inputContainer}>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${styles.inputField} ${isFocused ? styles.focused : ''} ${
          isError ? styles.error : ''
        }`}
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
