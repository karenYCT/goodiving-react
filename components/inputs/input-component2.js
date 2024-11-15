import { useState } from 'react';
import styles from './input-component.module.css';

export default function InputComponent2({
  inputValue = '',
  disabled = false,
  setInputValue = () => {},
  refProp,
}) {
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
        ref={refProp}
        type="text"
        className={`${styles.inputField} ${isFocused ? styles.focused : ''} ${
          disabled ? styles.disabled : ''
        }`}
        placeholder="請輸入文字"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
}
