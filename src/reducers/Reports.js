import { SET_REPORTS, SET_REPORT_LOADING } from "../actions/ReportsActions";


const INITIAL_STATE = {
    loading: false,
    reports:null
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_REPORTS:
            return {
                ...state,
                reports: action.reports
            }
        case SET_REPORT_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        default:
            return { ...state };
    }
}
