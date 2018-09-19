import {
    SET_PROJECTS,
    SET_PROJECTS_LOADING,
    SET_PROJECTS_SPECIFIC_TASKS,
    SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING,
    SET_PROJECT_ACTION_LOADING
} from '../actions/ProjectActions';

const INITIAL_STATE = {
    projects: [],
    projectSpecificTasks: [],
    loading: false,
    projectSpecificTasksLoading: false,
    projectActionLoading: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_PROJECTS:
            return {
                ...state,
                projects: action.projects
            }
        case SET_PROJECTS_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_PROJECTS_SPECIFIC_TASKS:
            return {
                ...state,
                projectSpecificTasks: action.projectSpecificTasks
            }
        case SET_SET_PROJECTS_SPECIFIC_TASKS_LOADING:
            return {
                ...state,
                projectSpecificTasksLoading: action.loading
            }
        case SET_PROJECT_ACTION_LOADING:
            return {
                ...state,
                projectActionLoading: action.loading
            }
        default:
            return { ...state };
    }
}