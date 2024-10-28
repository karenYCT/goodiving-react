import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function GreenIsland({ children }) {
  return (
    <>
  <p className={`${tag.tag} ${tag['tag-green-island']}`}>{children}</p>
    </>
  )
}
