import React from 'react'
import Tagoutlineprimary from '@/components/tag/tag-outline-primary'
import TagOutlineLight from '@/components/tag/tag-outline-light'
import TagOutlineSecondary from '@/components/tag/tag-outline-secondary'
import TagBgShadow from '@/components/tag/tag-bg-shadow'
import Tagoutlinedanger from '@/components/tag/tag-outline-danger'
import Tagprimary from '@/components/tag/tag-primary'
import Taglight from '@/components/tag/tag-light'
import TagSecondary from '@/components/tag/tag-secondary'
import Taglightgray from '@/components/tag/tag-light-gray'
import Taggreenisland from '@/components/tag/tag-green-island'
import Modal from '@/components/modal/modal'
import Upload from '@/components/modal/upload'
import Mdposts from '@/components/modal/md-posts'





export default function Tag() {
  return (

    <div style={{background: 'gray'}}>
      <h1>tag</h1>
      <Tagoutlineprimary />
      <br/>
      <TagOutlineLight/>
      <br/>
      <TagOutlineSecondary/>
      <br/>
      <TagBgShadow>可更改</TagBgShadow>
      <br/>
      <Tagoutlinedanger/>
      <br/>
      <Tagprimary/>
      <br/>
      <Taglight/>
      <br/>
      <TagSecondary/>
      <br/>
      <Taglightgray/>
      <br/>
      <Taggreenisland/>
      <hr/>
      <h1>modal</h1>
      
      {/* <Modal/> */}
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      {/* <Upload/> */}

{/* <Mdposts/> */}
  


  </div>


  )
}
