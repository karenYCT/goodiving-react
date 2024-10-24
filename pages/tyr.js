import React, { useState, useEffect } from 'react'
import RadioC from '@/components/inputs/radio-c'
import RadioN from '@/components/inputs/radio-n'
import CheckC from '@/components/inputs/check-c'
import CheckN from '@/components/inputs/check-n'

export default function Tyr(props) {
  return (
    <>
        <div>
            <RadioC />
            <RadioN />
        </div>
        <div>
            <CheckC />
            <CheckN />
        </div>
    </>
  )
}
