import { useContext, useEffect } from 'react';
import AuthContext from '../context/auth';
import { ACCESS_TOKEN } from '../context/types';

function TokenChecker() {
  const authContext = useContext(AuthContext);
  const { setSignedInStatus } = authContext;

  useEffect(() => {
    if (localStorage[ACCESS_TOKEN]) {
      setSignedInStatus();
    }
    // eslint-disable-next-line
  }, []);
  return null;
}

export default TokenChecker;
