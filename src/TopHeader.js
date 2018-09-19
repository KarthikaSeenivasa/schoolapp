import React from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { handleLogout } from './actions/UserActions';

const { Header } = Layout;

class TopHeader extends React.Component {
    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(e) {
        if (e.key === '/logout') {
            this.props.dispatch(handleLogout());
            this.props.history.push("/");
        }
    }
    render() {
        let menuItems = [];
        if (!this.props.user.isAuthenticated) {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
            ]
        } else {
            menuItems = [
                <Menu.Item key="/create_user">
                    <Link to="/create_user">Create User</Link>
                </Menu.Item>,
                <Menu.Item key="/change_password">
                    <Link to="/change_password">Change Password</Link>
                </Menu.Item>,
                <Menu.Item key="/logout" onClick={this.onLogout}>
                    <span>Logout</span>
                </Menu.Item>
            ];
        }
        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title">
                        <Link to="/">Esskay Design and Structures</Link>
                    </div>
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                    >
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(TopHeader));