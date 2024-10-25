import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagPrimary({children}) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-primary']}`}>{children}</p>
    </>
  )
}
