import React, { useState, useEffect } from 'react'
import { FaRegCircle } from "react-icons/fa";
import styles from "./input2.module.css"

export default function RadioN(props) {
  return (
        <div>
            <FaRegCircle className={styles['radio-n']} />
            <span>不良好</span>
        </div>
    )
}
