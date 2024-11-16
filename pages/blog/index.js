import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
// import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';
import styles from '@/components/fanny/layout.module.css';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth-context';

export default function Blog() {
  const router = useRouter();
  const limit = 10;
  const { auth, getAuthHeader } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const tabItems = ['最新', '人氣'];
  const [activeCategory, setActiveCategory] = useState();

  const fetchPosts = useCallback(
    async (keyword) => {
      try {
        setLoading(true);
        let url = `${process.env.NEXT_PUBLIC_API_PATH}/api/blog`;
        if (keyword && keyword.trim() !== '') {
          url += `?keyword=${encodeURIComponent(keyword)}`;
        }
        const response = await fetch(url, {
          headers: getAuthHeader ? await getAuthHeader() : {},
        });
        if (!response.ok) throw new Error('獲取文章資料失敗');
        const data = await response.json();
        // 假設總共多少筆 43
        // 一頁希望幾筆 10
        // total page 43/10
        // const totalPages = Math.ceil(43 / 10);
        setPosts(data);
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / limit));
      } catch (error) {
        console.error('獲取文章資料錯誤:', error);
      } finally {
        setLoading(false);
      }
    },
    [getAuthHeader, setCurrentPage, setTotalPages]
  );

  const fetchCategories = useCallback(async () => {
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
    fetchCategories();
    fetchPosts();
  }, [fetchPosts, fetchCategories]);

  useEffect(() => {
    if (posts.length > 0) {
      // 確保 posts 有資料
      const filtered =
        activeCategory === categories?.[0]?.id
          ? posts
          : posts.filter((post) => post.bc_id === activeCategory); // 修改為 bc_id
      setFilteredPosts(filtered);
      setCurrentPage(1);
      setTotalPages(Math.ceil(filtered.length / limit));
    } else {
      setFilteredPosts([]); // 如果沒有文章，設為空陣列
    }
  }, [activeCategory, categories, posts]);

  const handleSearch = async (keyword) => {
    await fetchPosts(keyword);
  };

  return (
    <>
      {/* <Navbar /> */}

      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Search1lg search={handleSearch} />
          <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
            <LeftSide>
              <div className={styles.categoryContainer}>
                {categories?.length > 0 &&
                  categories?.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      onKeyDown={(e) =>
                        e.key === 'Enter' && setActiveCategory(category.id)
                      }
                      className={styles.categoryButton}
                      aria-label={`選擇${category.name}分類`}
                      type="button"
                      style={{
                        color:
                          activeCategory === category.id ? 'white' : 'gray',
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
              {loading ? (
                <div className="text-center py-4">載入中...</div>
              ) : filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts
                  // 1 -> 0 10
                  // 2 -> 10 20
                  // 3 -> (3-1) * 10(limit) = 20 , 3 *10 => 30  =>>> 20, 30
                  .slice((currentPage - 1) * limit, currentPage * limit) // 只顯示當前頁面的資料
                  .map((post) => (
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
                  ))
              ) : (
                <div className="text-center py-4">沒有找到相關文章</div>
              )}
              {/* props 是什麼, state 又是什麼 */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(pageNum) => {
                  setCurrentPage(pageNum);
                }}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
