import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagTextBlue() {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-outline-primary']}`}>標籤</p>
    </>
  )
}

