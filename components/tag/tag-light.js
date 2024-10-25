import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagLight({children}) {
  return (
    <>
    <p className={`${tag.tag} ${tag['tag-light']}`}>{children}</p>
    </>
  )
}
