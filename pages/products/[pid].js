import Breadcrumbs from '@/components/breadcrumbs';
import ProductImageViewer from '@/components/eden/product-image-viewer';
import ProductDescription from '@/components/eden/product-description';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
export default function Test() {
  const images = [
    '/example.jpg',
    '/example1.jpg',
    '/example2.jpg',
    '/example3.jpg',
    '/example4.jpg',
    '/example5.jpg',
    // ... 更多圖片
  ];

  return (
    <Layout>
      <div className={styles.container}>
        <Breadcrumbs />

        <div className={styles['product-container']}>
          <ProductImageViewer images={images} />
          <ProductDescription />
        </div>
        {/* 感興趣的商品 */}
      </div>
    </Layout>
  );
}
