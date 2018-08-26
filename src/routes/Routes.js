import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import RouteWithSubRoutes from './RouteWithSubRoutes';
import NotFound from '../components/error/NotFound';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import Login from '../user/Login';
import Application from '../components/app/Application';

class Routes extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/app" component={Application} authenticated={this.props.isAuthenticated} />
                <Route exact path="/" render={() => (
                    this.props.isAuthenticated ? (
                        <Redirect to="/app" />
                    ) : (
                            <Login />
                        )
                )} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated
    }
}

export default withRouter(connect(mapStateToProps)(Routes)); 
