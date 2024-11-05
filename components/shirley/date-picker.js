// DatePicker.js
import React, { useState, useEffect, useRef, useMemo } from 'react';
import styles from './date-picker.module.css';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaRegCalendar,
} from 'react-icons/fa';
import PropTypes from 'prop-types';

export default function DatePicker({
  value = null,
  onChange = () => {},
  isError = false,
  errorMessage = '',
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const pickerRef = useRef(null);

  const weekdays = ['一', '二', '三', '四', '五', '六', '日'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
    const prevMonthDays = new Date(year, month, 0).getDate();

    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    const totalCurrentDays = days.length;
    const needsSixRows = Math.ceil(totalCurrentDays / 7) > 5;
    const totalCells = needsSixRows ? 42 : 35;

    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (prevMonth >= firstDayOfCurrentMonth) {
      setCurrentMonth(new Date(prevMonth));
    }
  };

  const handleNextMonth = () => {
    const today = new Date();
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );

    if (nextMonth <= maxDate) {
      setCurrentMonth(new Date(nextMonth));
    }
  };

  const handleDateSelect = (value) => {
    onChange(value);
    setShowPicker(false);
  };

  const formatDate = (date) => {
    if (!date) return '選擇日期';
    return date.toLocaleDateString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handleButtonClick = () => {
    if (!showPicker) {
      setCurrentMonth(value ? new Date(value) : new Date());
    }
    setShowPicker(!showPicker);
  };

  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  return (
    <div className={styles.container} ref={pickerRef}>
      <button
        type="button"
        className={`${styles.button} ${showPicker ? styles.open : ''} ${
          isError ? styles.error : ''
        }`}
        onClick={handleButtonClick}
        aria-haspopup="dialog"
        aria-expanded={showPicker}
      >
        <FaRegCalendar className={styles.iconLeft} aria-hidden="true" />
        <span className={styles.buttonText}>{formatDate(value)}</span>
        <FaAngleDown className={styles.iconRight} aria-hidden="true" />
      </button>
      <p className={styles.errorMessage}>{errorMessage}</p>

      {showPicker && (
        <div
          className={styles.picker}
          role="dialog"
          aria-modal="true"
          aria-labelledby="datepicker-header"
        >
          <div className={styles.header} id="datepicker-header">
            <button
              type="button"
              className={styles.arrow}
              onClick={handlePrevMonth}
              disabled={false} // 依需求設定
              aria-label="上一個月"
            >
              <FaAngleLeft size={20} />
            </button>
            <span>
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </span>
            <button
              type="button"
              className={styles.arrow}
              onClick={handleNextMonth}
              disabled={false} // 依需求設定
              aria-label="下一個月"
            >
              <FaAngleRight size={20} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {weekdays.map((day) => (
              <div key={day} className={styles.weekday}>
                {day}
              </div>
            ))}
          </div>

          <div className={styles.dates}>
            {days.map((dayObj, index) => {
              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.date} ${
                    !dayObj.isCurrentMonth ? styles.disabled : ''
                  }`}
                  onClick={() => handleDateSelect(dayObj.date)}
                  disabled={!dayObj.isCurrentMonth}
                >
                  {dayObj.date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
