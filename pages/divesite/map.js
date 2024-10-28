import SiteMap from '@/components/karen/sitemap-orchid';
import diveData from '@/data/divesite-orchidisland.json';

export default function Map() {
  return (
    <div>
      <SiteMap mapData={diveData} />
    </div>
  );
}