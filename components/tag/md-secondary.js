import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdSecondary() {
  return (
    <>
    <p className={`${tag.tag} ${tag['md-secondary']}`}>標籤</p>
    </>
  )
}
