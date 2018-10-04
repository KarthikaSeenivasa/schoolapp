import { SET_CLIENTS, SET_CLIENTS_LOADING, SET_CLIENT_ACTION_LOADING, SET_CONTACTS, SET_CONTACTS_LOADING } from '../actions/ClientActions';

const INITIAL_STATE = {
    clients: [],
    clientActionLoading: false,
    loading: false,
    contacts: [],
    contactsLoading: false
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
        case SET_CLIENT_ACTION_LOADING:
            return {
                ...state,
                clientActionLoading: action.loading
            }
        case SET_CONTACTS:
            return {
                ...state,
                contacts: action.contacts
            }
        case SET_CONTACTS_LOADING:
            return {
                ...state,
                contactsLoading: action.loading
            }
        default:
            return { ...state };
    }
}