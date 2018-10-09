import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification } from '../utils/Util';

export const SET_CLIENTS = "SET_CLIENTS";
export const SET_CLIENTS_LOADING = "SET_CLIENTS_LOADING";
export const SET_CLIENT_ACTION_LOADING = "SET_CLIENT_ACTION_LOADING";
export const SET_CONTACTS = "SET_CONTACTS";
export const SET_CONTACTS_LOADING = "SET_CONTACTS_LOADING";

const DEV_SERVER = "http://kira:8080";

const CLIENTS_API = DEV_SERVER + "/api/client";
const CONTACT_API = DEV_SERVER + "/api/contact"

export function getClients() {
    return (dispatch, getState) => {
        dispatch(setClientLoading(true));
        axios.get(CLIENTS_API + "/all")
            .then((response) => {
                dispatch(setClients(response.data.payload));
                dispatch(setClientLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Unable to fetch clients');
                }
            });
    }
}

export function addClient(name, email, callback) {
    return (dispatch, getState) => {
        const data = {
            name,
            email
        };
        dispatch(setClientActionLoading(true));
        axios.post(CLIENTS_API + "/add", data)
            .then((response) => {
                let clients = getState().clients.clients;
                clients.push(response.data.payload);

                dispatch(setClients(clients));

                showSuccessNotification('Added client successfully');

                dispatch(setClientActionLoading(false));

                if(callback){
                    callback(response.data.payload);
                }
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the client');
                }
            });
    }
}

export function updateClient(id, name, email, callback) {
    return (dispatch, getState) => {
        const data = {
            name,
            email
        };
        dispatch(setClientActionLoading(true));
        axios.put(CLIENTS_API + "/" + id, data)
            .then((response) => {
                let clients = getState().clients.clients;
                let index = findIndexOf(clients, id);
                if (index !== -1) {
                    clients[index] = { ...response.data.payload };
                }

                dispatch(setClients(clients));

                showSuccessNotification('Edited client details successfully');

                dispatch(setClientActionLoading(false));

                if(callback){
                    callback();
                }
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the client details');
                }
            });
    }
}

export function deleteClient(id) {
    return (dispatch, getState) => {
        axios.delete(CLIENTS_API + "/" + id)
            .then((response) => {
                let clients = getState().clients.clients;
                let index = findIndexOf(clients, id);
                if (index !== -1) {
                    clients.splice(index, 1);
                }
                dispatch(setClients(clients));

                showSuccessNotification('Deleted the client successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the client');
                }
            });
    }
}

export function getContacts(clientId) {
    return (dispatch, getState) => {
        dispatch(setContactsLoading(true));
        axios.get(CONTACT_API + "/client/" + clientId)
            .then((response) => {
                dispatch(setContacts(response.data.payload));
                dispatch(setContactsLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Unable to fetch clients');
                }
            });
    }
}

export function addContact(clientId, name, phone, designation, primaryEmail, secondaryEmail) {
    return (dispatch, getState) => {
        const data = [{
            name,
            phone,
            designation,
            primaryEmail,
            secondaryEmail
        }];
        dispatch(setClientActionLoading(true));
        axios.post(CONTACT_API + "/add/client/" + clientId, data)
            .then((response) => {
                dispatch(getContacts(clientId));

                showSuccessNotification('Added the contact successfully');

                dispatch(setClientActionLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the contact');
                }
            });
    }
}

export function updateContact(id, name, phone, designation, primaryEmail, secondaryEmail, clientId) {
    return (dispatch, getState) => {
        const data = {
            name,
            phone,
            designation,
            primaryEmail,
            secondaryEmail
        };
        dispatch(setClientActionLoading(true));
        axios.put(CONTACT_API + "/" + id, data)
            .then((response) => {
               
                dispatch(getContacts(clientId));

                showSuccessNotification('Edited the contact successfully');

                dispatch(setClientActionLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the contact');
                }
            });
    }
}

export function deleteContact(id, clientId) {
    return (dispatch, getState) => {
        axios.delete(CONTACT_API + "/" + id)
            .then((response) => {
                dispatch(getContacts(clientId));

                showSuccessNotification('Deleted the contact successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the contact');
                }
            });
    }
}

function setClients(clients) {
    return {
        type: SET_CLIENTS,
        clients
    }
}

function setClientLoading(loading) {
    return {
        type: SET_CLIENTS_LOADING,
        loading
    }
}

function setClientActionLoading(loading) {
    return {
        type: SET_CLIENT_ACTION_LOADING,
        loading
    }
}

function setContacts(contacts) {
    return {
        type: SET_CONTACTS,
        contacts
    }
}

function setContactsLoading(loading) {
    return {
        type: SET_CONTACTS_LOADING,
        loading
    }
}

