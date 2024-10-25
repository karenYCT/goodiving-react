import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function TagLightGray({children}) {
  return (
    <>
    <p className={`${tag.tag} ${tag['tag-light-gray']}`}>{children}</p>
    </>
  )
}
