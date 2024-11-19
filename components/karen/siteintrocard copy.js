import { useSitepageModal } from '@/context/sitepage-context';
import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import { FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import { FaHeart, FaRegBookmark } from 'react-icons/fa6';
import styles from './siteintrocard.module.css';
import MiniTag from '../tag/minitag';
import { useRouter } from 'next/router';

export default function SiteIntroCard({ data = {}, currentSites = [], onCardClick }) {
  // 狀態定義
  const router = useRouter();
  const { openSitepageModal } = useSitepageModal();

  const handleModalOpen = async () => {
    try {
      if (!data || !data.site_id) return;
      console.log('打開潛點modal:', data.site_id);

      // 更新路由
      const newPath = `/divesite/site/${data.site_id}`;
      if (router.asPath !== newPath) {
        console.log('更新路由:', newPath);
        await router.replace(newPath, undefined, {
          shallow: true,
          scroll: false
        });
      }

      // 打開modal
      await openSitepageModal(data, currentSites);
    } catch (error) {
      console.error('吼失敗了拉:', error);
    }
  };

  return (
    <>
      <div className={`${styles['container']}`}>
        <div className={`${styles['section1']}`}>
          {/* 放照片的位置 */}
          <div className={`${styles['imgContainer']}`}>
            <img
              src={data.site_img_path || '/siteimg.JPG'}
              alt={data.site_name || '潛點圖片'}
            />
          </div>
          <div className={`${styles['itemContainer']}`}>
            {/* 放文字的位置 */}
            <h5>{data.site_name || '潛點名稱'}</h5>
            <div>
              <span className={`${styles['regionContainer']}`}>
                <FaMapMarkerAlt />
                {data.region_name || '潛點地區'}
              </span>
              {/* <span>潛點地區</span> */}
            </div>

            {/* <div>
              <span className={`${styles['heartContainer']}`}>
                <span className={`${styles['rating']}`}>4.0</span>
                <FaHeart />
              </span>
            </div> */}

            <div className={`${styles['tagContainer']}`}>
              {/* 這裡會需要下變數如果是船潛就顯示type="boat"... */}
              <MiniTag type={data.method_name === '船潛' ? 'boat' : 'shore'} />
              <MiniTag type="level">{data.level_name || '難易度'}</MiniTag>
            </div>
          </div>
        </div>
        {/* 放功能的位置 */}
        <div className={`${styles['rightContainer']}`}>
          <div className={`${styles['functionContainer']}`}>
            <FaRegBookmark /> <FaShareAlt />
          </div>

          <div className={`${styles['buttonWrapper']}`}>
            <ButtonFP2 onClick={handleModalOpen}>介紹</ButtonFP2>
          </div>
        </div>
      </div>
    </>
  );
}