import React from 'react';
import Card from '../Card/Card';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import EditAvatar from '../EditAvatar/EditAvatar';
import { Route, NavLink } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import { useActions } from '../../reducers/useActions';
import List from '../List/List';
import useTravlrsApi from '../../hooks/useTravlrsApi';

const Main = () => {
  const {
    userInfo: { userName, userDescription, userAvatar, userId },
    openedPopup,
  } = useSelector(({ app }) => app);
  const { cards, users } = useSelector(({ cards }) => cards);
  const { onDeleteCardSubmit } = useTravlrsApi();

  const sortedFavorites = cards
    .filter((card) => card.likes.some(({ _id }) => userId === _id))
    .sort((a, b) => {
      return b.likes.length - a.likes.length;
    });
  const {
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,    
  } = useActions();

  return (
    <>
      <main className='content'>
        <section className='profile page__section'>
          <div
            className='profile__image'
            onClick={openEditAvatarPopup}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className='profile__info'>
            <h1 className='profile__title'>{userName}</h1>
            <button className='profile__edit-button' type='button' onClick={openEditProfilePopup}></button>
            <p className='profile__description'>{userDescription}</p>
          </div>
          <button className='profile__add-button' type='button' onClick={openAddPlacePopup}></button>
        </section>
        <div className='tabs page__section'>
          <NavLink to='/cards/' className='tab' activeClassName='tab_active'>
            Места
          </NavLink>
          <NavLink to='/friends/' className='tab' activeClassName='tab_active'>
            Друзья
          </NavLink>
          <NavLink
            style={{ marginLeft: 'auto' }}
            to='/favorite/'
            className='tab'
            activeClassName='tab_active'
          >
            <div className={`card__like-button card__like-button_is-active`}></div>
          </NavLink>
        </div>
        <section className='places page__section'>
          <Route exact path='/' render={WelcomeScreen} />
          <Route
            path='/cards/:id?'
            render={() => {
              return <List itemComponent={Card} items={cards} />;
            }}
          />
          <Route
            path='/friends/:id?'
            render={() => {
              return <List itemComponent={FriendCard} items={users} />;
            }}
          />
          <Route
            path='/favorite/:id?'
            render={() => {
              return <List itemComponent={Card} items={sortedFavorites} />;
            }}
          />
        </section>
      </main>
      {openedPopup.isEditProfilePopupOpen && <EditForm title='Редактировать профиль' name='edit' />}
      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm title='Предложить место' name='new-card'>
          <PlaceForm />
        </PopupWithForm>
      )}
      {openedPopup.isDeleteCardPopupOpened && (
        <PopupWithForm title='Вы уверены?' name='remove-card'>
          <form className='popup__form' name='remove-card' noValidate>
            <button type='submit' className='button popup__button' onClick={onDeleteCardSubmit}>
              Да
            </button>
          </form>
        </PopupWithForm>
      )}
      ;
      {openedPopup.isEditAvatarPopupOpen && (
        <PopupWithForm title='Обновить аватар' name='edit-avatar'>
          <EditAvatar />
        </PopupWithForm>
      )}
    </>
  );
};

export default Main;

//             <Route
//               path='/cards/'
//               render={() => {
//                 return cardsElems;
//               }}
//             />
//             <Route
//               path='/friends/'
//               render={() => {
//                 return friends;
//               }}
//             />
//             <Route
//               path='/favorite/'
//               render={() => {
//                 return favorites;
//               }}
//             />

// <Route
//         path='/cards/:id'
//         render={({ match, history }) => {
//           const id = match.params.id;
//           const currentCard = cards.find(({ _id }) => id === _id);
//           console.log(currentCard);
//           return (
//             (currentCard && <ImagePopup card={currentCard} onClose={() => history.push('/cards/')} />) || (
//               <Spinner />
//             )
//           );
//         }}
//       />
//       <Route
//         path='/friends/:id'
//         render={({ match, history }) => {
//           const id = match.params.id;
//           const currentUser = users.find(({ _id }) => id === _id);
//           return (
//             (currentUser && <ImagePopup card={currentUser} onClose={() => history.push('/friends/')} />) || (
//               <Spinner />
//             )
//           );
//         }}
//       />
//       <Route
//         path='/favorite/:id'
//         render={({ match, history }) => {
//           const id = match.params.id;
//           const currentCard = cards.find(({ _id }) => id === _id);
//           return (
//             (currentCard && <ImagePopup card={currentCard} onClose={() => history.push('/favorite/')} />) || (
//               <Spinner />
//             )
//           );
//         }}
//       />
