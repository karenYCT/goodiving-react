import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagSecondary() {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-secondary']}`}>標籤</p>
    </>
  )
}
