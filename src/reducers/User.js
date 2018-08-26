import { SET_IS_AUTHENTICATED } from '../actions/UserActions';

const INITIAL_STATE = {
    isAuthenticated : true,
    role : null,
    accessToken: null
}

export default function reducer(state = INITIAL_STATE, action) {
    switch(action.type) {
        case SET_IS_AUTHENTICATED:
            return {...state, isAuthenticated:action.isAuthenticated}
        default:
            return {...state};
    }
}