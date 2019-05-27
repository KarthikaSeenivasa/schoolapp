import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification, getDateParam } from '../utils/Util';

export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PROJECTS_LOADING = "SET_PROJECTS_LOADING";
export const SET_PROJECT_ACTION_LOADING = "SET_PROJECT_ACTION_LOADING";
export const SET_PROJECTS_SPECIFIC_TASKS = "SET_PROJECTS_SPECIFIC_TASKS";
export const SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING = "SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_PROGRESS_LOADING = "SET_PROGRESS_LOADING";

const DEV_SERVER = "";
const PROJECTS_API = DEV_SERVER + "/api/project";
const PROJECTS_SPECIFIC_TASKS_API = DEV_SERVER + "/api/projectSpecificTask";
const PROGRESS_API = DEV_SERVER + "/api/progress";

export const statusCodes =
    [
        {
            name: 'IFA Progress',
            value: "IFA_PROGRESS",
            tagColor: "geekblue"
        },
        {
            name: 'Awaiting RFA',
            value: "AWAITING_RFA",
            tagColor: "magenta"

        },
        {
            name: 'Resubmission Progress',
            value: "RESUBMISSION_PROGRESS",
            tagColor: "cyan"
        },
        {
            name: 'IFF Progress',
            value: "IFF_PROGRESS",
            tagColor: "blue"

        },
        {
            name: 'IFF Completed',
            value: "IFF_COMPLETED",
            tagColor: "green"
        },
        {
            name: 'Hold Or Cancelled',
            value: "HOLD_OR_CANCELLED",
            tagColor: "red"
        }
    ];

export function getProjects(callback, page = 1, size = 10, overrideLeaderLimitation = false, leadId = 'all', jobNumber = '%') {
    return (dispatch, getState) => {
        dispatch(setProjectsLoading(true));
        let resource = "/all";
        let roles = getState().user.userRoles;
        if (roles.includes('ROLE_LEADER') && !overrideLeaderLimitation) {
            resource = "/employee";
        }
        let params = {
            page: page === -1 ? undefined : page - 1,
            size,
            lead: leadId === 'all' ? undefined: leadId,
            jobNumber: jobNumber
        }
        axios.get(PROJECTS_API + resource, { params })
            .then((response) => {
                if(response.data.payload.content){
                    dispatch(setProjects(response.data.payload.content, response.data.payload.totalElements));
                }
                dispatch(setProjectsLoading(false));
                if (callback) {
                    callback();
                }
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch projects');
                }
            });
    }
}

export function addProject(name, esskayJN, clientJN, clientId, contactId, headEmployee, status, statusDescription, startDate, plannedIFA, budget, receivingDate, actualIFA, actualIFF, callback) {
    return (dispatch, getState) => {
        const data = {
            name,
            esskayJN,
            clientJN,
            clientId,
            contactId,
            headEmployee,
            status,
            statusDescription,
            startDate: startDate ? getDateParam(startDate) : undefined,
            plannedIFA: plannedIFA ? getDateParam(plannedIFA) : undefined,
            budget,
            receivingDate: receivingDate ? getDateParam(receivingDate) : undefined,
            actualIFA: actualIFA ? getDateParam(actualIFA) : undefined,
            actualIFF: actualIFF ? getDateParam(actualIFF) : undefined
        };
        dispatch(setProjectActionLoading(true));
        axios.post(PROJECTS_API + "/add", data)
            .then((response) => {
                let projects = getState().projects.projects;
                projects.push(response.data.payload);
                let numberOfRows = getState().projects.numberOfRows + 1;
                dispatch(setProjects(projects, numberOfRows));

                if (callback) {
                    callback(response.data.payload);
                }

                dispatch(setProjectActionLoading(false));

                showSuccessNotification('Added project successfully');

            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the project');
                }
            });
    }
}

