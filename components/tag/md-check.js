import React from 'react'
import tag from '@/components/tag/tag.module.css'

export default function MdCheck() {
  return (
    <>
      <p className={`${tag.tag} ${tag['md-check']}`}>已驗證</p>
    </>
  )
}
