import React from 'react';
import EntryForm from './EntryForm';

function Register({ onSubmit }) {
  return (
    <EntryForm
      title="Регистрация"
      textSubmitButton="Зарегистрироваться"
      textLink="Уже зарегистрированы? Войти"
      onSubmit={onSubmit}
    />
  );
}
export default Register;
