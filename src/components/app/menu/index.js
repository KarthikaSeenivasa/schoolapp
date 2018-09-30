import React from 'react';
import { Menu } from 'antd'
import { Link } from 'react-router-dom';
import { arrayIncludesOneOf } from '../../../utils/Util';

export const TradesAndActivitiesMenu = (props) => {
    const { userRoles, ...otherProps } = props;
    if (arrayIncludesOneOf(userRoles, 'ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_LEADER')) {
        return (
            <Menu.Item key="/app/trades_and_activities" {...otherProps}>
                <Link to="/app/trades_and_activities">Trades & Activities</Link>
            </Menu.Item>
        );
    }
}

export const TimeEntryMenu = (props) => {
    return (
        <Menu.Item key="/app/time_entry" {...props}>
            <Link to="/app/time_entry">Time Entry</Link>
        </Menu.Item>
    );
}

export const TimeEntryApprovalMenu = (props) => {
    const { userRoles, ...otherProps } = props;
    if (arrayIncludesOneOf(userRoles, 'ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_LEADER')) {
        return (
            <Menu.Item key="/app/time_entry_approval" {...otherProps}>
                <Link to="/app/time_entry_approval">Time Entry Approval</Link>
            </Menu.Item>
        );
    }
    return null;
}

export const ClientMenu = (props) => {
    const { userRoles, ...otherProps } = props;
    if (arrayIncludesOneOf(userRoles, 'ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_COORDINATOR')) {
        return (
            <Menu.Item key="/app/client" {...otherProps}>
                <Link to="/app/client">Client</Link>
            </Menu.Item>
        );
    }
    return null;
}