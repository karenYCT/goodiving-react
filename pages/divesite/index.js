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
export default function Index() {
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '6px' }}>
        <Minilev />
        <Minitime />
        <MiniVisi />
        <MiniDepth />
        <MiniTemp />
        <MiniLoves />
        <MiniMethodb />
        <MiniMethodc />
      </div>
      <Footer />
    </>
  );
}
