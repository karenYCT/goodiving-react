import { useState } from 'react';
import Link from 'next/link';
import styles from './navbar-sm.module.css';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import Button from '../buttons/btn-fill-primary';
import ButtonOutline from '../buttons/btn-outline-primary';
import ButtonGray from '../buttons/btn-fill-gray';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAuth } from '@/context/auth-context';
import { useUser } from '@/context/user-context';
import { UPLOAD_FILE } from '@/configs/api-path';
import toast from 'react-hot-toast';

export default function Navbar({ openModal }) {
  const { auth, logout } = useAuth();
  const { userData } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    isOpen && setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    menuOpen && setMenuOpen(false);
  };

  const router = useRouter();

  const pageLogin = () => {
    router.push('/member/login');
  };

  const pageRegister = () => {
    router.push('/member/register');
  };

  const putLogOutButton = (e) => {
    e.preventDefault();
    logout();
    setIsOpen(false);
    toast.success('已成功登出');
  };

  const logoutDropdown = (
    <>
      <div className={styles.dropdown}>
        <div>
          <Button onClick={pageLogin}>會員登入</Button>
        </div>
        <div>
          <ButtonOutline onClick={pageRegister}>註冊新會員</ButtonOutline>
        </div>
      </div>
    </>
  );

  const loginDropdown = (
    <>
      <div className={styles.dropdown}>
        <div className={styles.memberInfo}>
          <Image
            className={styles.memberImg}
            src={`${UPLOAD_FILE}${userData.profile_picture}`}
            alt="member"
            width={100}
            height={100}
          />
          <div className={styles.memberName}>
            <h6>{auth.user_full_name}</h6>
            <h6>您好</h6>
          </div>
        </div>
        <ul>
          <li>
            <Link className={styles.dropdownItem} href="/member">
              我的帳戶
            </Link>
          </li>
          <li>
            <Link className={styles.dropdownItem} href="#">
              訂單紀錄
            </Link>
          </li>
          <li>
            <Link className={styles.dropdownItem} href="#">
              預訂課程
            </Link>
          </li>
          <li>
            <Link className={styles.dropdownItem} href="#">
              收藏清單
            </Link>
          </li>
        </ul>
        <ButtonGray
          className={styles.dropdownButton}
          style={{ width: '-webkit-fill-available' }}
          onClick={(e) => {
            putLogOutButton(e);
          }}
        >
          登出
        </ButtonGray>
      </div>
    </>
  );

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.navbarOuter}>
          <div className={styles.navbar}>
            <Link className="" href="/">
              <Image
                className={styles.logoImg}
                src="/logo-primary.svg"
                alt="goodiving"
                width={100}
                height={100}
              />
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
                <li>
                  <Link className={styles.menuItem} href="/lesson">
                    搜尋課程
                  </Link>
                </li>
                {/* <li>
                  <Link className={styles.menuItem} href="#">
                    尋找教練
                  </Link>
                </li> */}
                <li>
                  <Link className={styles.menuItem} href="/divesite">
                    潛點地圖
                  </Link>
                </li>
                <li>
                  <Link
                    className={styles.menuItem}
                    href={auth.user_id ? '/diary' : '#'}
                    onClick={() => {
                      if (!auth.user_id) openModal();
                    }}
                  >
                    深藍日誌
                  </Link>
                </li>
                <li>
                  <Link className={styles.menuItem} href="/blog/list">
                    結交潛伴
                  </Link>
                </li>
                <li>
                  <Link className={styles.menuItem} href="/products">
                    購買裝備
                  </Link>
                </li>
                <li>
                  <Link className={styles.menuItem} href="/member">
                    會員中心
                  </Link>
                </li>
              </ul>
              <ul className={styles.nav}>
                <li>
                  <Link className={styles.navItem} href="/cart">
                    <FaShoppingCart />
                  </Link>
                </li>

                <li>
                  <button
                    className={styles.navItem}
                    onClick={auth.user_id ? toggleDropdown : openModal}
                  >
                    <FaUser />
                  </button>
                  {isOpen && (auth.user_id ? loginDropdown : '')}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
