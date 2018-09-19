import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification } from '../utils/Util';

export const SET_CLIENTS = "SET_CLIENTS";
export const SET_CLIENTS_LOADING = "SET_CLIENTS_LOADING";

const DEV_SERVER = "http://kira:8080";

const CLIENTS_API = DEV_SERVER + "/api/client";

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

export function addClient(name, primaryEmail, secondaryEmail) {
    return (dispatch, getState) => {
        const data = {
            name,
            primaryEmail,
            secondaryEmail
        };
        axios.post(CLIENTS_API + "/add", data)
            .then((response) => {
                let clients = getState().clients.clients;
                clients.push({ id: response.data.payload.id, name, company, primaryEmail, secondaryEmail });
                dispatch(setClients(clients));

                showSuccessNotification('Added client successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the client');
                }
            });
    }
}

export function updateClient(id, name, primaryEmail, secondaryEmail) {
    return (dispatch, getState) => {
        const data = {
            name,
            primaryEmail,
            secondaryEmail
        };
        axios.put(CLIENTS_API + "/" + id, data)
            .then((response) => {
                let clients = getState().clients.clients;
                let index = findIndexOf(clients, id);
                if (index !== -1) {
                    clients[index] = { id, name, company, primaryEmail, secondaryEmail };
                }
                dispatch(setClients(clients));

                showSuccessNotification('Edited client details successfully');
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

