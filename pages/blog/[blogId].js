import React, { useCallback, useEffect, useState } from 'react';
import Layout from '@/components/fanny/layout';
import LeftSide from '@/components/fanny/leftSide';
import Tab from '@/components/fanny/tab';
import styles from '@/components/fanny/layout.module.css';
import Navbar from '@/components/layouts/navbar';
import Card from '@/components/fanny/card';
import Search1lg from '@/components/fanny/search-1-lg';
import MemberSidebar from '@/components/fanny/memberSidebar';
import Pagination from '@/components/fanny/pagination';
import Button from '@/components/fanny/btn-fill-primary';
import Post from '@/components/fanny/post';
import CommentCard from '@/components/fanny/comment-card';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import Addcomment from '@/components/fanny/add-comment';
import { FaPen } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function BlogDetail() {
  // Tab選項
  const tabItems = ['最新', '人氣'];
  // 透過URL的blog id
  const router = useRouter();

  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const blogId = router.query.blogId;

  const fetchComments = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/comment/blog/${blogId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取回覆失敗');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('獲取回覆錯誤:', error);
    }
  }, [blogId]);

  const fetchSinglePost = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_PATH}/api/blog/${blogId}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('獲取文章資料失敗');
      const data = await response.json();
      setPost(() => data[0]);
    } catch (error) {
      console.error('獲取文章資料錯誤:', error);
    }
  }, [blogId]);

  useEffect(() => {
    if (blogId) {
      fetchSinglePost();
      fetchComments();
    }
  }, [blogId, fetchSinglePost, fetchComments]);

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
    } catch (error) {
      console.error('新增回覆錯誤:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Search1lg />
      <Layout>
        <LeftSide>
          <MemberSidebar />
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
          <Pagination />
        </div>
      </Layout>
    </>
  );
}
