import { SET_TASKS, SET_TASKS_LOADING, SET_TREE_SELECT_DATA } from "../actions/TaskActions";

const INITIAL_STATE = {
    tasks: [],
    loading: false,
    cascaderOptions: []
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                tasks: action.tasks
            }
        case SET_TASKS_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_TREE_SELECT_DATA:
            return {
                ...state,
                cascaderOptions: action.cascaderOptions
            }
        default:
            return { ...state };
    }
}