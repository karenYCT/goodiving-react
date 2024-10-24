import React from 'react'
import Link from 'next/link'
import styles from './navbar.module.css'
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa'

export default function Navbar() {
  {
    /* 下拉選單 */
  }
  {
    /* <ul className={`${styles.menu} ${styles.dropdown}`}>
                  <div>
                    <img src="" alt="" />
                    <div>
                      <p>王*明</p>
                      <p>您好</p>
                    </div>
                  </div>
                  <li>
                    <Link className="dropdown-item" href="#">
                      我的帳戶
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      訂單紀錄
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      預訂課程
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" href="#">
                      收藏清單
                    </Link>
                  </li>
                  <button>登出</button>
                </ul>
                <ul className={`${styles.menu} ${styles.dropdown}`}>
                  <button>會員登入</button>
                  <button>註冊新會員</button>
                </ul> */
  }

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbarOuter}>
          <div className={styles.navbar}>
            <Link className="" href="#">
              logo
            </Link>
            <div className={styles.navbarInner}>
              <div className={styles.navbarInner}>
                <button className={styles.menuButton} href="#">
                  <FaBars />
                </button>
                <ul className={styles.menu}>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      搜尋課程
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      尋找教練
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      潛點地圖
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      深藍日誌
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      結交潛伴
                    </Link>
                  </li>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      購買裝備
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className={styles.menu}>
                  <li>
                    <Link className={styles.menuItem} href="#">
                      <FaShoppingCart />
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.menuItem}
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUser />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
