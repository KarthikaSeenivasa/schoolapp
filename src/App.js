import React from 'react';
import { connect } from 'react-redux';
import './style.scss'
import { Layout, Spin } from 'antd';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';

import TopHeader from './TopHeader';
import NotFound from './components/error/NotFound';
import PrivateRoute from './routes/PrivateRoute';
import Login from './user/Login';
import Application from './components/app/Application';
import ChangePassword from './user/ChangePassword';
import CreateUser from './user/CreateUser';

import { arrayIncludesOneOf } from './utils/Util';
import { allowedRoles } from './actions/UserActions';
import { getLoggedInUserDetailsIfAuthenticated } from './actions/UserActions';

const { Content } = Layout;

class App extends React.Component {

    componentWillMount() {
        this.props.dispatch(getLoggedInUserDetailsIfAuthenticated());
    }

    render() {
        if (this.props.loading && this.props.isAuthenticated) {
            return (
                <div className="load-con">
                    <Spin />
                </div>
            )
        }

        return (
            <Layout className="app-container" hasSider={true}>
                <TopHeader />
                <Content className="app-content">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <PrivateRoute path="/app" component={Application} authenticated={this.props.isAuthenticated} authorized={true} />
                        <PrivateRoute path="/change_password" component={ChangePassword} authenticated={this.props.isAuthenticated} authorized={true} />
                        <PrivateRoute path="/create_user" component={CreateUser} authenticated={this.props.isAuthenticated} authorized={arrayIncludesOneOf(this.props.userRoles, allowedRoles.create_user)} />
                        <Redirect from="/" exact to="/login" />
                        <Route component={NotFound} />
                    </Switch>
                </Content>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.user.userLoading,
        userRoles: state.user.userRoles,
        isAuthenticated: state.user.isAuthenticated
    }
}
export default withRouter(connect(mapStateToProps)(App));