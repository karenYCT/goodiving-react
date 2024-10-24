import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagOutlineSecondary() {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-outline-secondary']}`}>標籤</p>
    </>
  )
}
