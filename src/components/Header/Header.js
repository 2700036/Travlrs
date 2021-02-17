import React from 'react';
import logo from '../../images/logo.ico';
import { Route, Link, useHistory } from 'react-router-dom'
import { useActions } from '../../reducers/useActions';

const Header = ({isLoggedIn, userEmail}) => {
  const {logOut, updateUserInfo} = useActions();
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    logOut();
    updateUserInfo({
      userName: '',
    userDescription: '',
    userAvatar: '',
    userId: '',
    userEmail: ''
    })
    history.push("/login");
  }
  return (
    <header className="header page__section">
      <img src={logo} className='logo'/>
    <h1 className="header__logo">Travlrs.</h1>
    <Route exact  path='/login'>
      <Link to='/register' className='signup__link'>
      Регистрация
      </Link>
    </Route>
    <Route exact path='/register'>
      <Link to='/login' className='signup__link'>
      Войти
      </Link>
    </Route>
    {isLoggedIn && (
      <>
    <p className='header__email'>{userEmail}</p>
    <button onClick={signOut} className='signout__link'>
        Выйти
        </button>
        </>
        )      
}
  </header>
  )
};

export default Header;

