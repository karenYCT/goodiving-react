import SiteMap from '@/pages/divesite/sitemap';
import diveData from '@/data/divesite-xiaoliuqiu.json';

export default function Map() {
  return (
    <div>
      <SiteMap mapData={diveData.xiaoliuqiu} />
    </div>
  );
}