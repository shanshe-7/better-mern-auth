import React from 'react';
import classes from './Secret.module.css';
import { useSelector } from 'react-redux';

export default function Secret() {
  let secretStore = useSelector((st: any) => st.auth);
  return (
    <>
      {!secretStore.authenticated ? (
        <div className={classes.loaderDiv}>
          <div className={classes.loader}></div>
        </div>
      ) : (
        <p className={classes.Secret}>
          You now can access secret: {secretStore.resourse}{' '}
        </p>
      )}
    </>
  );
}
