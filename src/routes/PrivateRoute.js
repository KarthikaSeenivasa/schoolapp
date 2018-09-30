import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, authenticated, authorized, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (authenticated && authorized) {
        return (
          <Component {...rest} {...props} />
        )
      }
      
      return (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
    }
  />
);

export default PrivateRoute;