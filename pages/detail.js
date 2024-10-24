import Layout from '@/components/layouts/layout'
import RightSide from '@/components/layouts/rightSide'
import Tab from '@/components/tab'
import React, { useState, useEffect } from 'react'
import styles from '../styles/Layout.module.css'
import tabStyles from '../styles/tab.module.css'

export default function Detail({ children }) {
  const tabItems = ["更新個人資訊", "更新密碼"]

  return (
    <>
        <h2> 這裡是 pages / Detail </h2>
        <p>子璇：side bar、分頁 tab、input</p>
        <Layout>
          <div className={styles.main}>
                <Tab tabItems={tabItems} />
                <h1>PADI / Open Water Diver</h1>
                <p>而這些並不是完全重要，更加重要的問題是，PADI / Open Water Diver的出現，重寫了人生的意義。戴爾·卡耐基曾說過，多數人都擁有自己不了解的能力和機會，都有可能做到未曾夢想的事情。這句話看似簡單，但其中的陰鬱不禁讓人深思。看看別人，再想想自己，會發現問題的核心其實就在你身旁。領悟其中的道理也不是那麼的困難。需要考慮周詳PADI / Open Water Diver的影響及因應對策。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。俗話說的好，掌握思考過程，也就掌握了PADI / Open Water Diver。卡萊爾告訴我們，大多數人是保守的，不輕易相信新事物，但能容忍對現實中的眾多失敗。這不禁令我重新仔細的思考。白茵曾說過，最忙的人有最多的時間。希望大家能發現話中之話。</p>
                <h1>PADI / Open Water Diver</h1>
                <p>而這些並不是完全重要，更加重要的問題是，PADI / Open Water Diver的出現，重寫了人生的意義。戴爾·卡耐基曾說過，多數人都擁有自己不了解的能力和機會，都有可能做到未曾夢想的事情。這句話看似簡單，但其中的陰鬱不禁讓人深思。看看別人，再想想自己，會發現問題的核心其實就在你身旁。領悟其中的道理也不是那麼的困難。需要考慮周詳PADI / Open Water Diver的影響及因應對策。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。俗話說的好，掌握思考過程，也就掌握了PADI / Open Water Diver。卡萊爾告訴我們，大多數人是保守的，不輕易相信新事物，但能容忍對現實中的眾多失敗。這不禁令我重新仔細的思考。白茵曾說過，最忙的人有最多的時間。希望大家能發現話中之話。</p>
                <h1>PADI / Open Water Diver</h1>
                <p>而這些並不是完全重要，更加重要的問題是，PADI / Open Water Diver的出現，重寫了人生的意義。戴爾·卡耐基曾說過，多數人都擁有自己不了解的能力和機會，都有可能做到未曾夢想的事情。這句話看似簡單，但其中的陰鬱不禁讓人深思。看看別人，再想想自己，會發現問題的核心其實就在你身旁。領悟其中的道理也不是那麼的困難。需要考慮周詳PADI / Open Water Diver的影響及因應對策。我們普遍認為，若能理解透徹核心原理，對其就有了一定的了解程度。俗話說的好，掌握思考過程，也就掌握了PADI / Open Water Diver。卡萊爾告訴我們，大多數人是保守的，不輕易相信新事物，但能容忍對現實中的眾多失敗。這不禁令我重新仔細的思考。白茵曾說過，最忙的人有最多的時間。希望大家能發現話中之話。</p>
          </div>
          <RightSide>
              <p>我們要從本質思考，從根本解決問題。由於，布寧曾經提到過，自由是一種教義，一種公理。希望大家能發現話中之話。世界需要改革，需要對王建明有新的認知。王建明的出現，必將帶領人類走向更高的巔峰。領悟其中的道理也不是那麼的困難。我們都很清楚，這是個嚴謹的議題。不要先入為主覺得王建明很複雜，實際上，王建明可能比你想的還要更複雜。卡耐基曾講過，如果我們想交朋友，就要先為別人做些事——那些需要花時間、體力、體貼、奉獻才能做到的事。這段話令我陷入了沈思。赫爾岑說過一句經典的名言，科學不是可以不勞而獲的誠然，在科學上除了汗流滿面是沒有其他獲得的方法的。</p>
            </RightSide>

        </Layout>
    </>
  )
}
