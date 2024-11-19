import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Index from '../index';

export default function SitePage() {
  const router = useRouter();
  const { siteId } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 等待客戶端掛載完成和路由準備就緒
  if (!mounted || !router.isReady) {
    return <div>Loading...</div>;
  }

  return <Index initialSiteId={siteId} />;
}