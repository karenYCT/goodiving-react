import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { FaTh, FaList, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import Card1 from '@/components/eden/card1';
import Card2 from '@/components/eden/card2';
import SelectRect2 from '@/components/dropdown/select-rect2';
import Searchsm from '@/components/search/search-sm';
import Layout from '@/components/layouts/layout';
import { useRouter } from 'next/router';

export default function List() {
  const router = useRouter();
  const [displayCard, setDisplayCard] = useState('card');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    cate: '',
    sort: '',
    keyword: '',
    minPrice: '',
    maxPrice: '',
  });
  const [products, setProducts] = useState([]);

  const categoryList = [
    { id: '1', name: '面鏡' },
    { id: '2', name: '防寒衣' },
    { id: '3', name: '蛙鞋' },
    { id: '4', name: '套鞋' },
    { id: '5', name: '調節器' },
    { id: '6', name: '潛水配件' },
  ];

  const sortByOptions = [
    { value: 'time_asc', label: '最新商品' },
    { value: 'price_asc', label: '價格從低到高' },
    { value: 'price_desc', label: '價格從高到低' },
  ];

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products?cate=${router.query.cate || ''}&sort=${
          router.query.sort || ''
        }&minPrice=${router.query.minPrice || ''}&maxPrice=${
          router.query.maxPrice || ''
        }&keyword=${router.query.keyword || ''}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('獲取商品資料失敗:', error);
    }
  };

  const updateQueryString = (newQuery) => {
    // 合併當前的 query 和新的 query
    const updatedQuery = { ...router.query, ...newQuery };

    // 過濾掉空值的參數
    Object.keys(updatedQuery).forEach((key) => {
      if (updatedQuery[key] === '') {
        delete updatedQuery[key];
      }
    });
    // 更新 URL
    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { scroll: false }
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    updateQueryString({ [name]: value });
  };

  useEffect(() => {
    if (router.isReady) {
      const { cate, sort, keyword, minPrice, maxPrice } = router.query;
      const newFilters = {
        cate: cate || '',
        sort: sort || '',
        keyword: keyword || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      };
      setFilters(newFilters);
      fetchProducts(); // 當 query 變化時呼叫 fetchProducts
    }
  }, [router.query, router.isReady]); // 監聽 query 和 isReady 的變化

  // 檢查螢幕寬度
  useEffect(() => {
    // 定義檢查螢幕寬度的函數
    const handleResize = () => {
      if (window.matchMedia('(max-width: 576px)').matches) {
        setDisplayCard('row');
      } else {
        setDisplayCard('card');
      }
    };

    // 初次加載時檢查一次
    handleResize();

    // 綁定 resize 事件
    window.addEventListener('resize', handleResize);

    // 清理事件
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSidebarClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <Layout>
      <div className={styles.container}>
        <button
          className={`${styles.toggleButton} ${
            isSidebarOpen ? styles.open : ''
          }`}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
        </button>

        <div
          className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}
          onClick={handleSidebarClick}
          role="presentation"
        >
          <h4 className={styles['search-title']}>
            商品搜尋
            {Object.keys(router.query).length > 0 && (
              <span
                className={styles['clear-filters']}
                role="presentation"
                onClick={() => router.push('/products')}
              >
                清除篩選
              </span>
            )}
          </h4>
          <Searchsm
            onClick={updateQueryString}
            inputValue={filters.keyword}
            setInputValue={setFilters}
          />
          <h4>商品類型</h4>
          <div className={styles['category-list']}>
            {categoryList.map((category) => (
              <button
                key={category.id}
                className={`${styles['category-item']} 
                ${filters.cate === category.id ? styles['active'] : ''}`}
                onClick={() => updateQueryString({ cate: category.id })}
              >
                {category.name}
              </button>
            ))}
          </div>
          <h4>排序</h4>
          <SelectRect2
            options={sortByOptions}
            onChange={setFilters}
            option={filters.sort}
            updateQueryString={updateQueryString}
          />
          <h4>價格搜尋</h4>
          <input
            type="text"
            placeholder="最小金額"
            name="minPrice"
            value={filters.minPrice}
            className={`${styles.input} ${styles['price-range']}`}
            onChange={handleInputChange}
          />
          <input
            type="text"
            placeholder="最大金額"
            name="maxPrice"
            value={filters.maxPrice}
            className={`${styles.input} ${styles['price-range']}`}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.list}>
          <div className={styles['header-container']}>
            {router.query.keyword !== undefined && (
              <h4>正在搜尋的結果： &quot;{router.query.keyword}&quot;</h4>
            )}
            <div className={styles['btn-container']}>
              <button onClick={() => setDisplayCard('card')}>
                <FaTh />
              </button>
              <button onClick={() => setDisplayCard('row')}>
                <FaList />
              </button>
            </div>
          </div>
          {displayCard === 'card' ? (
            <div className={styles['display-card']}>
              {products.map((product) => (
                <Card1 key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles['display-row']}>
              {products.map((product) => (
                <Card2 key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
