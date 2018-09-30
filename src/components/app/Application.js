import React from 'react';
import { Switch, withRouter, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import { Layout, Menu, Spin } from 'antd';

import Client from './client/Client';
import JobPlanning from './project/setup/JobPlanning';
import NotFound from '../error/NotFound';
import ProjectProgress from './project/progress/ProjectProgress';
import TradesAndActivities from './task/TradesAndActivities';
import TimeEntry from './timesheet/entry/TimeEntry';
import TimeEntryApproval from './timesheet/approval/TimeEntryApproval';
import PrivateRoute from '../../routes/PrivateRoute';
import {
    TradesAndActivitiesMenu,
    TimeEntryMenu,
    ClientMenu,
    TimeEntryApprovalMenu
} from './menu';
import { arrayIncludesOneOf } from '../../utils/Util';
import { allowedRoles } from '../../actions/UserActions';

const Sider = Layout.Sider;
const Content = Layout.Content;

class Application extends React.Component {

    render() {
        let { isAuthenticated, userRoles, userLoading } = this.props.user;

        if (userLoading) {
            return (
                <div className="in-app" style={{ width: '100%', height: '100%', position: 'relative', textAlign: 'center', top: '50%' }}>
                    <Spin size="large" />
                </div>
            );
        }

        // ant.design does not support a react wrapper for SubMenu
        let projectMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.projects)) {
            projectMenu = (
                <Menu.SubMenu key="/app/projects" title={<span>Projects</span>}>
                    <Menu.Item key="/app/projects/job_planning">
                        <Link to="/app/projects/job_planning">Job Planning</Link>
                    </Menu.Item>
                    <Menu.Item key="/app/projects/progress">
                        <Link to="/app/projects/progress">Progress</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            );
        }

        return (
            <Layout className="in-app" hasSider={true}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['/app/projects']}
                        defaultSelectedKeys={[this.getInitialRedirectURL()]}
                        style={{ height: '100%' }}
                    >
                        {projectMenu}
                        <TradesAndActivitiesMenu userRoles={userRoles} />
                        <TimeEntryMenu />
                        <TimeEntryApprovalMenu userRoles={userRoles} />
                        <ClientMenu userRoles={userRoles} />
                    </Menu>
                </Sider>
                <Content className="in-app-content">
                    <Switch>
                        <Redirect from="/app" exact to={this.getInitialRedirectURL()} />
                        <PrivateRoute path="/app/projects/job_planning" component={JobPlanning} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.projects)} />
                        <PrivateRoute path="/app/projects/progress" component={ProjectProgress} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.projects)} />
                        <PrivateRoute path="/app/trades_and_activities" component={TradesAndActivities} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.trades_and_activities)} />
                        <PrivateRoute path="/app/time_entry" component={TimeEntry} authenticated={isAuthenticated} authorized={true} />
                        <PrivateRoute path="/app/time_entry_approval" component={TimeEntryApproval} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.time_entry_approval)}  />
                        <PrivateRoute path={`${this.props.match.url}/client`} component={Client} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.client)}  />
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
            return "/app/projects/job_planning";
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
