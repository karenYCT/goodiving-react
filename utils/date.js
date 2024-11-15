import dayjs from 'dayjs';

// 顯示用的日期格式化
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  return dayjs(dateString).format('YYYY-MM-DD');
};

// 提交到後端用的日期格式化
export const formatDateForSubmit = (date) => {
  if (!date) return null;
  return dayjs(date).format('YYYY-MM-DD');
};

// 解析日期字串為 Date 物件 (用於 DatePicker 等需要 Date 物件的場合)
export const parseDateString = (dateString) => {
  if (!dateString) return null;
  return dayjs(dateString).toDate();
};