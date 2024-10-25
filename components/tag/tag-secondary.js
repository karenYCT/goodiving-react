import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagSecondary({children}) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-secondary']}`}>{children}</p>
    </>
  )
}
