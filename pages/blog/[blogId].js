import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import styles from '@/components/fanny/layout.module.css';
import Navbar from '@/components/layouts/navbar';
import toast from 'react-hot-toast'; // 引入 react-hot-toast
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';
import Post from '@/components/fanny/post';
import CommentCard from '@/components/fanny/comment-card';
import Link from 'next/link';
import Addcomment from '@/components/fanny/add-comment';
import { useRouter } from 'next/router';

export default function BlogDetail() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState();
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const blogId = router.query.blogId;

  // 獲取分類列表
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/category`
      );
      if (!response.ok) throw new Error('獲取分類失敗');
      const data = await response.json();
      setCategories(data);
      setActiveCategory(data[0]?.id); // 設定預設分類
    } catch (error) {
      console.error('獲取分類錯誤:', error);
      toast.error('獲取分類失敗'); // 顯示錯誤提示
    }
  }, []);

  // 獲取單一文章
  const fetchSinglePost = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/${blogId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取文章資料失敗');
      const data = await response.json();
      setPost(data[0]);
    } catch (error) {
      console.error('獲取文章資料錯誤:', error);
      toast.error('獲取文章資料失敗'); // 顯示錯誤提示
    }
  }, [blogId]);

  // 獲取評論
  const fetchComments = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/comment/blog/${blogId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取回覆失敗');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('獲取回覆錯誤:', error);
      toast.error('獲取回覆失敗'); // 顯示錯誤提示
    }
  }, [blogId]);

  // 初始化載入分類
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 載入文章和評論
  useEffect(() => {
    if (blogId) {
      fetchSinglePost();
      fetchComments();
    }
  }, [blogId, fetchSinglePost, fetchComments]);

  // 處理新增評論
  const handleComment = async (comment) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/comment/blog/${blogId}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
        }),
      });
      if (!response.ok) throw new Error('新增回覆失敗');
      const data = await response.json();
      setComments((prev) => [data, ...prev]);
      toast.success('回覆成功！'); // 顯示成功提示
    } catch (error) {
      console.error('新增回覆錯誤:', error);
      toast.error('新增回覆失敗'); // 顯示錯誤提示
    }
  };

  // 處理分類點擊
  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    router.push('/blog'); // 回到文章列表頁
  };

  return (
    <>
      <Navbar />
      <Search1lg />
      <Layout>
        <LeftSide>
          <div className={styles.categoryContainer}>
            {categories?.length > 0 &&
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  onKeyDown={(e) =>
                    e.key === 'Enter' && handleCategoryClick(category.id)
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
          {post && <Post post={post} />}
          {comments?.length > 0 &&
            comments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          <Addcomment sendComment={handleComment} />
        </div>
      </Layout>
    </>
  );
}
