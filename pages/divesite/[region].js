import { useRouter } from 'next/router';
import Index from './index';

export default function RegionPage() {
  const router = useRouter();
  const { region } = router.query;
  return <Index defaultRegion={region} />;
}
