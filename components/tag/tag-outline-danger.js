import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagOutlineDanger({children}) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-outline-danger']}`}>{children}</p>
    </>
  )
}
