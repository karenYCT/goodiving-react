import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import tabStyles from "@/components/tab.module.css"


export default function Tab({tabItems}) {
    

  return (
    <div>
        {/* {tabItems.map((tabItem,i)=>{
            return(
                <Link key={i} href="#" className={tabStyles['tab-link']}>{tabItem}</Link>
            )
        })} */}
        <Link href="#" className={tabStyles['active']}>全部</Link>
        <Link href="#" className={tabStyles['tab-link']}>教練</Link>
        <Link href="#" className={tabStyles['tab-link']}>氣瓶</Link>
        <Link href="#" className={tabStyles['tab-link']}>裝備</Link>
        <Link href="#" className={tabStyles['tab-link']}>課程</Link>
        <Link href="#" className={tabStyles['tab-link']}>潛點</Link>

    </div>
  )
}
