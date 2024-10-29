import React, { useState } from 'react';
import styles from './navbar-test.module.css';

export default function NavbarTest(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Logo</div>

      <div
        className={`${styles.menuIcon} ${menuOpen ? styles.open : ''}`}
        onClick={toggleMenu}
      >
        {menuOpen ? 'X' : 'Menu'}
      </div>

      <ul className={`${styles.menu} ${menuOpen ? styles.show : ''}`}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
      </ul>

      <div className={styles.memberSection}>
        <div className={styles.memberButton} onClick={toggleDropdown}>
          會員
        </div>
        {dropdownOpen && (
          <ul className={styles.dropdownMenu}>
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/profile">會員資料</a>
                </li>
                <li>
                  <a href="/dashboard">會員中心</a>
                </li>
                <li>
                  <a href="/logout">登出</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/login">登入</a>
                </li>
                <li>
                  <a href="/register">註冊</a>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}
