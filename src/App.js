import React from 'react';
import { connect } from 'react-redux';
import './style.scss'
import { Layout, Spin } from 'antd';

import { getLoggedInUserDetailsIfAuthenticated } from './actions/UserActions';

import Routes from './routes/Routes';
import TopHeader from './TopHeader';
import { withRouter } from 'react-router-dom';
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
                    <Routes />
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