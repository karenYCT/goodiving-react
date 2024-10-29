import Breadcrumbs from '@/components/breadcrumbs';
import ProductImageViewer from '@/components/eden/product-image-viewer';
import ProductDescription from '@/components/eden/product-description';
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '1140px',
          backgroundColor: 'white',
          padding: '10px',
        }}
      >
        <ProductImageViewer images={images} />
        <ProductDescription />
      </div>
    </>
  );
}
