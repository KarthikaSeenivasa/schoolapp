import React from 'react';
import { connect } from 'react-redux';

import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import { handleLogout, allowedRoles } from './actions/UserActions';
import { arrayIncludesOneOf } from './utils/Util';

const { Header } = Layout;

class TopHeader extends React.Component {

    onLogout = (e) => {
        if (e.key === '/logout') {
            this.props.dispatch(handleLogout());
            this.props.history.push("/");
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.user.isAuthenticated !== nextProps.user.isAuthenticated){
            if(!nextProps.user.isAuthenticated){
                this.menuItems = [
                    <Menu.Item key="/login">
                        <Link to="/login">Login</Link>
                    </Menu.Item>
                ]
            }
        }
    }

    componentWillMount() {
        this.menuItems = [];
        let { user } = this.props;
        
        if (!user.isAuthenticated) {
            this.menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
            ]
        } else {
            this.menuItems = [
                <Menu.Item key="/change_password">
                    <Link to="/change_password">Change Password</Link>
                </Menu.Item>,
                <Menu.Item key="/logout" onClick={this.onLogout}>
                    <span>Logout</span>
                </Menu.Item>
            ];

            if (arrayIncludesOneOf(user.userRoles, allowedRoles.create_user)) {
                this.menuItems.unshift(
                    <Menu.Item key="/create_user">
                        <Link to="/create_user">Create User</Link>
                    </Menu.Item>
                );
            }
        }
    }

    render() {

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
                        {this.menuItems}
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