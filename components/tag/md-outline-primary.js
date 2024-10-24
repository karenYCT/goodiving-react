import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdOutlinePrimary() {
  return (
    <>
        <p className={`${tag.tag} ${tag['md-outline-primary']}`}>標籤</p>
    </>
  )
}
