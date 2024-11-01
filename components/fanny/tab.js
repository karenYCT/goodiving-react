import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import tabStyles from "@/components/tab.module.css"
import { title } from 'process';


export default function Tab({tabItems}) {
  const PostList = () => {
    const [activeTab, setActiveTab] = useState('popular');

    const popularPosts = [
      { id:1, title: '熱門文章1' },
    ];

    const newPosts = [
      { id:1, title: '最新文章1'},
    ];

    const renderPosts = () => {
      const posts = activeTab === 'popular' ? popularPosts: newPosts;
      return posts.map((post) => <li key={post.id}>{post.title}</li>);

    };
  }

  return (
    <div>
        {/* {tabItems.map((tabItem,i)=>{
            return(
                <Link key={i} href="#" className={tabStyles['tab-link']}>{tabItem}</Link>
            )
        })} */}
        <Link href="#" className={tabStyles['active']}>最新</Link>
        <Link href="#" className={tabStyles['tab-link']}>人氣</Link>

    </div>
  )
}
