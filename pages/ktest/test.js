import React from 'react';
import Footer from '@/components/layouts/footer';
import Card1 from '@/components/karen/siteintrocard';
import Imgintrocard from '@/components/karen/imgintrocard';
import ImgintrocardXs from '@/components/karen/imgintrocard-xs';
import MiniTag from '@/components/tag/minitag';
import MiniTagGlass from '@/components/tag/minitag-glass';
import ImgCarousel from '@/components/karen/imgcarousel';
import Logcard from '@/components/karen/logcard';
import LogcardLG from '@/components/karen/logcard-lg';
import Logdraftcard from '@/components/karen/logdraftcard';
import Progressbar from '@/components/karen/progressbar';
import ImgCarouselsm from '@/components/karen/imgcarousel-sm';
import Search from '@/components/karen/search';
export default function Index() {
  return (
    <>

      <div>
        <Search />
      </div>
      <div>
        <ImgCarouselsm />
      </div>
      <br />
      <div>
        <Logdraftcard />
      </div>
      <br />
      <div>
        <ImgintrocardXs />
      </div>
      <br />
      <div>
        <LogcardLG
          date="2024-01-01"
          site_name="鋼鐵礁"
          log_exp="日誌內容很長要超過30字日誌內容很長要超過30字日誌內容很長要超過30字日誌內容很長要超過30字日誌內容很長要超過30字日誌內容很長要超過30字日誌內容很長要超過30字"
          bottom_time="24"
          water_temp="28"
          max_depth="30"
          likes_count="4.0"
          onClick={() => console.log('點擊卡片')}
        />
      </div>
      <br />
      <div>
        <Logcard
          date="2024-01-01"
          site_name="鋼鐵礁"
          water_temp="28"
          max_depth="30"
          likes_count="4.0"
          onClick={() => console.log('點擊卡片')}
        />
      </div>
      <br />
      <div>
        <ImgCarousel />
      </div>
      <br />
      <div>
        <Imgintrocard />
      </div>
      <br />
      <div>
        <Card1 siteId="1" onClick={() => console.log('點擊進入介紹')} />
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
        <MiniTag type="depth">20</MiniTag>
        <MiniTag type="level">簡單</MiniTag>
        <MiniTag type="loves">喜愛度</MiniTag>
        <MiniTag type="boat" />
        <MiniTag type="shore" />
        <MiniTag type="temp">16</MiniTag>
        <MiniTag type="time">28</MiniTag>
        <MiniTag type="visi">能見度</MiniTag>
      </div>
      <br />
      <hr />
      <br />
      <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
        <MiniTagGlass type="depth">20</MiniTagGlass>
        <MiniTagGlass type="level">簡單</MiniTagGlass>
        <MiniTagGlass type="loves">喜愛度</MiniTagGlass>
        <MiniTagGlass type="boat" />
        <MiniTagGlass type="shore" />
        <MiniTagGlass type="temp">16</MiniTagGlass>
        <MiniTagGlass type="time">28</MiniTagGlass>
        <MiniTagGlass type="visi">能見度</MiniTagGlass>
      </div>
      <br />
      <Footer />
    </>
  );
}
