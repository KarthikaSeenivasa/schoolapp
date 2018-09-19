
import axios from 'axios';
import { showFailureNotification, showSuccessNotification, getDateParam, findIndexOf } from '../utils/Util';

export const SET_TIME_ENTRIES = "SET_TIME_ENTRIES";
export const SET_TIME_ENTRIES_LOADING = "SET_TIME_ENTRIES_LOADING";
export const SET_TIME_ENTRY_APPROVALS = "SET_TIME_ENTRY_APPROVALS";
export const SET_TIME_ENTRY_APPROVALS_LOADING = "SET_TIME_ENTRY_APPROVALS_LOADING";

const DEV_SERVER = "http://kira:8080";
const TIME_ENTRIES_API = DEV_SERVER + "/api/timeSheetRecord";

export const statusCodes =
    [
        {
            name: 'Approved',
            value: "APPROVED"
        },
        {
            name: 'Pending',
            value: "PENDING"
        },
        {
            name: 'Declined',
            value: "DECLINED"
        }
    ];

export function getTimeEntries(date) {
    return (dispatch, getState) => {
        dispatch(setTimeEntriesLoading(true));
        let startDate = date ? getDateParam(date) : undefined;
        let endDate = startDate ? startDate + (24 * 60 * 60 * 1000) : undefined;
        const params = {
            startDate,
            endDate
        }
        axios.get(TIME_ENTRIES_API + "/employee", { params })
            .then((response) => {
                dispatch(setTimeEntries(response.data.payload));
                dispatch(setTimeEntriesLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch the time entries');
                }
            });
    }
}

export function addTimeEntry(projectId, headEmployeeId, hours, taskMasterId, description) {
    return (dispatch, getState) => {
        const data = {
            employeeId: getState().user.id,
            projectId,
            headEmployeeId,
            hours,
            taskMasterId,
            description
        };
        axios.post(TIME_ENTRIES_API + "/add", data)
            .then((response) => {
                let timeEntries = getState().timeEntries.timeEntries;
                timeEntries.push(response.data.payload);
                dispatch(setTimeEntries(timeEntries));
                showSuccessNotification('Added the time entry successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the time entry');
                }
            });
    }
}

export function updateTimeEntry(id, projectId, headEmployeeId, hours, taskMasterId, description) {
    return (dispatch, getState) => {
        const data = {
            projectId,
            headEmployeeId,
            hours,
            taskMasterId,
            description
        };
        axios.put(TIME_ENTRIES_API + "/" + id, data)
            .then((response) => {
                let timeEntries = getState().timeEntries.timeEntries;
                let index = findIndexOf(timeEntries, id);
                if (index !== -1) {
                    timeEntries[index] = response.data.payload;
                }
                dispatch(setTimeEntries(timeEntries));

                showSuccessNotification('Edited the time entry details successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the time entry details');
                }
            });
    }
}


export function deleteTimeEntry(id) {
    return (dispatch, getState) => {
        axios.delete(TIME_ENTRIES_API + "/" + id)
            .then((response) => {
                let timeEntries = getState().timeEntries.timeEntries;
                let index = findIndexOf(timeEntries, id);
                if (index !== -1) {
                    timeEntries.splice(index, 1);
                }
                dispatch(setTimeEntries(timeEntries));

                showSuccessNotification('Deleted the time entry successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the the time entry');
                }
            });
    }
}

export function getTimeEntryApprovals(status) {
    return (dispatch, getState) => {
        dispatch(setTimeEntryApprovalsLoading(true));
        const params = {
            approval: status === "ALL" ? undefined : status
        }
        axios.get(TIME_ENTRIES_API + "/leader", { params })
            .then((response) => {
                dispatch(setTimeEntryApprovals(response.data.payload));
                dispatch(setTimeEntryApprovalsLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch the time entries');
                }
            });
    }
}

export function updateTimeEntryApproval(id, approval, remarks) {
    return (dispatch, getState) => {
        const data = {
            approval,
            remarks
        };
        axios.put(TIME_ENTRIES_API + "/approval/" + id, data)
            .then((response) => {
                let timeEntryApprovals = getState().timeEntries.timeEntryApprovals;
                let index = findIndexOf(timeEntryApprovals, id);
                if (index !== -1) {
                    timeEntryApprovals[index] = response.data.payload;
                }
                dispatch(setTimeEntryApprovals(timeEntryApprovals));

                showSuccessNotification('Edited the approval status successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the  approval status');
                }
            });
    }
}


function setTimeEntries(timeEntries) {
    return {
        type: SET_TIME_ENTRIES,
        timeEntries
    }
}

function setTimeEntriesLoading(loading) {
    return {
        type: SET_TIME_ENTRIES_LOADING,
        loading
    }
}

function setTimeEntryApprovals(timeEntryApprovals) {
    return {
        type: SET_TIME_ENTRY_APPROVALS,
        timeEntryApprovals
    }
}


function setTimeEntryApprovalsLoading(loading) {
    return {
        type: SET_TIME_ENTRY_APPROVALS_LOADING,
        loading
    }
}