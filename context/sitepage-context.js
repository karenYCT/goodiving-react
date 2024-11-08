import { createContext, useState, useContext, useCallback } from 'react';

const SitepageContext = createContext(null);

export const useSitepageModal = () => {
  const context = useContext(SitepageContext);
  if (!context) {
    throw new Error('請在SitepageModalProvider內部使用');
  }
  return context;
};

export function SitepageModalProvider({ children }) {
  const [sitepageModal, setSitepageModal] = useState({
    isOpen: false,
    data: null,
    currentSites: [],
    lastScrollPosition: 0, // 儲存滾動位置
  });

  const openSitepageModal = useCallback(async (data, currentSites) => {
    // 儲存當前滾動位置
    const scrollPosition = window.scrollY;

    setSitepageModal({
      isOpen: true,
      data,
      currentSites: Array.isArray(currentSites) ? currentSites : [],
      lastScrollPosition: scrollPosition,
    });
  }, []);

  const closeSitepageModal = useCallback(() => {
    setSitepageModal((prev) => {
      // 恢復之前的滾動位置
      window.scrollTo(0, prev.lastScrollPosition);

      return {
        isOpen: false,
        data: null,
        currentSites: [],
        lastScrollPosition: 0,
      };
    });
  }, []);

  return (
    <SitepageContext.Provider
      value={{
        sitepageModal,
        openSitepageModal,
        closeSitepageModal,
      }}
    >
      {children}
    </SitepageContext.Provider>
  );
}
