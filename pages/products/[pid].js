import { useEffect, useState, useRef } from 'react';
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
  const [selectedSize, setSelectedSize] = useState(''); // 初始狀態為未選擇尺寸
  const [selectedColor, setSelectedColor] = useState(''); // 初始狀態為未選擇顏色
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const prevPidRef = useRef(pid);
  const fetchProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${pid}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('獲取商品資料失敗:', error);
    }
  };

  const images = product.images.map((image) => image.img_url);

  const fetchRecommendedProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/recommend/${pid}`
      );
      const data = await response.json();
      setRecommendedProducts(data);
    } catch (error) {
      console.error('獲取商品資料失敗:', error);
    }
  };

  // 根據選中的 size 和 color 查找變體 ID
  const updateVariantId = (size, color) => {
    const variant = product.variants.find(
      (v) => v.size === size && v.color === color
    );
    if (variant) {
      setSelectedVariantId(variant.id);
    } else {
      setSelectedVariantId(null); // 沒有找到對應的變體
    }
  };

  // 獲取資料
  useEffect(() => {
    if (!router.isReady) return;

    // 路由變化時重置所有狀態
    setSelectedSize('');
    setSelectedColor('');
    setSelectedVariantId(null);
    prevPidRef.current = pid;

    if (pid) {
      // 重置後再獲取新數據
      fetchProduct();
      fetchRecommendedProduct();
    }
  }, [pid, router.isReady]);

  // 自動選擇尺寸
  useEffect(() => {
    if (!product?.variants?.length || !router.isReady) return;

    // 取得所有不重複的尺寸
    const uniqueSizes = Array.from(
      new Set(product.variants.map((variant) => variant.size))
    );

    // 只在產品數據更新且選項為空時執行自動選擇
    if (uniqueSizes.length === 1 && selectedSize === '') {
      const singleSize = uniqueSizes[0];
      setSelectedSize(singleSize);

      // 檢查該尺寸是否只有一種顏色
      const variantsForSize = product.variants.filter(
        (variant) => variant.size === singleSize
      );
      const uniqueColors = Array.from(
        new Set(variantsForSize.map((variant) => variant.color))
      );

      if (uniqueColors.length === 1 && selectedColor === '') {
        setSelectedColor(uniqueColors[0]);
      }
    }
  }, [product, router.isReady]);

  // 自動選擇顏色
  useEffect(() => {
    if (!product?.variants?.length || !selectedSize) return;

    const variantsForSelectedSize = product.variants.filter(
      (variant) => variant.size === selectedSize
    );
    const uniqueColors = Array.from(
      new Set(variantsForSelectedSize.map((variant) => variant.color))
    );

    // 只在選擇尺寸後且顏色為空時自動選擇顏色
    if (uniqueColors.length === 1 && selectedColor === '') {
      const autoSelectedColor = uniqueColors[0];
      setSelectedColor(autoSelectedColor);
      // 直接使用新的顏色值更新 VariantId
      updateVariantId(selectedSize, autoSelectedColor);
    } else if (selectedColor) {
      // 如果已經有顏色選擇，使用現有的顏色更新 VariantId
      updateVariantId(selectedSize, selectedColor);
    }
  }, [selectedSize, product]);

  // 處理顏色變化後的 VariantId 更新
  useEffect(() => {
    if (selectedSize && selectedColor) {
      updateVariantId(selectedSize, selectedColor);
    }
  }, [selectedColor]);

  return (
    <Layout>
      <div className={styles.container}>
        <Breadcrumbs />

        <div className={styles['product-container']}>
          <ProductImageViewer images={images} />
          <ProductDescription
            {...product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            selectedVariantId={selectedVariantId}
            setSelectedSize={setSelectedSize}
            setSelectedColor={setSelectedColor}
            setSelectedVariantId={setSelectedVariantId}
            updateVariantId={updateVariantId}
          />
        </div>
        {/* 感興趣的商品 */}
        <div className={styles['similar-products']}>
          <h2>你可能感興趣的商品</h2>
          <div className={styles['similar-products-container']}>
            {recommendedProducts.map((product) => (
              <Card3 key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
