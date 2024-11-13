import { useState, useEffect } from 'react';
import styles from './card-booking.module.css';
import Image from 'next/image';
import { FaLocationDot } from 'react-icons/fa6';
import { FaRegCalendar } from 'react-icons/fa';
import { API_SERVER } from '@/configs/api-path';

export default function CardBooking(props) {
  useEffect(() => {
    console.log('card-booking', props.lesson);
  }, [props]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <div className={styles.coach}>
            <Image
              src={`${API_SERVER}/coach/${props.lesson.coach_img}.jpg`}
              alt="coach"
              width={150}
              height={150}
              className={styles.image}
            />
          </div>
          <div className={styles.lesson}>
            <Image
              src={`${API_SERVER}/round/${props.lesson.lesson_img_a}.jpg`}
              alt="lesson"
              width={180}
              height={180}
              className={styles.image}
            />
          </div>
        </div>
        <div className={styles.info}>
          <h4>
            {`${props.lesson.cert_dept}` ? `${props.lesson.cert_dept} / ` : ''}
            {props.lesson.lesson_name}
          </h4>
          <h6>{props.lesson.coach_name}教練</h6>
          <h6>
            <FaLocationDot />
            &nbsp;
            {props.lesson.lesson_loc}
            &nbsp; &nbsp;
            <FaRegCalendar />
            &nbsp;
            {props.lesson.round_start}
            {`${props.lesson.round_end}` ? ` – ${props.lesson.round_end}` : ''}
          </h6>
        </div>
      </div>
    </>
  );
}
