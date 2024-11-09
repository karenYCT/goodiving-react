import { useCallback, useRef } from 'react';

export const useDragScroll = () => {
  const isDown = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const scrollLeft = useRef(0);
  const scrollTop = useRef(0);

  const handleMouseDown = useCallback((e) => {
    const slider = e.currentTarget;
    isDown.current = true;
    slider.style.cursor = 'grabbing';
    
    // 記錄水平和垂直方向的起始位置
    startX.current = e.pageX - slider.offsetLeft;
    startY.current = e.pageY - slider.offsetTop;
    scrollLeft.current = slider.scrollLeft;
    scrollTop.current = slider.scrollTop;

    const handleMouseMove = (e) => {
      if (!isDown.current) return;
      e.preventDefault();
      
      // 計算水平和垂直方向的移動距離
      const x = e.pageX - slider.offsetLeft;
      const y = e.pageY - slider.offsetTop;
      const walkX = (x - startX.current) * 2; // 水平滾動速度倍數
      const walkY = (y - startY.current) * 2; // 垂直滾動速度倍數
      
      // 同時更新水平和垂直滾動位置
      slider.scrollLeft = scrollLeft.current - walkX;
      slider.scrollTop = scrollTop.current - walkY;
    };

    const handleMouseUp = () => {
      isDown.current = false;
      slider.style.cursor = 'grab';
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