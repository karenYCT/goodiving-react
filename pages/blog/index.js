import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';
import styles from '@/components/fanny/layout.module.css';
import { useRouter } from 'next/router';

export default function Blog() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [categories, setCategories] = useState([]);
  // Tab選項
  const tabItems = ['最新', '人氣'];
  // 設定分類選項
  const [activeCategory, setActiveCategory] = useState();

  const fetchPosts = useCallback(async (keyword) => {
    try {
      setLoading(true);
      let url = `${process.env.NEXT_PUBLIC_API_PATH}/api/blog`;
      if (keyword && keyword.trim() !== '') {
        url += `?keyword=${encodeURIComponent(keyword)}`;
      }
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取文章資料失敗');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('獲取文章資料錯誤:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCatgories = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/category`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取部落格分類失敗');
      const data = await response.json();
      setActiveCategory(data?.[0]?.id);
      setCategories(data);
    } catch (error) {
      console.error('獲取部落格分類錯誤:', error);
    }
  }, []);

  useEffect(() => {
    fetchCatgories();
    fetchPosts();
  }, [fetchPosts, fetchCatgories]);

  useEffect(() => {
    const filteredPosts =
      activeCategory === categories?.[0]?.id
        ? posts
        : posts.filter((post) => post.id === activeCategory);
    setFilteredPosts(filteredPosts);
  }, [activeCategory, categories, posts]);

  // 處理搜尋
  const handleSearch = async (keyword) => {
    await fetchPosts(keyword);
  };

  return (
    <>
      <Navbar />
      <Search1lg search={handleSearch} />

      <Layout>
        <LeftSide>
          {/* <MemberSidebar /> */}

          {/* 分類按鈕 */}
          {/* 分類按鈕 */}
          <div className={styles.categoryContainer}>
            {categories?.length > 0 &&
              categories?.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(category.id)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && setActiveCategory(category.id)
                  }
                  className={styles.categoryButton}
                  aria-label={`選擇${category.name}分類`}
                  type="button"
                  style={{
                    color: activeCategory === category.id ? 'white' : 'gray',
                    cursor: 'pointer',
                    padding: '10px',
                    fontWeight:
                      activeCategory === category.id ? 'bold' : 'normal',
                    backgroundColor:
                      activeCategory === category.id
                        ? '#023e8a'
                        : 'transparent',
                    border: 'none',
                    width: '100%',
                    textAlign: 'left',
                    borderRadius: '5px',
                    marginBottom: '5px',
                  }}
                >
                  {category.name}
                </button>
              ))}
          </div>

          <br />
          <Link href="/blog/postmodal">
            <Button>新增文章</Button>
          </Link>
        </LeftSide>
        <div className={styles.main}>
          {/* 文章卡片 */}
          {filteredPosts.map((post) => (
            <button
              onClick={() => router.push(`/blog/${post.id}`)}
              key={post.id}
              className={styles.cardButton}
              style={{
                cursor: 'pointer',
                width: '100%',
                padding: 0,
                border: 'none',
                background: 'none',
                textAlign: 'left',
              }}
            >
              <Card post={post} />
            </button>
          ))}
          <Pagination />
        </div>
      </Layout>
    </>
  );
}
