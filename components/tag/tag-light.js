import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagLight() {
  return (
    <>
    <p className={`${tag.tag} ${tag['tag-light']}`}>標籤</p>
    </>
  )
}
