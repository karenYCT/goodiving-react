import { useState, useEffect } from 'react';
import styles from './index.module.css';
import { FaTh, FaList } from 'react-icons/fa';
import Card1 from '@/components/eden/card1';
import Card2 from '@/components/eden/card2';
import SelectRect from '@/components/dropdown/select-rect';
import Searchsm from '@/components/search/search-sm';
import Layout from '@/components/layouts/layout';
import { useRouter } from 'next/router';

// todo: query string的值沒有帶到input欄裡
export default function List() {
  const [displayCard, setDisplayCard] = useState('card');
  const [sortBy, setSortBy] = useState('最新商品');
  const [searchValue, setSearchValue] = useState('');
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const router = useRouter();
  const { cate, sort, keyword } = router.query;

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

  const onClick = () => {
    console.log('送出搜尋');
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products?cate=${cate || ''}
        &sort=${sort || ''}
        &minPrice=${minPrice || ''}
        &maxPrice=${maxPrice || ''}
        &keyword=${keyword || ''}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('獲取商品資料失敗:', error);
    }
  };

  // 初次加載資料，且隨著路由變化，重新獲取資料
  useEffect(() => {
    fetchProducts();
  }, [cate, sort, minPrice, maxPrice, keyword]);

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

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h4>商品搜尋</h4>
          <Searchsm
            inputValue={searchValue}
            setInputValue={setSearchValue}
            onClick={onClick}
          />
          <h4>商品類型</h4>
          <div className={styles['category-list']}>
            {categoryList.map((category) => (
              <button
                key={category.id}
                className={styles['category-item']}
                onClick={() => updateQueryString({ cate: category.id })}
              >
                {category.name}
              </button>
            ))}
          </div>
          <h4>排序</h4>
          <SelectRect
            options={sortByOptions}
            onChange={setSortBy}
            option={sortBy}
            updateQueryString={updateQueryString}
          />
          <h4>價格搜尋</h4>
          <input
            type="text"
            placeholder="最小金額"
            value={minPrice}
            className={`${styles.input} ${styles['price-range']}`}
            onChange={(e) => {
              setMinPrice(e.target.value);
              updateQueryString({ minPrice: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="最大金額"
            value={maxPrice}
            className={`${styles.input} ${styles['price-range']}`}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              updateQueryString({ maxPrice: e.target.value });
            }}
          />
        </div>

        <div className={styles.list}>
          <div className={styles['header-container']}>
            {searchValue !== '' && (
              <h4>正在搜尋的結果： &quot;{searchValue}&quot;</h4>
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
