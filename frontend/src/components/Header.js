import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../images/logo.svg';
import NavigateBar from './NavigateBar.js';
import MobileMenu from './MobileMenu';
function Header({ email, onExit }) {
  const location = useLocation();
  //переменная состояния = Статус размера экрана для
  const [isMobileVersion, setIsMobileVersion] = useState(null);
  //переменная состояния = Статус активности MobileMenu
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  //Функция проверки размера ширины для установки мобильной версии
  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      setIsMobileVersion(width <= 450);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //Функция вкл|откл мобильного меню
  function toogleMobileMenu() {
    setIsMobileMenuActive(!isMobileMenuActive);
  }
  return (
    <>
      {(location.pathname === '/main') & isMobileVersion && (
        <MobileMenu email={email} onExit={onExit} isMobileMenuActive={isMobileMenuActive} />
      )}
      <header className="header">
        <img src={logo} alt="Логотип Место" className="header__logo" />
        <NavigateBar
          email={email}
          onExit={onExit}
          isMobileMenuActive={isMobileMenuActive}
          onMobileMenuIcon={toogleMobileMenu}
          isMobileVersion={isMobileVersion}
        />
      </header>
    </>
  );
}
export default Header;
