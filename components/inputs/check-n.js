import React, { useState, useEffect } from 'react'
import { FaRegSquare } from "react-icons/fa6";
import styles from "./input2.module.css"

export default function CheckN(props) {
  return (
        <div>
            <FaRegSquare className={styles['check-n']}/>
            <span>不良好</span>
        </div>
  )
}

