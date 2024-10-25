import React from 'react';
import Footer from '@/components/layouts/footer';
import Minilev from '@/components/tag/mini-level';
import Minitime from '@/components/tag/mini-time';
import MiniVisi from '@/components/tag/mini-visiability';
import MiniDepth from '@/components/tag/mini-depth';
import MiniTemp from '@/components/tag/mini-temp';
import MiniLoves from '@/components/tag/mini-loves';
import MiniMethodb from '@/components/tag/mini-methodb';
import MiniMethodc from '@/components/tag/mini-methodc';
import Card1 from '@/components/karen/siteintrocard1';
export default function Index() {
  return (
    <>
        <Card1 />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
        <span>這是小標籤</span>
        <Minilev>簡單</Minilev>
        <Minitime>分鐘</Minitime>
        <MiniVisi>能見度</MiniVisi>
        <MiniDepth>深度</MiniDepth>
        <MiniTemp>水溫</MiniTemp>
        <MiniLoves>喜愛度</MiniLoves>
        <MiniMethodb />
        <MiniMethodc />
      </div>
      <Footer />
    </>
  );
}
