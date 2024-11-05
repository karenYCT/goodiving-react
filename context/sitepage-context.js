import { createContext, useState, useContext, useCallback } from 'react';

const SitepageContext = createContext(null);

export const useSitepageModal = () => {
  const context = useContext(SitepageContext);
  if (!context) {
    throw new Error('請在SitepageModalProvider內部使用');
  }
  return context;
};

//2.provider組件
export function SitepageModalProvider({ children }) {
  //定義狀態（是否開啟，當前選中的景點數據，相關景點）
  const [sitepageModal, setSitepageModal] = useState({
    isOpen: false,
    data: null,
    currentSites: [],
  });

  //3.要共享的東西
  const value = {
    sitepageModal,
    //打開SitepageModal
    openSitepageModal: (data, currentSites) => {
      if (!data) return;

      setSitepageModal({
        isOpen: true,
        data: data,
        currentSites: Array.isArray(currentSites) ? currentSites : [],
      });
    },

    //關閉SitepageModal
    closeSitepageModal: useCallback(() => {
      setSitepageModal({
        isOpen: false,
        data: null,
        currentSites: [],
      });
    }, []),
  };

  return (
    <SitepageContext.Provider value={value}>
      {children}
    </SitepageContext.Provider>
  );
}
