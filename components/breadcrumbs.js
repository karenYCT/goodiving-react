// components/Breadcrumbs.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './breadcrumbs.module.css';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export default function Breadcrumbs() {
  const router = useRouter();

  // 1. 獲取當前路徑
  const pathArray = router.asPath.split('/').filter((path) => path); // 返回breadcrumbs array

  // 路徑對照表 具體路徑放這裡
  const pathNameMap = {
    products: '購買裝備',
    lesson: '搜尋課程',
    map: '潛點地圖',
    forum: '結交潛伴',
    user: '會員中心',
    book: '訂閱電子書',
  };

  // 2. 根據路徑生成麵包屑元件
  const breadcrumbs = pathArray.map((path, index) => {
    // 生成當前麵包屑的完整路徑
    const href = '/' + pathArray.slice(0, index + 1).join('/');

    // 根據當前的父路徑來判斷該動態路徑的顯示名稱
    let formattedPath;
    if (router.query.pid && path === router.query.pid) {
      // 根據當前的父路徑來判斷該動態路徑的顯示名稱 動態路徑加這裡
      if (pathArray.includes('lesson')) {
        formattedPath = '課程詳情';
      } else if (pathArray.includes('products')) {
        formattedPath = '商品詳情';
      } else {
        formattedPath = '詳情';
      }
    } else {
      // 使用映射表進行路徑名稱格式化，默認使用原始值
      formattedPath = pathNameMap[path] || path;
    }

    // 最後一個部分不生成連結
    if (index === pathArray.length - 1) {
      return (
        <span key={index} className={styles.spanContainer1}>
          <span className={styles.location}>{formattedPath}</span>
        </span>
      );
    }
    return (
      <span key={index} className={styles.spanContainer2}>
        <Link href={href}>{formattedPath}</Link>
        <MdOutlineKeyboardArrowRight />
      </span>
    );
  });

  // 3. 顯示完整麵包屑導航
  return <div className={styles.breadcrumbs}>{breadcrumbs}</div>;
}
