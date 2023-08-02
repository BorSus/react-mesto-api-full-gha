import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function EntryForm({ title, textSubmitButton, textLink, onSubmit }) {
  const location = useLocation();
  //переменная состояния = cтейт, в котором содержится значение inputEntryEmail
  const [email, setEmail] = useState('');
  //переменная состояния = cтейт, в котором содержится значение inputEntryPassword
  const [password, setPassword] = useState('');
  // Обработчик изменения инпута обновляет стейт email
  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  // Обработчик изменения инпута обновляет стейт password
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  //Функция для submit формы EntryForm.
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      password,
      email
    });
  }
  return (
    <section className="entry">
      <p className="entry__title">{title}</p>
      <form name="entryForm" className="entry__form" onSubmit={handleSubmit}>
        <div className="entry__valid-input">
          <input
            type="email"
            className="entry__input"
            name="email"
            id="inputEntryEmail"
            placeholder="Email"
            minLength="3"
            maxLength="64"
            required
            onChange={handleChangeEmail}
          />
          <span className="entry__error" id="inputEntryEmail-error">
            &nbsp
          </span>
        </div>
        <div className="entry__valid-input">
          <input
            type="password"
            className="entry__input"
            name="password"
            id="inputEntryPassword"
            placeholder="Пароль"
            minLength="3"
            maxLength="64"
            required
            onChange={handleChangePassword}
          />
          <span className="entry__error" id="inputEntryPassword-error">
            &nbsp
          </span>
        </div>
        <button className="entry__submit" type="submit">
          {textSubmitButton}
        </button>
        {location.pathname === '/sign-up' && (
          <Link to="/sign-in" className="entry__link">
            {textLink}
          </Link>
        )}
      </form>
    </section>
  );
}
export default EntryForm;
