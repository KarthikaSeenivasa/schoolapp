import React from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Dropdown } from 'antd';
const Header = Layout.Header;

class TopHeader extends React.Component {
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
                <Menu.Item key="/change_password">
                    <Link to="/change_password">Change Password</Link>
                </Menu.Item>,
                <Menu.Item key="/logout">
                    <Link to="/logout">Logout</Link>
                </Menu.Item>
            ];
        }
        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title" >
                        Enterprise Monitoring Tool
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