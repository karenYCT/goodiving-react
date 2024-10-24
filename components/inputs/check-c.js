import React, { useState, useEffect } from 'react'
import { FaSquareCheck } from "react-icons/fa6";
import styles from "./input2.module.css"

export default function CheckC(props) {
  return (
    <div>
        <FaSquareCheck className={styles['check-c']}/>
        <span>良好</span>
    </div>
  )
}