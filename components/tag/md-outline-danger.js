import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdOutlineDanger() {
  return (
    <>
      <p className={`${tag.tag} ${tag['md-outline-danger']}`}>標籤</p>
    </>
  )
}
