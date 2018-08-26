import React from 'react';
import { Link, Switch, withRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import { Layout, Menu } from 'antd';

import RouteWithSubRoutes from '../../routes/RouteWithSubRoutes';
import Dashboard from './Dashboard';
import Routes from '../../routes/Routes';
import HighLevelSchedule from './project/HighLevelSchedule';
import NotFound from '../error/NotFound';
import DetailedSchedule from './project/DetailedSchedule';
import TaskMaster from './task/TaskMaster';
import TimeEntry from './timesheet/TimeEntry';
import TimeEntryApproval from './timesheet/TimeEntryApproval';
import PrivateRoute from '../../routes/PrivateRoute';

const Sider = Layout.Sider;
const Content = Layout.Content;
const SubMenu = Menu.SubMenu;

class Application extends React.Component {

    constructor(props) {
        super(props);
        this.getInitialRedirectURL = this.getInitialRedirectURL.bind(this);
    }

    render() {
        let { isAuthenticated } = this.props.user;
        return (
            <Layout className="in-app" hasSider={true}>
                <Sider>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={this.props.location.pathname.includes('project_details') ? ['/app/project_details'] : []}
                        defaultSelectedKeys={[this.props.location.pathname]}
                        style={{ height: '100%' }}
                    >
                        <Menu.Item key="/app/dashboard"><Link to="/app/dashboard">Dashboard</Link></Menu.Item>
                        <SubMenu key="/app/project_details" title={<span>Project Details</span>}>
                            <Menu.Item key="/app/project_details/high_level_schedule"><Link to="/app/project_details/high_level_schedule">High Level Schedule</Link></Menu.Item>
                            <Menu.Item key="/app/project_details/detailed_schedule"><Link to="/app/project_details/detailed_schedule">Detailed Schedule</Link></Menu.Item>
                        </SubMenu>
                        <Menu.Item key="/app/task_master"><Link to="/app/task_master">Task Master</Link></Menu.Item>
                        <Menu.Item key="/app/time_entry"><Link to="/app/time_entry">Time Entry</Link></Menu.Item>
                        <Menu.Item key="/app/time_entry_approval"><Link to="/app/time_entry_approval">Time Entry Approval</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Content className="in-app-content">
                    <Switch>
                        <Redirect from="/app" exact to={this.getInitialRedirectURL()} />
                        <PrivateRoute path={`${this.props.match.url}/dashboard`} component={Dashboard} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/project_details/high_level_schedule" component={HighLevelSchedule} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/project_details/detailed_schedule" component={DetailedSchedule} authenticated={isAuthenticated} />
                        <PrivateRoute path="/app/task_master" component={TaskMaster} authenticated={isAuthenticated}/>
                        <PrivateRoute path="/app/time_entry" component={TimeEntry} authenticated={isAuthenticated}/>
                        <PrivateRoute path="/app/time_entry_approval" component={TimeEntryApproval} authenticated={isAuthenticated}/>
                        <Route component={NotFound} />
                    </Switch>
                </Content>
            </Layout>
        );
    }

    getInitialRedirectURL() {
        return "/app/project_details/high_level_schedule";
    }

}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
};

export default withRouter(connect(mapStateToProps)(Application));
