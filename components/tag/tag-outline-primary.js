import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagTextBlue({children}) {
  return (
    <>
      <p className={`${tag.tag} ${tag['tag-outline-primary']}`}>{children}</p>
    </>
  )
}

