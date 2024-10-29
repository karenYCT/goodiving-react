import Siteleft from '@/components/karen/siteleft';
import SiteMap from '@/components/karen/sitemap';
import diveData from '@/data/divesite-greenisland.json';
import React, { useState, useEffect } from 'react';

export default function Home() {
  return (
    <>
      <div style={{ display: 'flex', displayDirection: 'row', backgroundColor: '#89A8BC', justifyContent: 'space-between' }}>
        <Siteleft />
        <SiteMap mapData={diveData} />
      </div>
    </>
  );
}
