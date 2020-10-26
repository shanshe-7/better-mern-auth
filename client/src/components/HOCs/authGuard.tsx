import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default (OriginalComponent: React.FC) => {
  function MixedComponent() {
    const st = useSelector((st: any) => st.auth);
    let history = useHistory();

    useEffect(() => {
      if (!st.authenticated) {
        history.push('/');
      }
    }, [st.authenticated]);
    return <OriginalComponent />;
  }

  return MixedComponent;
};
