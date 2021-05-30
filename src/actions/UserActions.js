import axios from "axios";
import { ACCESS_TOKEN, showSuccessNotification, showFailureNotification } from '../utils/Util';

export const SET_IS_AUTHENTICATED = "SET_IS_AUTHENTICATED";
export const SET_USER_DETAILS = "SET_USER_DETAILS";
export const SET_EDITED_USER_DETAILS = "SET_EDITED_USER_DETAILS";
export const SET_USER_LOADING = "SET_USER_LOADING";
export const SET_ROLES = "SET_ROLES";
export const SET_ROLES_LOADING = "SET_ROLES_LOADING";

const PROD_SERVER = "";
const DEV_SERVER = process.env.NODE_ENV == "production" ? PROD_SERVER : "http://localhost";

const SIGN_IN_API = DEV_SERVER + "/api/auth/signin";

const SIGN_UP_API = DEV_SERVER + "/api/auth/signup";

const EDIT_USER_API = DEV_SERVER + "/api/user/editUser";
const GET_USER_API = DEV_SERVER + "/api/user/getUser";
const DELETE_USER_API = DEV_SERVER + "/api/user/removeUser";

const CHANGE_PASSWORD_API = DEV_SERVER + "/api/auth/change-password";

const NEW_PASSWORD_API = DEV_SERVER + "/api/auth/new-password";

const CHECK_USERNAME_AVAILABILITY_API = DEV_SERVER + "/api/user/checkUsernameAvailability";

const CHECK_EMAIL_AVAILABILITY_API = DEV_SERVER + "/api/user/checkEmailAvailability";

const CHECK_USERNAME_AVAILABILITY_UPDATE_API = DEV_SERVER + "/api/user/checkUsernameAvailabilityUpdate";

const CHECK_EMAIL_AVAILABILITY_UPDATE_API = DEV_SERVER + "/api/user/checkEmailAvailabilityUpdate";

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

export function handleResetPassword(userId, newPassword) {

    return (dispatch, getState) => {
        const params = {
            userId: userId,            
            password: newPassword
        }

        axios.put(NEW_PASSWORD_API, params).then((response) => {
            if(response.data.success){
                showSuccessNotification('Changed password successfully');
            } else {
                showFailureNotification(response.data.message);
            }

        }).catch((err) => {
            if (err.response.status === 401) {
                showFailureNotification('username is wrong');
            }

        });
    }
}


export function createUser(username, email, name, role, isEmployee, employeeNumber, reportingTo, workplace, callback) {
    return (dispatch, getState) => {
        const data = {
            username,
            email,
            name,
            roles: [role],
            isEmployee,
            employeeNumber,
            reportingTo,
            workplace
        }
        axios.post(SIGN_UP_API, data)
            .then((response) => {
                showSuccessNotification("Created the user successfully");
                if(callback){
                    callback();
                }
            }).catch((err) => {
                showFailureNotification("Unable to create the user");
            });
    }
}

export function editUser(userId, username, email, name, role, isEmployee, employeeNumber, reportingTo, workplace, callback) {
    return (dispatch, getState) => {
        const data = {
            username,
            email,
            name,
            roles: [role],
            isEmployee,
            employeeNumber,
            reportingTo,
            workplace
        }
        axios.put(EDIT_USER_API+'/'+userId, data)
            .then((response) => {
                showSuccessNotification("Updated the user details successfully");
                if(callback){
                    callback();
                }
            }).catch((err) => {
                showFailureNotification("Unable to update the user details");
            });
    }
}

export function deleteUser(id, callback) {    
    axios.delete(DELETE_USER_API+'/'+id)
        .then((response) => {
            showSuccessNotification("user is deleted successfully");
            callback();

        }).catch((err) => {
            showFailureNotification("Unable to delete user");
            callback(['Unable to delete user']);
        });
}

export function checkUsernameAvailabilityUpdate(id, username, callback) {
    const params = {
        username,
        id: JSON.parse(localStorage.getItem('edituserId'))
    };
    axios.get(CHECK_USERNAME_AVAILABILITY_UPDATE_API, { params })
        .then((response) => {
            if (response.data.available) {
                callback(['User name already exists']);
                return;
            }
            callback();

        }).catch((err) => {
            callback(['Unable to check if the user name is available']);
        });
}

export function checkEmailAvailabilityUpdate(id, email, callback) {
    const params = {
        email,
        id:JSON.parse(localStorage.getItem('edituserId'))
    };
    axios.get(CHECK_EMAIL_AVAILABILITY_UPDATE_API, { params })
        .then((response) => {
            if (response.data.available) {
                callback(['Email already exists']);
                return;
            }
            callback();
        }).catch((err) => {
            callback(['Unable to check if the email is available']);
        });
}

export function getUserById(userId){
    return (dispatch, getState) => {
        dispatch(setUserLoading(true));
        const params = {
            id: userId
        };
        axios.get(GET_USER_API, { params })
            .then((response) => {
                let { id, username, email, name } = response.data;
                let userRoles = response.data.roles;
                let isLead = false;
                if (userRoles.includes('ROLE_LEADER') || userRoles.includes('ROLE_MANAGEMENT')) {
                    isLead = true;
                }
               // dispatch(setEditedUserDetails(id, username, email, name, userRoles, isLead));
                //showSuccessNotification("Welcome " + name);
               //dispatch(setUserLoading(false));
                return response.data;
            }).catch((err) => {
                if(err.response.status === 401) {
                   // dispatch(handleLogout());
                    return;
                }
                showFailureNotification('Unable to fetch user details');
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

export function getAllRoles(hardRefresh = false) {
    return (dispatch, getState) => {
        if (getState().user.roles.length > 0 && !hardRefresh) {
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

function setEditedUserDetails(id, username, email, name, userRoles, isLead) {
    return {
        type: SET_EDITED_USER_DETAILS,id,
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
