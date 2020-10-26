import React from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { signIn } from '../../../redux/slices/authSlice';
import classes from './Signin.module.css';
import store from '../../../redux/store/store';

export default function Signin() {
  const { handleSubmit, register, errors } = useForm();
  let history = useHistory();
  let signInState = useSelector((st: any) => st.auth);

  const submit = (data: any) => {
    store.dispatch(signIn(data)).then((signInPromise) => {
      if (signInPromise.type === 'users/signin/fulfilled') {
        history.push('/');
      }
    });
  };

  return (
    <>
      <div className={classes.mainDiv}>
        <form className={classes.form} onSubmit={handleSubmit(submit)}>
          <div className={classes.formInput}>
            <label id='email'>Email:</label>
            <input
              className={classes.input}
              name='email'
              autoComplete='on'
              ref={register({ required: true })}
            />
          </div>
          {errors.email && (
            <p className={classes.errors}>This field is required</p>
          )}
          <div className={classes.formInput}>
            <label id='password'>Password:</label>
            <input
              type='password'
              className={classes.input}
              name='password'
              autoComplete='off'
              ref={register({ required: true })}
            />
          </div>
          {errors.password && (
            <p className={classes.errors}>This field is required</p>
          )}
          <input
            className={classes.submitInput}
            type='submit'
            value='Sign In'
            autoComplete='on'
          />
          {signInState.errorMessage ? (
            <p className={classes.errors}>{signInState.errorMessage}</p>
          ) : null}
        </form>
      </div>
    </>
  );
}
