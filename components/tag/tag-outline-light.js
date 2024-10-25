import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagOutlineLight({children}) {
  return (
    <>
      <p className={`${tag .tag} ${tag ['tag-outline-light']}`}>{children}</p>
    </>
  )
}

