import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification, getDateParam } from '../utils/Util';

export const SET_PROJECTS = "SET_PROJECTS";
export const SET_PROJECTS_LOADING = "SET_PROJECTS_LOADING";
export const SET_PROJECT_ACTION_LOADING = "SET_PROJECT_ACTION_LOADING";
export const SET_PROJECTS_SPECIFIC_TASKS = "SET_PROJECTS_SPECIFIC_TASKS";
export const SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING = "SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING";
export const SET_PROGRESS = "SET_PROGRESS";
export const SET_PROGRESS_LOADING = "SET_PROGRESS_LOADING";

const DEV_SERVER = "http://kira:8080";
const PROJECTS_API = DEV_SERVER + "/api/project";
const PROJECTS_SPECIFIC_TASKS_API = DEV_SERVER + "/api/projectSpecificTask";
const PROGRESS_API = DEV_SERVER + "/api/progress";

export const statusCodes =
    [
        {
            name: 'IFA In Progress',
            value: "IFA_PROGRESS"
        },
        {
            name: 'Awaiting IFA',
            value: "AWAITING_RFA"
        },
        {
            name: 'Resubmission In Progress',
            value: "RESUBMISSION_PROGRESS"
        },
        {
            name: 'IFF In Progress',
            value: "IFF_PROGRESS"
        },
        {
            name: 'IFF Completed',
            value: "IFF_COMPLETED"
        },
        {
            name: 'Placed On Hold Or Cancelled',
            value: "HOLD_OR_CANCELLED"
        }
    ];

export function getProjects() {
    return (dispatch, getState) => {
        dispatch(setProjectsLoading(true));
        axios.get(PROJECTS_API + "/all")
            .then((response) => {
                dispatch(setProjects(response.data.payload));
                dispatch(setProjectsLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch projects');
                }
            });
    }
}

export function addProject(name, clientId, startDate, endDate, budget, teamLeadIds, status, dateOfCompletion) {
    return (dispatch, getState) => {
        const data = {
            name,
            clientId,
            startDate: startDate ? startDate.unix() : undefined,
            endDate: endDate ? endDate.unix() : undefined,
            budget,
            headEmployee: teamLeadIds,
            status,
            dateOfCompletion: dateOfCompletion ? dateOfCompletion.unix() : undefined
        };
        dispatch(setProjectActionLoading(true));
        axios.post(PROJECTS_API + "/add", data)
            .then((response) => {
                let projects = getState().projects.projects;
                projects.push(response.data.payload);
                dispatch(setProjects(projects));
                dispatch(setProjectActionLoading(false));
                showSuccessNotification('Added project successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the project');
                }
            });
    }
}

export function updateProject(id, name, clientId, startDate, endDate, budget, teamLeadIds, status, dateOfCompletion) {
    return (dispatch, getState) => {
        const data = {
            name,
            clientId,
            startDate: getDateParam(startDate),
            endDate: getDateParam(endDate),
            budget,
            headEmployee: teamLeadIds,
            status,
            dateOfCompletion: getDateParam(dateOfCompletion)
        };
        dispatch(setProjectActionLoading(true));
        axios.put(PROJECTS_API + "/" + id, data)
            .then((response) => {
                let projects = getState().projects.projects;
                let index = findIndexOf(projects, id);
                if (index !== -1) {
                    projects[index] = { id, name, clientId, startDate, endDate, budget, teamLeadIds, status, dateOfCompletion };
                }
                dispatch(setProjects(projects));
                dispatch(setProjectActionLoading(false));
                showSuccessNotification('Edited the project successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not update the project');
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
                dispatch(setProjects(projects));

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
            })
    }
}

function setProjects(projects) {
    return {
        type: SET_PROJECTS,
        projects
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



