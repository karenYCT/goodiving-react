import React, { useState, useEffect } from 'react'
import { FaRegDotCircle } from "react-icons/fa";
import styles from "./input2.module.css"

export default function RadioC(props) {
  return (
        <div> 
            <FaRegDotCircle className={styles['radio-c']}/>
            <span className={styles['fs-24']}>良好</span>
        </div>
    )
}
