import React from 'react';
import DropdownSelect from '@/components/fanny/dropdown-select'; // 請根據你的檔案結構調整路徑

const ExampleComponent = () => {
  const categories = ['分類一', '分類二', '分類三'];

  const handleSelect = (selectedCategory) => {
    console.log('選擇的分類:', selectedCategory);
  };

  return (
    <div>
      <h1>範例下拉式選單</h1>
      <DropdownSelect
        options={categories}
        label="文章分類"
        onSelect={handleSelect}
      />
    </div>
  );
};

export default ExampleComponent;
