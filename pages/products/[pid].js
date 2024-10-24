import Breadcrumbs from '@/components/breadcrumbs';
import ProductImageViewer from '@/components/eden/product-image-viewer';

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
    <>
      <Breadcrumbs />
      <ProductImageViewer images={images} />
    </>
  );
}
