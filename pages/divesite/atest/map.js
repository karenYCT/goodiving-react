import SiteMap from '@/components/karen/sitemap';
import diveData from '@/data/divesite-xiaoliuqiu.json';

export default function Map() {
  return (
    <div>
      <SiteMap mapData={diveData.xiaoliuqiu} />
    </div>
  );
}