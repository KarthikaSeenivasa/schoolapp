import React from 'react';
import { connect } from 'react-redux';
import './style.scss'
import { Layout } from 'antd';

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

export default withRouter(connect()(App));