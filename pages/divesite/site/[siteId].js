import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Index from '../index';

export default function SitePage({ defaultSiteId: serverSideId }) {
  const router = useRouter();
  const { siteId } = router.query;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 使用 serverSideId 作為後備
  const finalSiteId = siteId || serverSideId;

  // 等待客戶端掛載完成和路由準備就緒
  if (!mounted || !router.isReady) {
    return null;
  }

  return <Index defaultSiteId={finalSiteId} />;
}

export async function getServerSideProps(context) {
  const { siteId } = context.params;
  
  return {
    props: {
      defaultSiteId: siteId || null,
    },
  };
}