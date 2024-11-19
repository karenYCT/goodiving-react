import ButtonFP2 from '@/components/buttons/btn-fill-primary2';
import { FaMapMarkerAlt, FaShareAlt } from 'react-icons/fa';
import { FaRegBookmark } from 'react-icons/fa6';
import styles from './siteintrocard.module.css';
import MiniTag from '../tag/minitag';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export default function SiteIntroCard({
  data = {},
  currentSites = [],
  onModalOpen,
}) {
  console.log('data:', data);
  const router = useRouter();

  // 處理圖片路徑的函數
  const getImageUrl = (imgUrl) => {
    if (!imgUrl) return '/siteimg.JPG';
    // 如果是完整的 URL（例如 http:// 或 https:// 開頭）就直接返回
    if (imgUrl.startsWith('http')) return imgUrl;
    // 否則加上 /divesites/ 前綴
    return `/divesites/${imgUrl}`;
  };

  // 獲取主圖 URL
  const getMainImageUrl = () => {
    // 如果有 images 陣列，先找主圖
    if (data.images && Array.isArray(data.images) && data.images.length > 0) {
      const mainImage = data.images.find(img => img.img_main === 1) || data.images[0];
      if (mainImage && mainImage.img_url) {
        return getImageUrl(mainImage.img_url);
      }
    }
    // 如果沒有 images 陣列，使用 img_url
    if (data.img_url) {
      return getImageUrl(data.img_url);
    }

    // 都沒有就用預設圖
    return '/siteimg.JPG';
  };

  const handleShare = async () => {
    const currentUrl = `${window.location.origin}/divesite?siteId=${data.site_id}`;
    
    try {
      // 在移動設備上使用 Web Share API
      if (navigator.share && !(/Macintosh/.test(navigator.userAgent))) {
        await navigator.share({
          title: `${data.region_name} | ${data.site_name}`,
          text: `探索這個潛點：${data.site_name}`,
          url: currentUrl
        });
      } else {
        // 在 Mac 和其他不支援的設備上直接複製
        await navigator.clipboard.writeText(currentUrl);
        toast.success('網址已複製到剪貼簿');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('使用者取消分享');
        return;
      }
      console.error('分享失敗:', error);
      toast.error('分享功能暫時無法使用，請稍後再試');
    }
  };

  const handleModalOpen = async () => {
    try {
      if (!data || !data.site_id) return;

      // Update URL with siteId while preserving existing query params
      await router.push(
        {
          pathname: '/divesite',
          query: {
            ...router.query,
            siteId: data.site_id,
          },
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        }
      );

      // Call modal open callback
      if (onModalOpen) {
        await onModalOpen(data, currentSites);
      }
    } catch (error) {
      console.error('操作失敗:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section1}>
        <div className={styles.imgContainer}>
          <img
            src={getMainImageUrl(data.img_url) || '/siteimg.JPG'}
            alt={data.site_name || '潛點圖片'}
          />
        </div>
        <div className={styles.itemContainer}>
          <h5>{data.site_name || '潛點名稱'}</h5>
          <div>
            <span className={styles.regionContainer}>
              <FaMapMarkerAlt />
              {data.region_name || '潛點地區'}
            </span>
          </div>

          <div className={styles.tagContainer}>
            <MiniTag type={data.method_name === '船潛' ? 'boat' : 'shore'} />
            <MiniTag type="level">{data.level_name || '難易度'}</MiniTag>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.functionContainer}>
          {/* <FaRegBookmark />  */}
          <FaShareAlt 
          onClick={handleShare}
          aria-label="分享"
          />
        </div>

        <div className={styles.buttonWrapper}>
          <ButtonFP2 onClick={handleModalOpen}>介紹</ButtonFP2>
        </div>
      </div>
    </div>
  );
}
