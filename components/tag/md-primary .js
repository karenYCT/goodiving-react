import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdPrimary() {
  return (
    <>
      <p className={`${tag.tag} ${tag['md-primary']}`}>標籤</p>
    </>
  )
}
