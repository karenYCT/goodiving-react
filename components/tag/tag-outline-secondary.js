import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagOutlineSecondary({children}) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-outline-secondary']}`}>{children}</p>
    </>
  )
}
