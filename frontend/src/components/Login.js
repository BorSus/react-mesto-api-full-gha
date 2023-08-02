import React from 'react';
import EntryForm from './EntryForm';

function Login({ onSubmit }) {
  return <EntryForm title="Вход" textSubmitButton="Войти" textLink="" onSubmit={onSubmit} />;
}
export default Login;
