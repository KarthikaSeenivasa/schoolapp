import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification } from '../utils/Util';


export const SET_TASKS = "SET_TASKS";
export const SET_TASKS_LOADING = "SET_TASKS_LOADING";
export const SET_TREE_SELECT_DATA = "SET_TREE_SELECT_DATA";

const DEV_SERVER = "";
// const DEV_SERVER = "http://localhost";

const TASKS_API = DEV_SERVER + "/api/taskMaster";

export function getTasks(isCascaderSelect = false) {
    return (dispatch, getState) => {
        dispatch(setTasksLoading(true));
        axios.get(TASKS_API + "/all")
            .then((response) => {
                let tasks = sanitizeTasks(response.data.payload);
                dispatch(setTasks(tasks));
                dispatch(setTasksLoading(false));
                if (isCascaderSelect) {
                    dispatch(setCascaderOptions(getCascaderOptions(tasks)));
                }
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Unable to fetch tasks');
                }
            });

    }
}

export function addTask(taskName, headId) {
    return (dispatch, getState) => {
        const data = {
            taskName,
            headId
        };
        axios.post(TASKS_API + "/add", data)
            .then((response) => {
                showSuccessNotification('Added the task successfully');
                dispatch(getTasks());
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not add the task');
                }
            });
    }
}

export function updateTask(id, taskName, headId) {
    return (dispatch, getState) => {
        const data = {
            taskName,
            headId
        };
        axios.put(TASKS_API + "/" + id, data)
            .then((response) => {
                dispatch(getTasks());
                showSuccessNotification('Edited task details successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not edit the task details');
                }
            });
    }
}

export function deleteTask(id) {
    return (dispatch, getState) => {
        axios.delete(TASKS_API + "/" + id)
            .then((response) => {
                dispatch(getTasks());
                showSuccessNotification('Deleted the task successfully');
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not delete the task');
                }
            });
    }
}

function setTasks(tasks) {
    return {
        type: SET_TASKS,
        tasks
    }
}

function setTasksLoading(loading) {
    return {
        type: SET_TASKS_LOADING,
        loading
    }
}

function setCascaderOptions(cascaderOptions) {
    return {
        type: SET_TREE_SELECT_DATA,
        cascaderOptions
    }

}

function getCascaderOptions(tasks) {
    let cascaderOptions = [];
    for (let task of tasks) {
        let cascaderOption = {
            label: task.taskName,
            key: task.id,
            value: task.id
        }

        if(task.subtasks.length > 0) {
            cascaderOption.children = getCascaderOptions(task.subtasks);
        }

        cascaderOptions.push(cascaderOption);
    }

    return cascaderOptions;
}

function sanitizeTasks(tasksFromResponse) {
    let tasks = tasksFromResponse.filter((task) => {
        return typeof task === 'object';
    });
    return tasks;
}
