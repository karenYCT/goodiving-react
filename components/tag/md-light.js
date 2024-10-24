import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdLight() {
  return (
    <>
      <p className={`${tag.tag} ${tag['md-light']}`}>標籤</p>
    </>
  )
}
