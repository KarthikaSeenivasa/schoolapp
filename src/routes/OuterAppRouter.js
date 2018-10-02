import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import NotFound from '../components/error/NotFound';
import PrivateRoute from './PrivateRoute';
import Login from '../user/Login';
import Application from '../components/app/Application';
import ChangePassword from '../user/ChangePassword';
import CreateUser from '../user/CreateUser';

import { arrayIncludesOneOf } from '../utils/Util';
import { allowedRoles } from '../actions/UserActions';

const OuterAppRouter = (props) => {

    if (props.userRoles.length === 0) {
        return null;
    }

    return (
        <Switch>
            <Route path="/login" component={Login} />
            <PrivateRoute path="/app" component={Application} authenticated={props.isAuthenticated} authorized={true} />
            <PrivateRoute path="/change_password" component={ChangePassword} authenticated={props.isAuthenticated} authorized={true} />
            <PrivateRoute path="/create_user" component={CreateUser} authenticated={props.isAuthenticated} authorized={arrayIncludesOneOf(props.userRoles, allowedRoles.create_user)} />
            <Redirect from="/" exact to="/login" />
            <Route component={NotFound} />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        userRoles: state.user.userRoles
    }
}
export default withRouter(connect(mapStateToProps)(OuterAppRouter));