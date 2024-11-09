import { useState } from 'react';
import styles from './input-component.module.css';

export default function InputComponent({
  name = '',
  type = 'text',
  value = '',
  onChange = () => {},
  isError = false,
  errorMessage = '',
  disabled = false,
  placeholder="請輸入文字"
}) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        namd={name}
        className={`${styles.inputField} ${isFocused ? styles.focused : ''} ${
          isError ? styles.error : ''
        } ${disabled ? styles.disabled : ''}`}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        onChange={handleChange}
        disabled={disabled}
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
