import { useState } from 'react';
import styles from './input.module.css';
import { FaRegEyeSlash, FaRegEye } from 'react-icons/fa';

export default function InputPsd({
  isError,
  errorMessage,
  placeholder = '',
  value = '',
  onChange = () => {},
  type = 'password',
  name = '',
}) {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.inputContainer}>
      <div className={styles['input-box']}>
        <input
          name={name}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`${styles.inputField} ${isFocused ? styles.focused : ''} ${
            isError ? styles.error : ''
          }`}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <span onClick={handleShowPassword} className={styles['eye-span']}>
          {showPassword ? (
            <FaRegEye className={styles['icon']} />
          ) : (
            <FaRegEyeSlash className={styles['icon']} />
          )}
        </span>
      </div>
      <p
        className={styles.errorMessage}
        style={{ visibility: isError ? 'visible' : 'hidden' }}
      >
        {errorMessage}
      </p>
    </div>
  );
}
