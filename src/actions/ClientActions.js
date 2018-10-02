import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification } from '../utils/Util';

export const SET_CLIENTS = "SET_CLIENTS";
export const SET_CLIENTS_LOADING = "SET_CLIENTS_LOADING";
export const SET_CLIENT_ACTION_LOADING = "SET_CLIENT_ACTION_LOADING";

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

export function addClient(name, email) {
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
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the client');
                }
            });
    }
}

export function updateClient(id, name, email) {
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

                showSuccessNotification('Deleted client successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the client');
                }
            });
    }
}

export function addContact(clientId, name, phone, designation, primaryEmail, secondaryEmail) {
    return (dispatch, getState) => {
        const data = {
            name,
            phone,
            designation,
            primaryEmail,
            secondaryEmail
        };
        dispatch(setClientActionLoading(true));
        axios.post(CONTACT_API + "client/" + clientId + "/add", data)
            .then((response) => {
                let clients = getState().clients.clients;
                clients.push(response.data.payload);

                dispatch(setClients(clients));

                showSuccessNotification('Added the contact successfully');

                dispatch(setClientActionLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the contact');
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

