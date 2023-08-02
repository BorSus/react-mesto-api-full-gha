import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
function NavigateBar({ email, onExit, onMobileMenuIcon, isMobileMenuActive, isMobileVersion }) {
  return (
    <nav className="navbar">
      <Routes>
        <Route
          path="/main"
          element={
            <>
              $
              {isMobileVersion && (
                <div
                  className={`navbar__mobile-icon ${isMobileMenuActive && `active`}`}
                  onClick={onMobileMenuIcon}
                >
                  <span></span>
                </div>
              )}
              $
              {!isMobileVersion && (
                <>
                  <p className="navbar__info">{email}</p>
                  <Link to="/sign-in" className="navbar__link" onClick={onExit}>
                    Выйти
                  </Link>
                </>
              )}
            </>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="navbar__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="navbar__link">
              Войти
            </Link>
          }
        />
      </Routes>
    </nav>
  );
}
export default NavigateBar;
