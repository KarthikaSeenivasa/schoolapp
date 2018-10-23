import axios from "axios";
import { ACCESS_TOKEN, showSuccessNotification, showFailureNotification } from '../utils/Util';

export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_ROLES = "SET_ROLES";
export const SET_ROLES_LOADING = "SET_ROLES_LOADING";

const DEV_SERVER = "http://kira:8080";

const SIGN_IN_API = DEV_SERVER + "/api/auth/signin";

const SIGN_UP_API = DEV_SERVER + "/api/auth/signup";

const CHANGE_PASSWORD_API = DEV_SERVER + "/api/auth/change-password";

const CHECK_USERNAME_AVAILABILITY_API = DEV_SERVER + "/api/user/checkUsernameAvailability";

const CHECK_EMAIL_AVAILABILITY_API = DEV_SERVER + "/api/user/checkEmailAvailability";

const PROFILE_API = DEV_SERVER + "/api/user/profile";

const ROLES_API = DEV_SERVER + "/api/roles/all";

export const allowedRoles = {
    "create_user": ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_COORDINATOR'],
    "projects": ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_COORDINATOR', 'ROLE_LEADER'],
    "trades_and_activities": ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_LEADER'],
    "time_entry_approval": ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_LEADER'],
    "client": ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_COORDINATOR'],
    "reports" : ['ROLE_ADMIN', 'ROLE_MANAGEMENT', 'ROLE_COORDINATOR', 'ROLE_LEADER']
}
export const workplaceCodes =
    [
        {
            name: 'Chennai',
            value: "CHENNAI"
        },
        {
            name: 'Trichy',
            value: "TRICHY"
        }
    ];

export function getLoggedInUserDetailsIfAuthenticated() {
    return (dispatch, getState) => {
        if (!localStorage.getItem(ACCESS_TOKEN)) {
            dispatch(setUserLoading(false));
            return;
        } else {
            dispatch(setIsAuthenticated(true));
            dispatch(getLoggedInUser());
        }
    }
}

export function handleLogin(usernameOrEmail, password) {

    return (dispatch, getState) => {
        const params = {
            usernameOrEmail,
            password
        }

        axios.post(SIGN_IN_API, params).then((response) => {
            localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
            dispatch(setIsAuthenticated(true));

            showSuccessNotification('You\'re logged in successfully');

            dispatch(getLoggedInUser());

        }).catch((err) => {
            if (err.response.status === 401) {
                showFailureNotification('Your username or password is wrong');
            }

        });
    }
}

export function handleLogout() {
    return (dispatch, getState) => {
        localStorage.removeItem(ACCESS_TOKEN);
        axios.defaults.headers.common['Authorization'] = '';

        dispatch(setIsAuthenticated(false));

        showSuccessNotification("You're successfully logged out");
    }
}

export function handleChangePassword(oldPassword, newPassword) {

    return (dispatch, getState) => {
        const params = {
            oldPassword,
            newPassword
        }

        axios.put(CHANGE_PASSWORD_API, params).then((response) => {
            if(response.data.success){
                showSuccessNotification('Changed password successfully');
            } else {
                showFailureNotification(response.data.message);
            }

        }).catch((err) => {
            if (err.response.status === 401) {
                showFailureNotification('Your username or password is wrong');
            }

        });
    }
}


export function createUser(username, email, name, password, role, isEmployee, employeeNumber, reportingTo) {
    return (dispatch, getState) => {
        const data = {
            username,
            email,
            name,
            password,
            roles: [role],
            isEmployee,
            employeeNumber,
            reportingTo
        }
        axios.post(SIGN_UP_API, data)
            .then((response) => {
                showSuccessNotification("Created the user successfully");
            }).catch((err) => {
                showFailureNotification("Unable to create the user");
            });
    }
}

export function checkUsernameAvailability(rule, username, callback) {
    const params = {
        username
    };
    axios.get(CHECK_USERNAME_AVAILABILITY_API, { params })
        .then((response) => {
            if (!response.data.available) {
                callback(['User name already exists']);
                return;
            }
            callback();

        }).catch((err) => {
            callback(['Unable to check if the user name is available']);
        });
}

export function checkEmailAvailability(rule, email, callback) {
    const params = {
        email
    };
    axios.get(CHECK_EMAIL_AVAILABILITY_API, { params })
        .then((response) => {
            if (!response.data.available) {
                callback(['Email already exists']);
                return;
            }
            callback();
        }).catch((err) => {
            callback(['Unable to check if the email is available']);
        });
}

export function getAllRoles() {
    return (dispatch, getState) => {
        if (getState().user.roles.length > 0) {
            return;
        }
        dispatch(setRolesLoading(true));
        axios.get(ROLES_API)
            .then((response) => {
                dispatch(setRoles(response.data.payload));
                dispatch(setRolesLoading(false));
            });
    }
}

function getLoggedInUser() {
    return (dispatch, getState) => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
        dispatch(setUserLoading(true));
        axios.get(PROFILE_API)
            .then((response) => {
                let { id, username, email, name } = response.data;
                let userRoles = response.data.roles;
                let isLead = false;
                if (userRoles.includes('ROLE_LEADER') || userRoles.includes('ROLE_MANAGEMENT')) {
                    isLead = true;
                }
                dispatch(setUserDetails(id, username, email, name, userRoles, isLead));
                showSuccessNotification("Welcome " + name);
                dispatch(setUserLoading(false));
            }).catch((err) => {
                if(err.response.status === 401) {
                    dispatch(handleLogout());
                    return;
                }
                showFailureNotification('Unable to fetch user details');
            });
    }
}

function setIsAuthenticated(isAuthenticated) {
    return {
        type: SET_IS_AUTHENTICATED,
        isAuthenticated
    }
}

function setUserDetails(id, username, email, name, userRoles, isLead) {
    return {
        type: SET_USER_DETAILS,
        id,
        username,
        email,
        name,
        userRoles,
        isLead
    }
}

function setRoles(roles) {
    setDisplayNameForRoles(roles);
    return {
        type: SET_ROLES,
        roles
    }
}

function setRolesLoading(rolesLoading) {
    return {
        type: SET_ROLES_LOADING,
        rolesLoading
    }
}

function setDisplayNameForRoles(roles) {
    for (let role of roles) {
        role.displayName = role.name.split('_')[1].toLowerCase();
    }
}

function setUserLoading(loading) {
    return {
        type: SET_USER_LOADING,
        loading
    }
}
