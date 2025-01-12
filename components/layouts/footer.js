import React from 'react'
import styles from './footer.module.css'
import { FaInstagram, FaFacebook, FaLine } from 'react-icons/fa'

export default function Footer() {
  const footerData = {
    產品服務: [
      { name: '會員中心', href: '#' },
      { name: '課程介紹', href: '#' },
      { name: '潛水地圖', href: '#' },
      { name: '深藍日誌', href: '#' },
      { name: '商城', href: '#' },
      { name: '結交潛伴', href: '#' },
    ],
    關於我們: [
      { name: '關於GooDiving', href: '#' },
      { name: '人才招募', href: '#' },
      { name: '隱私權政策', href: '#' },
      { name: '網站地圖', href: '#' },
    ],
    聯絡我們: [
      { name: '聯絡我們', href: '#' },
      { name: '共同行銷夥伴計畫', href: '#' },
      { name: '合作提案', href: '#' },
      { name: '客服信箱', href: '#' },
    ],
  }

  return (
    <footer className={styles.footer}>
    <img src="/footer.png" alt="background" />
      <div className={styles.container}>
        <div className={styles['footer-logo']}>
          <img src="/logo-primary.svg" alt="logo" />
        </div>
        <div className={styles['footer-content']}>
          {Object.entries(footerData).map(([title, links]) => (
            <div key={title} className={styles['footer-section']}>
              <h3 className={styles['title']}>{title}</h3>
              <ul className={styles['footer-links']}>
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className={styles['footer-link']}>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.container2}>
        <div className={styles['icon-container']}>
          <FaFacebook />
          <FaInstagram />
          <FaLine />
        </div>
        <div className={styles['copyright']}>
        © 2024 GooDiving. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
