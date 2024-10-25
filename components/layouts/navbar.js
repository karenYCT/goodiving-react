import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar.module.css';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const logoutDropdown = (
    <>
      <div>
        <ul className={`${styles.dropdownMenu} ${styles.dropdown}`}>
          <button>會員登入</button>
          <button>註冊新會員</button>
        </ul>
      </div>
    </>
  );

  const loginDropdown = (
    <>
    <div>
      <ul className={`${styles.dropdownMenu} ${styles.dropdown}`}>
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
      </div>
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbarOuter}>
          <div className={styles.navbar}>
            <Link className="" href="#">
              logo
            </Link>
            <div className={styles.navbarInner}>
              <button
                className={`${styles.menuButton} ${
                  menuOpen ? styles.open : ''
                }`}
                onClick={toggleMenu}
              >
                {menuOpen ? <FaXmark /> : <FaBars />}
              </button>
              <ul className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
                <li className={styles.li}>
                  <Link
                    className={styles.menuItem}
                    href="http://localhost:3000/lesson"
                  >
                    搜尋課程
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link className={styles.menuItem} href="#">
                    尋找教練
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link
                    className={styles.menuItem}
                    href="http://localhost:3000/divesite"
                  >
                    潛點地圖
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link
                    className={styles.menuItem}
                    href="http://localhost:3000/logs"
                  >
                    深藍日誌
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link
                    className={styles.menuItem}
                    href="http://localhost:3000/blog"
                  >
                    結交潛伴
                  </Link>
                </li>
                <li className={styles.li}>
                  <Link
                    className={styles.menuItem}
                    href="http://localhost:3000/products"
                  >
                    購買裝備
                  </Link>
                </li>
              </ul>
              <ul className={styles.nav}>
                <li>
                  <Link
                    className={styles.navItem}
                    href="http://localhost:3000/cart"
                  >
                    <FaShoppingCart />
                  </Link>
                </li>
                <li>
                  <button className={styles.navItem} onClick={toggleDropdown}>
                    <FaUser />
                  </button>
                  {isOpen && logoutDropdown}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
