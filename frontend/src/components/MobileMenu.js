import React from 'react';
import { Link } from 'react-router-dom';
function MobileMenu({ email, onExit, isMobileMenuActive }) {
  return (
    <div className={`mobile-menu ${isMobileMenuActive && `mobile-menu_active`}`}>
      <p className="mobile-menu__info">{email}</p>
      <Link to="/sign-in" className="mobile-menu__link" onClick={onExit}>
        Выйти
      </Link>
    </div>
  );
}
export default MobileMenu;
