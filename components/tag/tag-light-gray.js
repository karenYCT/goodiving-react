import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagLightGray() {
  return (
    <>
    <p className={`${tag.tag} ${tag['tag-light-gray']}`}>標籤</p>
    </>
  )
}
