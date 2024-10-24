import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagPrimary() {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-primary']}`}>標籤</p>
    </>
  )
}
