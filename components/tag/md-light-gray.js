import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdLightGray() {
  return (
    <>
      <p className={`${tag.tag} ${tag['md-light-gray']}`}>標籤</p>
    </>
  )
}
