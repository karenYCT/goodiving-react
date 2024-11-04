import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/breadcrumbs';
import ProductImageViewer from '@/components/eden/product-image-viewer';
import ProductDescription from '@/components/eden/product-description';
import Layout from '@/components/layouts/layout';
import styles from './[pid].module.css';
import Card3 from '@/components/eden/card3';
import { useRouter } from 'next/router';

export default function Detail() {
  const router = useRouter();
  const { pid } = router.query;
  const [product, setProduct] = useState({ images: [], variants: [] });

  const fetchProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/${router.query.pid}`
      );
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('獲取商品資料失敗:', error);
    }
  };

  const images = product.images.map((image) => image.img_url);

  useEffect(() => {
    if (pid) {
      fetchProduct();
    }
    if (router.isReady) {
      fetchProduct();
    }
  }, [pid, router.isReady]);

  return (
    <Layout>
      <div className={styles.container}>
        <Breadcrumbs />

        <div className={styles['product-container']}>
          <ProductImageViewer images={images} />
          <ProductDescription {...product} />
        </div>
        {/* 感興趣的商品 */}
        <div className={styles['similar-products']}>
          <h2>你可能感興趣的商品</h2>
          <div className={styles['similar-products-container']}>
            <Card3 />
            <Card3 />
            <Card3 />
            <Card3 />
          </div>
        </div>
      </div>
    </Layout>
  );
}
