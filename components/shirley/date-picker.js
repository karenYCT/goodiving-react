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
  value = null, // 使用 Date 對象或 null
  onChange = () => {},
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
    // 調整第一天是週一
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // 填充上個月的日期
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = adjustedFirstDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // 填充當前月份的日期
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 計算是否需要6行
    const totalCurrentDays = days.length; // 前月填充 + 當月天數
    const needsSixRows = Math.ceil(totalCurrentDays / 7) > 5;
    const totalCells = needsSixRows ? 42 : 35; // 根據需要使用6行或5行

    // 填充下個月的日期
    const remainingDays = totalCells - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return days;
  };

  const isSameOrAfterMonth = (date1, date2) => {
    // 將日期轉換為 YYYYMM 格式以便比較
    const format = (date) => date.getFullYear() * 100 + date.getMonth();
    return format(date1) >= format(date2);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    const today = new Date();
    // 將今天的日期設為當月1號，只比較年月
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (isSameOrAfterMonth(prevMonth, firstDayOfCurrentMonth)) {
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
    onChange(value); // 使用 onChange 來更新父元件的狀態
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

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isPrevMonthDisabled = () => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    return !isSameOrAfterMonth(prevMonth, firstDayOfCurrentMonth);
  };

  const isNextMonthDisabled = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 6, 1);
    return currentMonth >= maxDate;
  };

  const handleButtonClick = () => {
    // 如果要開啟選擇器，設置正確的當前月份
    if (!showPicker) {
      setCurrentMonth(value ? new Date(value) : new Date());
    }
    setShowPicker(!showPicker);
  };

  // 使用 useMemo 優化日期計算
  const days = useMemo(() => getDaysInMonth(currentMonth), [currentMonth]);

  return (
    <div className={styles.container} ref={pickerRef}>
      <button
        type="button"
        className={`${styles.button} ${showPicker ? styles.open : ''}`}
        onClick={handleButtonClick}
        aria-haspopup="dialog"
        aria-expanded={showPicker}
      >
        <FaRegCalendar className={styles.iconLeft} aria-hidden="true" />
        <span className={styles.buttonText}>{formatDate(value)}</span>
        <FaAngleDown className={styles.iconRight} aria-hidden="true" />
      </button>

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
              disabled={isPrevMonthDisabled()}
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
              disabled={isNextMonthDisabled()}
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
              const isDisabled = isDateDisabled(dayObj.date);
              const isSelected =
                value &&
                dayObj.date.toDateString() === value.toDateString();

              return (
                <button
                  key={index}
                  type="button"
                  className={`${styles.date} 
                    ${!dayObj.isCurrentMonth ? styles.disabled : ''}
                    ${isSelected ? styles.selected : ''}
                  `}
                  onClick={() => handleDateSelect(dayObj.date)}
                  disabled={isDisabled || !dayObj.isCurrentMonth}
                  aria-pressed={isSelected}
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
};
