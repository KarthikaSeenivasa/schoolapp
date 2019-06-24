import React from 'react';
import { notification, Tag } from 'antd';
import axios from 'axios';
import { statusCodes } from '../actions/ProjectActions';

export const ACCESS_TOKEN = "accessToken";

export const NOTIFICATION_MESSAGE = "Esskay Design and Structures";

export const DATE_FORMAT = "DD-MM-YYYY";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

notification.config({
    placement: 'topRight',
    top: 70,
    duration: 3,
});


export function findIndexOf(array, id) {
    var index = array.findIndex(function (array) {
        return array.id === id;
    })
    return index;
}

export function arrayIncludesOneOf(array, input) {
    for (var i = 0; i < input.length; i++) {
        if (array.includes(input[i])) {
            return true;
        }
    }
    return false;
}

export function showFailureNotification(description) {
    notification.error({
        message: NOTIFICATION_MESSAGE,
        description: description
    });
}

export function showSuccessNotification(description) {
    notification.success({
        message: NOTIFICATION_MESSAGE,
        description: description,
    });
}

export function renderDate(text, record) {
    if (text) {
        return new Date(text).toLocaleDateString();
    }
    return '-';
}

export function renderStatus(text, record) {
    if (text) {
        for (const statusCode of statusCodes) {
            if (statusCode.value === text) {
                return (<Tag color={statusCode.tagColor}> {statusCode.name} </Tag>);
            }
        }
    }
    return '-';
}

export function getDateParam(date) {
    if (date !== undefined) {
        if (date !== null) {
            date = date.startOf('day');
            return date.unix() * 1000;
        }
        return null;
    }
    return undefined;
}

export function validateNumberForForm(rule, value, callback) {
    if (!value) {
        callback();
        return;
    }
    isNaN(value) ? callback('This field should be a number') : callback();
}

export function validateAlphaNumericForForm(rule, value, callback) {
    if (!value) {
        callback();
        return;
    }
    /[^A-Z0-9]/.test(value) ? callback('This field should contain numbers and capital letters only') : callback();
}

export function isEqual(value1, value2) {
    return value1 === value2;
}

export function compareDates(momentValue, value) {
    if (momentValue) {
        if (value) {
            return (getDateParam(momentValue) === value);
        } else {
            return false;
        }
    } else if (value) {
        return false;
    } else {
        return true;
    }

}

