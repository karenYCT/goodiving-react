import React, { useState, useEffect } from 'react';
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
import MassageCard from '@/components/fanny/massage-card';
// import { Link } from 'react-router-dom';
import Link from 'next/link';
import Addcomment from '@/components/fanny/add-comment'
import { FaPen } from "react-icons/fa";
import { useRouter } from 'next/router';

export default function BlogDetail() {
  // Tab選項
  const tabItems = ['最新', '人氣'];
  // 透過URL的blog id
  const router = useRouter()

  const [post,setPost]=useState([])
  const [comment, setComment] = useState([]);
  
 
  const blogId = router.query.blogDetail
  console.log('eddie',blogId);

  const messageId = router.query.blogDetail;
  console.log('eddie',messageId);
  
  useEffect(()=>{
    // fetch 進資料庫撈資料
    const fetchSinglePost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/blog/${blogId}`);
        if (!response.ok) throw new Error('獲取文章資料失敗');
        const data = await response.json();

        console.log(
          '%c1. API returned regions:',
          'color: #00ff00; font-weight: bold',
          data[0]
        ); // 檢查資料

        // setRegions(data);
        setPost(()=>data[0])

      } catch (error) {
        console.error('獲取文章資料錯誤:', error);
        // setRegions([]);
        setPost([])
      }
    };
    fetchSinglePost();

    // 去抓留言
  }, [router,blogId]);




  useEffect(()=>{
    // fetch 進資料庫撈資料
    const fetchSinglePost = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/blog/${messageId}`);
        if (!response.ok) throw new Error('獲取留言資料失敗');
        const data = await response.json();

        console.log(
          '%c1. API returned regions:',
          'color: #00ff00; font-weight: bold',
          data[0]
        ); // 檢查資料

        // setRegions(data);
        setPost(()=>data[0])

      } catch (error) {
        console.error('獲取留言資料錯誤:', error);
        // setRegions([]);
        setPost([])
      }
    };
    fetchSinglePost();

    // 去抓留言
  }, [router,messageId]);

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
          <Post post={post} />
          <MassageCard comment={comment} />
          <MassageCard />
          <MassageCard />
          <Addcomment />
          <Pagination />
        </div>
      </Layout>
    </>
  );
}  