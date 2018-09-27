import React from 'react';
import { Link, Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import { Layout, Menu, Spin } from 'antd';

import Client from './client/Client';
import ProjectSetup from './project/setup/ProjectSetup';
import NotFound from '../error/NotFound';
import ProjectProgress from './project/progress/ProjectProgress';
import TradesAndActivities from './task/TradesAndActivities';
import TimeEntry from './timesheet/entry/TimeEntry';
import TimeEntryApproval from './timesheet/approval/TimeEntryApproval';
import PrivateRoute from '../../routes/PrivateRoute';

const Sider = Layout.Sider;
const Content = Layout.Content;
const SubMenu = Menu.SubMenu;

class Application extends React.Component {

    render() {
        let { isAuthenticated, userRoles, userLoading } = this.props.user;
        if (userLoading) {
            return (<div className="in-app" style={{ width: '100%', height: '100%', position: 'relative', textAlign: 'center', top: '50%' }}><Spin size="large" /></div>);
        }
        let isEmployee = userRoles.includes('ROLE_EMPLOYEE');
        return (
            <Layout className="in-app" hasSider={true}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['/app/projects']}
                        defaultSelectedKeys={[this.getInitialRedirectURL()]}
                        style={{ height: '100%' }}
                    >
                        {
                            !isEmployee &&
                            <SubMenu key="/app/projects" title={<span>Projects</span>}>
                                <Menu.Item key="/app/projects/setup"><Link to="/app/projects/setup">Project Setup</Link></Menu.Item>
                                <Menu.Item key="/app/projects/progress"><Link to="/app/projects/progress">Progress</Link></Menu.Item>
                            </SubMenu>
                        }
                        {
                            !isEmployee &&
                            <Menu.Item key="/app/trades_and_activities"><Link to="/app/trades_and_activities">Trades & Activities</Link></Menu.Item>
                        }
                        <Menu.Item key="/app/time_entry"><Link to="/app/time_entry">Time Entry</Link></Menu.Item>
                        {
                            !isEmployee &&
                            <Menu.Item key="/app/time_entry_approval"><Link to="/app/time_entry_approval">Time Entry Approval</Link></Menu.Item>
                        }
                        {
                            !isEmployee &&
                            <Menu.Item key="/app/client"><Link to="/app/client">Client</Link></Menu.Item>
                        }
                    </Menu>
                </Sider>
                <Content className="in-app-content">
                    <Switch>
                        <Redirect from="/app" exact to={this.getInitialRedirectURL()} />
                        <PrivateRoute path="/app/projects/setup" component={ProjectSetup} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/projects/progress" component={ProjectProgress} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/trades_and_activities" component={TradesAndActivities} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/time_entry" component={TimeEntry} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/time_entry_approval" component={TimeEntryApproval} authenticated={isAuthenticated} />
                        <PrivateRoute path={`${this.props.match.url}/client`} component={Client} authenticated={isAuthenticated} />
                        <Route component={NotFound} />
                    </Switch>
                </Content>
            </Layout>
        );
    }

    getInitialRedirectURL = () => {
        if (this.props.location.pathname === "/app") {
            let isEmployee = this.props.user.userRoles.includes('ROLE_EMPLOYEE');
            if (isEmployee) {
                return '/app/time_entry';
            }
            return "/app/projects/setup";
        } else {
            return this.props.location.pathname;
        }

    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps)(Application));
