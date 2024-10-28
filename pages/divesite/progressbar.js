import React, { useState, useEffect } from 'react'
import Progressbar from '@/components/karen/progressbar';

export default function Progressbardemo() {

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => 
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div style = {{width: '300px'}}>
        <Progressbar  progress={progress} />
      </div>
    </>
  )
}
