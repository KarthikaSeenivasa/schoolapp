import React from 'react';
import { Menu } from 'antd'
import { Link } from 'react-router-dom';
import { arrayIncludesOneOf } from '../../../utils/Util';
import { allowedRoles } from '../../../actions/UserActions';

export const TradesAndActivitiesMenu = (props) => {
    const { userRoles, ...otherProps } = props;
    if (arrayIncludesOneOf(userRoles, allowedRoles.trades_and_activities)) {
        return (
            <Menu.Item key="/app/trades_and_activities" {...otherProps}>
                <Link to="/app/trades_and_activities">Trades & Activities</Link>
            </Menu.Item>
        );
    }

    return null;
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
    if (arrayIncludesOneOf(userRoles, allowedRoles.time_entry_approval)) {
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
    if (arrayIncludesOneOf(userRoles, allowedRoles.client)) {
        return (
            <Menu.Item key="/app/client" {...otherProps}>
                <Link to="/app/client">Client</Link>
            </Menu.Item>
        );
    }
    return null;
}