export function updateProject(id, name, esskayJN, clientJN, clientId, contactId, headEmployee, status, statusDescription, startDate, plannedIFA, budget, receivingDate, actualIFA, actualIFF, callback) {
    return (dispatch, getState) => {
        const data = {
            name,
            esskayJN,
            clientJN,
            clientId,
            contactId,
            headEmployee,
            status,
            statusDescription,
            startDate: startDate ? getDateParam(startDate) : undefined,
            plannedIFA: plannedIFA ? getDateParam(plannedIFA) : undefined,
            budget,
            receivingDate: receivingDate ? getDateParam(receivingDate) : undefined,
            actualIFA: actualIFA ? getDateParam(actualIFA) : undefined,
            actualIFF: actualIFF ? getDateParam(actualIFF) : undefined
        };
        dispatch(setProjectActionLoading(true));
        axios.put(PROJECTS_API + "/" + id, data)
            .then((response) => {
                let projects = getState().projects.projects;

                let index = findIndexOf(projects, id);
                if (index !== -1) {
                    projects[index] = { ...response.data.payload };
                }

                dispatch(setProjects(projects, getState().projects.numberOfRows));

                dispatch(setProjectActionLoading(false));

                showSuccessNotification('Edited the project successfully');

                if (callback) {
                    callback(response.data.payload);
                }
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the project');
                }
            });
    }
}

export function deleteProject(id) {
    return (dispatch, getState) => {

        axios.delete(PROJECTS_API + "/" + id)
            .then((response) => {
                let projects = getState().projects.projects;
                let index = findIndexOf(projects, id);
                if (index !== -1) {
                    projects.splice(index, 1);
                }
                let numberOfRows = getState().projects.numberOfRows - 1;
                dispatch(setProjects(projects, numberOfRows));

                showSuccessNotification('Deleted the project successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the project');
                }
            });
    }

}

export function getProjectSpecificTasks(projectId) {
    return (dispatch, getState) => {
        dispatch(setProjectSpecificTasksLoading(true));
        axios.get(PROJECTS_SPECIFIC_TASKS_API + "/project/" + projectId)
            .then((response) => {
                dispatch(setProjectSpecificTasks(response.data.payload));
                dispatch(setProjectSpecificTasksLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch the project tasks');
                }
            });
    }
}

export function updateProjectSpecificTasks(id, projectId, taskMasterId, resourceAllocated, weightage) {
    return (dispatch, getState) => {
        const data = {
            projectId,
            taskMasterId,
            resourceAllocated,
            weightage
        }
        axios.put(PROJECTS_SPECIFIC_TASKS_API + "/" + id, data)
            .then((response) => {
                dispatch(getProjectSpecificTasks(projectId));
                showSuccessNotification('Successfully updated the details');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Failed to update the details');
                }
            });
    }
}

export function addProjectTaskProgress(id, date, progressPercentage) {
    return (dispatch, getState) => {
        const data = {
            projectSpecificTaskId: id,
            date: getDateParam(date),
            progressPercentage
        };
        axios.post(PROGRESS_API + "/add", data)
            .then((response) => {
                let projectSpecificTasks = getState().projects.projectSpecificTasks;
                let index = findIndexOf(projectSpecificTasks, id);
                if (index != -1) {
                    let test = projectSpecificTasks[index].project.id;
                    dispatch(getProjectSpecificTasks(projectSpecificTasks[index].project.id));
                }
                showSuccessNotification('Added the progress entry successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Failed to add the progress entry');
                }
            })
    }
}

export function updateProjectTaskProgress(id, projectSpecificTaskId, date, progressPercentage) {
    return (dispatch, getState) => {
        const data = {
            projectSpecificTaskId,
            date: date ? getDateParam(date) : undefined,
            progressPercentage
        };
        axios.put(PROGRESS_API + "/" + id, data)
            .then((response) => {
                let projectSpecificTasks = getState().projects.projectSpecificTasks;
                let index = findIndexOf(projectSpecificTasks, projectSpecificTaskId);
                if (index != -1) {
                    dispatch(getProjectSpecificTasks(projectSpecificTasks[index].project.id));
                }
                showSuccessNotification('Edited the project entry successfully')
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Failed to edit the progress entry');
                }
                if(err.response.status === 403){
                    showFailureNotification('Contact Management to edit the entry');
                }
            })
    }
}

function setProjects(projects, numberOfRows) {
    return {
        type: SET_PROJECTS,
        projects,
        numberOfRows
    }
}

function setProjectSpecificTasks(projectSpecificTasks) {
    return {
        type: SET_PROJECTS_SPECIFIC_TASKS,
        projectSpecificTasks
    }
}

function setProgress(progress) {
    return {
        type: SET_PROGRESS,
        progress
    }
}

function setProjectsLoading(loading) {
    return {
        type: SET_PROJECTS_LOADING,
        loading
    }
}

function setProjectActionLoading(loading) {
    return {
        type: SET_PROJECT_ACTION_LOADING,
        loading
    }
}

function setProjectSpecificTasksLoading(loading) {
    return {
        type: SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING,
        loading
    }
}



