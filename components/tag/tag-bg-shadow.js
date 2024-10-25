import React from 'react';
import tag from '@/components/tag/tag.module.css';

export default function TagBgShadow({ children }) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-bg-shadow']}`}>{children}</p>
    </>
  );
}

