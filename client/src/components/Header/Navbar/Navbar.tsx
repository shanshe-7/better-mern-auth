import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  signOut,
  clearErrorMessages,
  fetchSecretResours,
} from '../../../redux/slices/authSlice';
import store from '../../../redux/store/store';
import classes from './Navbar.module.css';

export default function Navbar() {
  let signInState = useSelector((st: any) => st.auth);
  const hanldeClick = () => {
    store.dispatch(signOut());
  };

  const handleSignIn = () => {
    store.dispatch(clearErrorMessages());
  };

  const handleSignUP = () => {
    store.dispatch(clearErrorMessages());
  };

  const handleSecret = () => {
    store.dispatch(fetchSecretResours());
  };
  return (
    <>
      <nav className={classes.navbar}>
        <ul className={classes.HomeAndSecret}>
          <li>
            <Link className={classes.Links} to='/'>
              Home
            </Link>
          </li>
          <li onClick={handleSecret}>
            <Link
              style={{
                backgroundColor: signInState.authenticated
                  ? ' #00ff7f'
                  : '#ec5990',
                color: signInState.authenticated ? '#050709' : 'white',
              }}
              className={classes.Links}
              to='/secret'
            >
              {' '}
              Secret{' '}
            </Link>
          </li>
        </ul>

        <ul className={classes.sign}>
          {signInState.authenticated ? (
            <li onClick={hanldeClick}>
              <Link className={classes.Links} to='/'>
                Sign Out
              </Link>
            </li>
          ) : (
            <>
              <li onClick={handleSignIn}>
                <Link className={classes.Links} to='/signin'>
                  Sign In
                </Link>
              </li>
              <li onClick={handleSignUP}>
                <Link className={classes.Links} to='/signup'>
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
