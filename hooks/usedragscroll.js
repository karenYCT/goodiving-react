import { useCallback } from 'react';

export const useDragScroll = () => {
  const handleMouseDown = useCallback((e) => {
    const slider = e.currentTarget;
    let startX = e.pageX - slider.offsetLeft;
    let scrollLeft = slider.scrollLeft;
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