import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Index from '../index';

export default function SitePage() {
  const router = useRouter();
  const { siteId } = router.query;
  return <Index />;
}
