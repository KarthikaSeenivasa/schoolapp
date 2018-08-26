import React from 'react';
import { Route } from 'react-router-dom';

const RouteWithSubRoutes = (routeProps) => {
    return (
        <Route
            path={routeProps.path}
            render={props => (
                <routeProps.component {...props} routes={routeProps.routes} />
            )} />
    );
}

export default RouteWithSubRoutes;
