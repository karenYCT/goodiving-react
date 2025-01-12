import Layout from '@/components/layouts/layout'
import LeftSide from '@/components/layouts/leftSide'
import MemberSidebar from '@/components/shirley/memberSidebar'
import Tab from '@/components/tab'
import React, { useState, useEffect } from 'react'
import styles from "/components/Layout.module.css"
import tabStyles from "/components/tab.module.css"

export default function Home({ children }) {
  // 選單列表
  const memberLists = ["我的帳戶", "會員資料", "點數紀錄", "訂單記錄", "預定課程", "發布文章", "收藏清單", "詢問紀錄"]
  // Tab選項
  const tabItems = ["更新個人資訊", "更新密碼"]

  return (
    <>
        <h2> 這裡是 pages / index.js </h2>
        <p>子璇：side bar、分頁 tab、input</p>
        <Layout>
          <LeftSide>
            <MemberSidebar memberLists={memberLists} />
          </LeftSide>
          <div className={styles.main}>
            <Tab tabItems={tabItems}  />
            <h1>會員中心</h1>
            <p>我們要從本質思考，從根本解決問題。由於，布寧曾經提到過，自由是一種教義，一種公理。希望大家能發現話中之話。世界需要改革，需要對王建明有新的認知。王建明的出現，必將帶領人類走向更高的巔峰。領悟其中的道理也不是那麼的困難。我們都很清楚，這是個嚴謹的議題。不要先入為主覺得王建明很複雜，實際上，王建明可能比你想的還要更複雜。卡耐基曾講過，如果我們想交朋友，就要先為別人做些事——那些需要花時間、體力、體貼、奉獻才能做到的事。這段話令我陷入了沈思。赫爾岑說過一句經典的名言，科學不是可以不勞而獲的誠然，在科學上除了汗流滿面是沒有其他獲得的方法的。</p>
          </div>
        </Layout>
    </>
  )
}
