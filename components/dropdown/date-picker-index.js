// DatePicker.js
import React, { useState, useEffect, useRef } from 'react';
import styles from './date-picker-index.module.css';
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDown,
  FaRegCalendar,
} from 'react-icons/fa';

export default function DatePickerIndex({
  selectedDate = '',
  setSelectedDate = () => {},
}) {
  const [showPicker, setShowPicker] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
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
    const nextMonth = new Date(
      currentMonth.setMonth(currentMonth.getMonth() + 1)
    );
    const maxDate = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );
    if (nextMonth <= maxDate) {
      setCurrentMonth(new Date(nextMonth));
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
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
      setCurrentMonth(selectedDate ? new Date(selectedDate) : new Date());
    }
    setShowPicker(!showPicker);
  };

  return (
    <div className={styles.container} ref={pickerRef}>
      <button
        className={`${styles.button} ${showPicker ? styles.open : ''}`}
        onClick={handleButtonClick}
      >
        <FaRegCalendar className={styles.iconLeft} />
        <span className={styles.buttonText}>{formatDate(selectedDate)}</span>
        <FaAngleDown className={styles.iconRight} />
      </button>

      {showPicker && (
        <div className={styles.picker}>
          <div className={styles.header}>
            <button
              className={styles.arrow}
              onClick={handlePrevMonth}
              disabled={isPrevMonthDisabled()}
            >
              <FaAngleLeft size={20} />
            </button>
            <span>
              {currentMonth.getFullYear()}年{currentMonth.getMonth() + 1}月
            </span>
            <button
              className={styles.arrow}
              onClick={handleNextMonth}
              disabled={isNextMonthDisabled()}
            >
              <FaAngleRight size={20} />
            </button>
          </div>

          <div className={styles.weekdays}>
            {weekdays.map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          <div className={styles.dates}>
            {getDaysInMonth(currentMonth).map((dayObj, index) => {
              const isDisabled = isDateDisabled(dayObj.date);
              const isSelected =
                selectedDate &&
                dayObj.date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={index}
                  className={`${styles.date} 
                    ${!dayObj.isCurrentMonth ? styles.disabled : ''}
                    ${isSelected ? styles.selected : ''}
                  `}
                  onClick={() => handleDateSelect(dayObj.date)}
                  disabled={isDisabled || !dayObj.isCurrentMonth}
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
