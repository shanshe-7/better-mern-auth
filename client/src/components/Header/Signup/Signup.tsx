import React from 'react';
import { useForm } from 'react-hook-form';
import store from '../../../redux/store/store';
import {
  passwordConfirmValidation,
  signUp,
} from '../../../redux/slices/authSlice';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import classes from './Signup.module.css';

export default function Signup() {
  const { handleSubmit, register, errors } = useForm();
  let signUpState = useSelector((st: any) => st.auth);
  let history = useHistory();

  const onSubmit = (data: any) => {
    if (data.password === data.confirm) {
      delete data.confirm;
      store.dispatch(signUp(data)).then((signUpPromise) => {
        if (signUpPromise.type === 'users/signup/fulfilled') {
          history.push('/');
        }
      });
    } else {
      store.dispatch(passwordConfirmValidation());
    }
  };

  return (
    <>
      <div className={classes.mainDiv}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.formInput}>
            <label id='firstname'>Firstname:</label>
            <input
              className={classes.input}
              name='firstname'
              autoComplete='on'
              ref={register({ required: true })}
            />
          </div>
          {errors.firstname && (
            <p className={classes.errors}>This field is required</p>
          )}
          <div className={classes.formInput}>
            <label id='lastname'>Lastname:</label>
            <input
              className={classes.input}
              name='lastname'
              autoComplete='on'
              ref={register({ required: true })}
            />
          </div>
          {errors.lastname && (
            <p className={classes.errors}>This field is required</p>
          )}
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

          <div className={classes.formInput}>
            <label id='confirm'>Confirm Password:</label>
            <input
              type='password'
              className={classes.input}
              name='confirm'
              autoComplete='off'
              ref={register({ required: true })}
            />
          </div>
          {errors.confirm && (
            <p className={classes.errors}>This field is required</p>
          )}

          <input
            className={classes.submitInput}
            type='submit'
            autoComplete='on'
            value='Sign Up'
          />
          {signUpState.errorMessage ? (
            <p className={classes.errors}>{signUpState.errorMessage}</p>
          ) : null}
        </form>
      </div>
    </>
  );
}
