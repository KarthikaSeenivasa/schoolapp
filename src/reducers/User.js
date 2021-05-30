import { SET_IS_AUTHENTICATED, SET_USER_DETAILS, SET_EDITED_USER_DETAILS, SET_ROLES, SET_ROLES_LOADING, SET_USER_LOADING } from '../actions/UserActions';

const INITIAL_STATE = {
    isAuthenticated: false,
    id:null,
    userRoles: [],
    username: null,
    email: null,
    name: null,
    roles: [],
    rolesLoading: false,
    isLead: false,
    userLoading: true
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        case SET_USER_DETAILS:
            return {
                ...state,
                id:action.id,
                userRoles: action.userRoles,
                username: action.username,
                email: action.email,
                name: action.name,
                isLead: action.isLead
            }
            case SET_EDITED_USER_DETAILS:
            return {
                ...state,
                userId:action.id,
                edituserRoles: action.userRoles,
                editusername: action.username,
                editemail: action.email,
                editname: action.name,
                isLead: action.isLead,
                editUserRecord:{
                userId:action.id,
                edituserRoles: action.userRoles,
                editusername: action.username,
                editemail: action.email,
                editname: action.name,
                isLead: action.isLead
                }

            }
        case SET_ROLES:
            return {
                ...state,
                roles: action.roles
            }
        case SET_ROLES_LOADING:
            return {
                ...state,
                rolesLoading: action.rolesLoading
            }
        case SET_USER_LOADING:
            return {
                ...state,
                userLoading: action.loading
            }
        default:
            return { ...state };
    }
}