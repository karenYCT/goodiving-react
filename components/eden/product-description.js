import styles from './product-description.module.css';
import { useState, useEffect } from 'react';
import SelectRect3 from '../dropdown/select-rect3';
import { formatPrice } from '@/utils/formatPrice';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/context/auth-context';

export default function ProductDescription({
  title = '商品名稱',
  description = '商品描述',
  price = 0,
  variants = [{ id: 0, size: '', color: '', stock: 0 }],
}) {
  const [selectedSize, setSelectedSize] = useState(''); // 初始狀態為未選擇尺寸
  const [selectedColor, setSelectedColor] = useState(''); // 初始狀態為未選擇顏色
  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const { auth, openModal } = useAuth();
  const user_id = auth?.user_id;

  // 取得所有尺寸選項，並去重
  const sizes = [...new Set(variants.map((variant) => variant.size))];
  // 根據選中的尺寸過濾可選顏色，並檢查庫存情況
  const getColorOptions = (size) => {
    return variants
      .filter((variant) => variant.size === size)
      .map((variant) => ({
        color: variant.color,
        isDisabled: variant.stock === 0,
      }));
  };
  // 檢查尺寸是否所有顏色庫存均為0(返回布林值)
  const isSizeDisabled = (size) => {
    return variants
      .filter((variant) => variant.size === size)
      .every((variant) => variant.stock === 0);
  };

  // 根據當前選擇的尺寸和顏色，查找對應的庫存
  const getStockMessage = (size, color) => {
    const variant = variants.find((v) => v.size === size && v.color === color);
    if (!variant) return ''; // 如果找不到對應的變體，返回空
    if (variant.stock >= 10) return '庫存充足';
    if (variant.stock > 0 && variant.stock < 10) return '小於10件';
    if (variant.stock === 0) return '無庫存';
    return '';
  };

  // 根據選中的 size 和 color 查找變體 ID
  const updateVariantId = (size, color) => {
    const variant = variants.find((v) => v.size === size && v.color === color);
    if (variant) {
      setSelectedVariantId(variant.id);
    } else {
      setSelectedVariantId(null); // 沒有找到對應的變體
    }
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
    setSelectedColor(''); // 重置顏色選擇
    setSelectedVariantId(null); // 重置ID選擇
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (selectedSize) {
      updateVariantId(selectedSize, color);
    }
  };

  // 加入購物車事件，檢查變體 ID 和會員 ID 是否已存在
  const handleAddToCart = async () => {
    // 檢查變體 ID 和會員 ID 是否已設置
    if (!user_id) {
      toast.error('請先登入會員', {
        style: {
          border: '2px solid #023e8a',
          padding: '16px',
          color: '#023e8a',
          backgroundColor: '#fff',
        },
        iconTheme: {
          primary: '#ff277e',
          secondary: '#fff',
        },
      });
      openModal();
      return;
    }

    if (!selectedVariantId) {
      toast.error('請先選擇商品尺寸和顏色', {
        style: {
          border: '2px solid #023e8a',
          padding: '16px',
          color: '#023e8a',
          backgroundColor: '#fff',
        },
        iconTheme: {
          primary: '#ff277e',
          secondary: '#fff',
        },
      });
      return;
    }

    // 構造 POST 的請求 payload
    const payload = {
      variant_id: selectedVariantId,
      user_id: user_id,
    };

    try {
      // 發送 POST 請求到 API
      const response = await fetch('http://localhost:3001/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // 檢查響應結果
      if (response.ok) {
        toast.success(`${title} \r\n 已加入購物車`, {
          position: 'top-right',
          style: {
            border: '2px solid #023e8a',
            padding: '16px',
            color: '#023e8a',
            backgroundColor: '#fff',
          },
          iconTheme: {
            primary: '#023e8a',
            secondary: '#fff',
          },
        });
      } else {
        toast.error('加入購物車失敗，請重試', {
          style: {
            border: '2px solid #023e8a',
            padding: '16px',
            color: '#023e8a',
            backgroundColor: '#fff',
          },
          iconTheme: {
            primary: '#ff277e',
            secondary: '#fff',
          },
        });
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('加入購物車過程中出錯', {
        style: {
          border: '2px solid #023e8a',
          padding: '16px',
          color: '#023e8a',
          backgroundColor: '#fff',
        },
        iconTheme: {
          primary: '#ff277e',
          secondary: '#fff',
        },
      });
    }
  };

  useEffect(() => {
    const oneSizeVariant = variants.find(
      (variant) => variant.size === 'ONE SIZE'
    );
    const oneColorVariant = variants.find(
      (variant) => variant.color === 'ONE COLOR'
    );

    if (oneSizeVariant) {
      setSelectedSize('ONE SIZE');
    }

    if (selectedSize && oneColorVariant) {
      setSelectedColor('ONE COLOR');
    }

    updateVariantId(selectedSize, selectedColor);
  }, [variants, selectedSize, selectedColor]);

  return (
    <div className={styles.container}>
      {/* 商品名稱 */}
      <h3 className={styles.title}>{title}</h3>

      {/* 商品內文 */}
      <p className={styles.description}>{description}</p>

      {/* 價格 */}
      <h4 className={styles.price}>{formatPrice(price)}</h4>

      {/* 尺寸 */}
      <div className={styles.sizes}>
        <h5>尺寸：</h5>
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`${styles.sizeButton} ${
              isSizeDisabled(size) ? styles.disabledButton : ''
            } ${selectedSize === size ? styles.active : ''}`}
            onClick={() => handleSizeClick(size)}
            disabled={isSizeDisabled(size)}
          >
            {size}
          </button>
        ))}
      </div>

      {/* 顏色 */}

      <div className={styles.color}>
        <h5>顏色：</h5>
        <SelectRect3
          options={getColorOptions(selectedSize)}
          onChange={handleColorChange}
          option={selectedColor}
        />
      </div>

      {/* 庫存提示 依照商品屬性顯示*/}
      {selectedSize && selectedColor && (
        <h5 className={styles.stock}>
          <p>{getStockMessage(selectedSize, selectedColor)}</p>
        </h5>
      )}

      {/* 加入購物車 */}
      <button
        className={`${styles.addToCart} ${
          selectedVariantId ? '' : styles.addToCartDisabled
        }`}
        onClick={handleAddToCart}
      >
        加入購物車
      </button>
    </div>
  );
}
