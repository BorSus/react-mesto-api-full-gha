import React, { useEffect, useState, useCallback } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { api } from '../utils/Api.js';
import { apiAuthentication } from '../utils/ApiAuthentication';
import { FormValidator } from '../utils/FormValidator.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  //переменная состояния = авторизированный пользователь
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //переменная состояния = данные пользователя
  const [currentUser, setСurrentUser] = useState({});
  //переменная состояния = данные карточки с сервера
  const [cards, setCards] = useState([]);
  //переменная состояния = Статус ProfilePopup
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  //переменная состояния = Статус AddPlacePopup
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  //переменная состояния = Статус EditAvatarPopup
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  //переменная состояния = Статус ConfirmPopup
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  //переменная состояния = Статус RegistrationPopup
  const [isRegistrationPopupOpen, setRegistrationPopupOpen] = useState(null);
  //переменная состояния = Статус успеха регистрации
  const [isFailRegistration, setIsFailRegistration] = useState(null);
  //переменная состояния = текст для infoTooltip
  const [registrationText, setRegistrationText] = useState(null);
  //переменная состояния = Статус selectedCard
  const [selectedCard, setSelectedCard] = useState({});
  //переменная состояния = Статус deletedCard
  const [deletedCard, setDeletedCard] = useState({});
  //переменная состояния = Статус загрузки на сервер
  const [isLoad, setIsLoad] = useState(false);
  //переменная состояния = email пользователя
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  //переменная функции колбек содержит логику закрытия попапа клавишей Esc
  const closeByEscape = useCallback(evt => {
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }, []);
  //переменная  открыт ли какой-либо popup
  const isOpenAnyPopup =
    isEditProfilePopupOpen ||
    isRegistrationPopupOpen ||
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isConfirmPopupOpen ||
    selectedCard.name;
  //Функция проверки корректности токена
  async function checkToken() {
    try {
      //const jwt = localStorage.getItem('jwt');
      const response = await apiAuthentication.getUserInfo();
      if (!response) {
        return;
      }
      console.log(response._id);
      setIsLoggedIn(true);
      setEmail(response.email);
    } catch (error) {
      setIsLoggedIn(false);
      console.error(`Ошибка при проверки корректности токена: ${error}`);
    } finally {
      console.info('Проверки корректности токена-завершено');
    }
  }
  //Проверка токена при загрузке
  useEffect(() => {
    checkToken();
  }, []);
  //Перенаправление на main
  useEffect(() => {
    navigate('/main');
  }, [isLoggedIn]);
  //Функция выйти из аккаунта - удалить токен из локального хранилища,обновить стейт IsLoggedIn, перейти на страницу входа
  async function handleExit() {
    await apiAuthentication.getUserOut();
    setIsLoggedIn(false);
    //localStorage.removeItem('jwt');
    navigate('/sign-in');
  }
  //Функция открыть popupFullImg.
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  //Функция открыть popupPlace добавления новой карточки
  function handleAddPlaceClick() {
    formValidatorList['popupPlace'].resetValidation();
    setIsAddPlacePopupOpen(true);
  }
  //Функция открыть PopupProfile редактирование информации о пользователе
  function handleEditProfileClick() {
    formValidatorList['popupProfile'].resetValidation();
    setIsEditProfilePopupOpen(true);
  }
  //Функция открыть popupAvatar редактирование аватара
  function handleEditAvatarClick() {
    formValidatorList['popupAvatar'].resetValidation();
    setIsEditAvatarPopupOpen(true);
  }
  //Открыть PopupWithConfirmation подтверждение удаления карточки
  function handleDeleteIconClick(card) {
    setDeletedCard(card);
    formValidatorList['popupConfirm'].resetValidation();
    setIsConfirmPopupOpen(true);
  }
  //Функция закрытие всех попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setRegistrationPopupOpen(false);
    setSelectedCard({});
    setDeletedCard({});
  }
  //Функция закрытие всех попапов по клику на оверлей
  function closePopupOnOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closeAllPopups();
    }
  }
  //Добавляем обработчик события нажатия клавиши Escape на документ только в том случае, если попап открыт
  useEffect(() => {
    if (isOpenAnyPopup) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpenAnyPopup, closeByEscape]);
  //Получение данных о пользователе и карточек с сервера, обновить стейт cards и сurrentUser
  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, cards]) => {
          setСurrentUser(userInfo);
          setCards(cards);
        })
        .catch(error => {
          console.error(`Ошибка при добавлении данных сервера: ${error}`);
        })
        .finally(() => {
          console.info('Добавление данных с сервера-завершено');
        });
    }
  }, [isLoggedIn]);
  //Функция поставить||удалить like, обновить стейт cards
  async function handleCardLike(card) {
    try {
      // Снова проверяем, есть ли уже лайк на этой карточке
      const isLiked = card.likes.some(like => like === currentUser._id);
      const response = await api.changeLikeCardStatus(card._id, !isLiked);
      setCards(state =>
        state.map(stateCard => (stateCard._id === card._id ? response : stateCard))
      );
    } catch (error) {
      console.error(`Ошибка при установка|удаления лайка карточки на странице: ${error}`);
    } finally {
      console.info('установка|удаление лайка карточки на странице-завершено');
    }
  }
  //Функция для submit формы AddPlace. добавить новую карточку на сервер,обновить стейт cards  и закрыть все модальные окна
  async function handleAddPlaceSubmit(newCardData) {
    try {
      setIsLoad(true);
      const response = await api.postNewCard(newCardData);
      setCards([response, ...cards]);
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при добавлении новой карточки: ${error}`);
    } finally {
      setIsLoad(false);
      console.info('Добавление новой карточки-завершено');
    }
  }
  //Функция для submit формы Profile.сохранить изменения данных пользователя на сервере,обновить стейт currentUser  и закрыть все модальные окна
  async function handleUpdateUser(profileData) {
    try {
      setIsLoad(true);
      const response = await api.patchUserInfo(profileData);
      setСurrentUser(response);
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при редактировании данных пользователя: ${error}`);
    } finally {
      setIsLoad(false);
      console.info('Редактирование данных пользователя-завершено');
    }
  }
  //Функция для submit формы Avatar.сохранить изменения аватара, обновить стейт currentUser  и закрыть все модальные окна
  async function handleUpdateAvatar(avatar) {
    try {
      setIsLoad(true);
      const response = await api.patchUserAvatar(avatar);
      setСurrentUser(response);
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при редактировании аватара пользователя : ${error}`);
    } finally {
      setIsLoad(false);
      console.info('Редактирование аватара пользователя-завершено');
    }
  }
  //Функция для submit формы PopupWithConfirmation.удаления карточки, обновить стейт Cards  и закрыть все модальные окна
  async function handleConfirmDeleteCard(e) {
    try {
      setIsLoad(true);
      e.preventDefault();
      const response = await api.deleteCard(deletedCard._id);
      console.log(response);
      setCards(state => state.filter(stateCard => stateCard !== deletedCard));
      closeAllPopups();
    } catch (error) {
      console.error(`Ошибка при удалении карточки: ${error}`);
    } finally {
      setIsLoad(false);
      console.info(`Удаление карточки-завершено`);
    }
  }
  //Функция для submit формы EntryForm.Регистрация нового пользователя на сервере,обновить стейт FailRegistration, перейти на страницу Входа
  async function handleSubmitRegistration(newUser) {
    try {
      await apiAuthentication.postNewUser(newUser);
      setRegistrationText('Вы успешно зарегистрировались!');
      setIsFailRegistration(false);
      navigate('/sign-in');
    } catch (error) {
      setIsFailRegistration(true);
      setRegistrationText('Что-то пошло не так! Попробуйте ещё раз.');
      console.error(`Ошибка при регистрации нового пользователя: ${error}`);
    } finally {
      setRegistrationPopupOpen(true);
      console.info('Регистрация нового пользователя-завершено');
    }
  }
  //Функция для submit формы EntryForm.Вход пользователя ,обновить стейт FailRegistration,IsLoggedIn
  async function handleSubmitLogin(account) {
    try {
      const response = await apiAuthentication.postLoginUser(account);
      setIsFailRegistration(false);
      // localStorage.setItem('jwt', response.token);
      setIsLoggedIn(true);
      setEmail(account.email);
    } catch (error) {
      setRegistrationPopupOpen(true);
      setIsFailRegistration(true);
      setRegistrationText('Что-то пошло не так! Попробуйте ещё раз.');
      console.error(`Ошибка при запросе токена пользователя: ${error}`);
    } finally {
      console.info('Запросе токена пользователя-завершено');
    }
  }
  //Добавление валидации
  const [formValidatorList, setFormValidatorList] = useState({});
  useEffect(() => {
    const arrayPopupForm = Array.from(document.querySelectorAll('.popup__form'));
    const validators = {};
    arrayPopupForm.forEach(elementForm => {
      const instanceFormValidator = new FormValidator(elementForm);
      const formName = elementForm.getAttribute('name');
      validators[formName] = instanceFormValidator;
      instanceFormValidator.enableValidation();
    });
    setFormValidatorList(validators);
  }, []);
  //console.log(formValidatorList);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} onExit={handleExit} />
      <Routes>
        <Route
          path='/main'
          element={
            <ProtectedRoute
              isLoggedIn={isLoggedIn}
              element={
                <Main
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onIconDeleteClick={handleDeleteIconClick}
                  onCardLike={handleCardLike}
                />
              }
            />
          }
        />
        <Route path='/sign-in' element={<Login onSubmit={handleSubmitLogin} />} />
        <Route path='/sign-up' element={<Register onSubmit={handleSubmitRegistration} />} />
        <Route
          path='/'
          element={isLoggedIn ? <Navigate to='/main' /> : <Navigate to='/sign-in' />}
        />
      </Routes>
      <Footer />
      {/* === Popup редактирование профиля ===*/}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoad={isLoad}
        handleOverlayPopupClick={closePopupOnOverlayClick}
      />
      {/* === Popup редактирование аватара ===*/}
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoad={isLoad}
        handleOverlayPopupClick={closePopupOnOverlayClick}
      />
      {/* === Popup добавление карточки ===*/}
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleAddPlaceSubmit}
        onAddPlace={handleAddPlaceSubmit}
        isLoad={isLoad}
        handleOverlayPopupClick={closePopupOnOverlayClick}
      />
      {/* === Popup подтверждения удаления карточки ===*/}
      <PopupWithForm
        namePopup='popupConfirm'
        popupTitle='Вы уверены?'
        textSubmitButton={isLoad ? 'Удаление...' : 'Да'}
        isOpen={isConfirmPopupOpen}
        onClose={closeAllPopups}
        onSubmit={handleConfirmDeleteCard}
        handleOverlayPopupClick={closePopupOnOverlayClick}
      ></PopupWithForm>
      {/* === Popup увеличенной картинки карточки ===*/}
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        handleOverlayPopupClick={closePopupOnOverlayClick}
      />
      <InfoTooltip
        namePopup='popupRegistration'
        isOpen={isRegistrationPopupOpen}
        onClose={closeAllPopups}
        handleOverlayPopupClick={closePopupOnOverlayClick}
        isFailRegistration={isFailRegistration}
        registrationText={registrationText}
      />
    </CurrentUserContext.Provider>
  );
}
export default App;
/*
  //Добавление карточек на сервер
  useEffect(() => {
    const asyncFn = async () => {
      try {
        const response = await api.postCards();
        console.info(response);
      } catch (error) {
        console.error(`Ошибка при добавлении карточек на  сервер: ${error}`);
      } finally {
        console.info(`Добавление карточек на сервер-завершено`);
      }
    };
    asyncFn();
  }, []);
*/
