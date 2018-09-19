import { SET_CLIENTS, SET_CLIENTS_LOADING } from '../actions/ClientActions';

const INITIAL_STATE = {
    clients: [],
    loading: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_CLIENTS:
            return {
                ...state,
                clients: action.clients
            }
        case SET_CLIENTS_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return { ...state };
    }
}