import React from 'react';
import { Switch, withRouter, Route, Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import { Layout, Menu, Spin } from 'antd';

import Client from './client';
import JobPlanning from './project/job_planning';
import NotFound from '../error/NotFound';
import ProjectProgress from './project/progress';
import TradesAndActivities from './task';
import TimeEntry from './timesheet/entry';
import TimeEntryApproval from './timesheet/approval';
import BudgetVsActual from './reports/budget_vs_actual';

import PrivateRoute from '../../routes/PrivateRoute';

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

        // ant.design does not support a react wrapper for Menu
        let projectMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.projects)) {
            projectMenu = (
                <Menu.SubMenu key="/app/projects" title={<span>Jobs</span>}>
                    <Menu.Item key="/app/projects/job_planning">
                        <Link to="/app/projects/job_planning">Planning</Link>
                    </Menu.Item>
                    <Menu.Item key="/app/projects/progress">
                        <Link to="/app/projects/progress">Progress</Link>
                    </Menu.Item>
                </Menu.SubMenu>
            );
        }

        let tradesAndActivitiesMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.trades_and_activities)) {
            tradesAndActivitiesMenu = (
                <Menu.Item key="/app/trades_and_activities">
                    <Link to="/app/trades_and_activities">Trades & Activities</Link>
                </Menu.Item>
            );
        }

        let timeEntryMenu = (
            <Menu.Item key="/app/time_entry">
                <Link to="/app/time_entry">Time Entry</Link>
            </Menu.Item>
        );

        let timeEntryApprovalMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.time_entry_approval)) {
            timeEntryApprovalMenu = (
                <Menu.Item key="/app/time_entry_approval">
                    <Link to="/app/time_entry_approval">Time Entry Approval</Link>
                </Menu.Item>
            );
        }

        let clientMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.client)) {
            clientMenu = (
                <Menu.Item key="/app/client">
                    <Link to="/app/client">Client</Link>
                </Menu.Item>
            );
        }

        let reportsMenu = null;
        if (arrayIncludesOneOf(userRoles, allowedRoles.projects)) {
            reportsMenu = (
                <Menu.SubMenu key="/app/reports" title={<span>Reports</span>}>
                    <Menu.Item key="/app/reports/budget_vs_actual">
                        <Link to="/app/reports/budget_vs_actual">Budget Vs Actual</Link>
                    </Menu.Item>
                    {/* <Menu.Item key="/app/reports/report2">
                        <Link to="/app/reports/report2">Report2</Link>
                    </Menu.Item> */}
                </Menu.SubMenu>
            );
        }

        return (
            <Layout className="in-app" hasSider={true}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['/app/projects', '/app/reports']}
                        defaultSelectedKeys={[this.getInitialRedirectURL()]}
                        style={{ height: '100%' }}
                    >
                        {projectMenu}
                        {tradesAndActivitiesMenu}
                        {timeEntryMenu}
                        {timeEntryApprovalMenu}
                        {clientMenu}
                        {reportsMenu}
                    </Menu>
                </Sider>
                <Content className="in-app-content">
                    <Switch>
                        <Redirect from="/app" exact to={this.getInitialRedirectURL()} />
                        <PrivateRoute path="/app/projects/job_planning" component={JobPlanning} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.projects)} />
                        <PrivateRoute path="/app/projects/progress" component={ProjectProgress} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.projects)} />
                        <PrivateRoute path="/app/trades_and_activities" component={TradesAndActivities} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.trades_and_activities)} />
                        <PrivateRoute path="/app/time_entry" component={TimeEntry} authenticated={isAuthenticated} authorized={true} />
                        <PrivateRoute path="/app/time_entry_approval" component={TimeEntryApproval} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.time_entry_approval)} />
                        <PrivateRoute path={`${this.props.match.url}/client`} component={Client} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.client)} />
                        <PrivateRoute path="/app/reports/budget_vs_actual" component={BudgetVsActual} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.reports)} />
                        {/* <PrivateRoute path="/app/reports/report2" component={ProjectProgress} authenticated={isAuthenticated} authorized={arrayIncludesOneOf(userRoles, allowedRoles.reports)} /> */}
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
