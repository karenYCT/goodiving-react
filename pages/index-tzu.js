import React, { useState, useEffect } from 'react'
import Navbar from '@/components/layouts/navbar'
import Dropdown from '@/components/tzu/input-select/input-select'
import NavbarTest from '@/components/layouts/navbar-test'

export default function IndexTzu(props) {
  return (
    <>
      <Navbar />
      <Dropdown></Dropdown>
      <NavbarTest />
    </>
  )
}