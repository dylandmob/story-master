import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/auth';

// For future use, also should a private route for DMs of that campaign

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route>
      {...rest}
      render=
      {props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/sign-in" />
        ) : (
          <Component {...props} />
        )
      }
    </Route>
  );
};
