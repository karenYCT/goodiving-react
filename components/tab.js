import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import tabStyles from "/components/tab.module.css"


export default function Tab({tabItems}) {
    

  return (
    <div>
        {/* {tabItems.map((tabItem,i)=>{
            return(
                <Link key={i} href="#" className={tabStyles['tab-link']}>{tabItem}</Link>
            )
        })} */}
        <Link href="#" className={tabStyles['active']}>更新密碼</Link>
        <Link href="#" className={tabStyles['tab-link']}>更新個人資訊</Link>

    </div>
  )
}
