import { useState } from 'react';
import styles from './input.module.css';

export default function Input2({
  isError,
  placeholder = '',
  value = '',
  onChange = () => {},
  type = 'text',
  name = '',
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
    </div>
  );
}
