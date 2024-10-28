import LogMap from '@/components/karen/logmap-orchid';
import diveData from '@/data/divesite-orchidisland.json';

export default function Map() {
  return (
    <div>
      <LogMap mapData={diveData} />
    </div>
  );
}