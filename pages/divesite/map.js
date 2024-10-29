import LogMap from '@/components/karen/logmap';
import diveData from '@/data/divesite-xiaoliuqiu.json';

export default function Map() {
  return (
    <div>
      <LogMap mapData={diveData} />
    </div>
  );
}