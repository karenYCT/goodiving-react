import { useCallback } from 'react';

export const useDragScroll = () => {
  const handleMouseDown = useCallback((e) => {
    // 1. 獲取當前被點擊的元素（滾動容器）
    const slider = e.currentTarget;
    // 2. 計算點擊的起始位置
    let startX = e.pageX - slider.offsetLeft;
    // 3. 記錄容器當前的滾動位置
    let scrollLeft = slider.scrollLeft;
    // 4. 設置拖曳狀態
    let isDown = true;

    

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // 滾動速度倍數
      slider.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
      isDown = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);
  }, []);

  return { onMouseDown: handleMouseDown };
};


/* 共享的拖曳容器樣式 */
// .dragScroll {
//   cursor: grab;
//   user-select: none;
//   scrollbar-width: none;  /* Firefox */
//   -ms-overflow-style: none;  /* IE and Edge */
// }

// .dragScroll::-webkit-scrollbar {
//   display: none;
// }

// .dragScroll:active {
//   cursor: grabbing;
// }

/* 原有的容器樣式加上橫向滾動 */