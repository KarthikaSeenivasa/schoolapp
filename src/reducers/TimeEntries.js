
import { SET_TIME_ENTRIES, SET_TIME_ENTRIES_LOADING, SET_TIME_ENTRY_APPROVALS, SET_TIME_ENTRY_APPROVALS_LOADING } from "../actions/TimeEntryActions";

const INITIAL_STATE = {
    timeEntries: [],
    numberOfRows: 0,
    loading: false,
    timeEntryApprovals: [],
    approvalsLoading: false
}
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SET_TIME_ENTRIES:
            return {
                ...state,
                timeEntries: action.timeEntries,
                numberOfRows: action.numberOfRows
            }
        case SET_TIME_ENTRIES_LOADING:
            return {
                ...state,
                loading: action.loading
            }
        case SET_TIME_ENTRY_APPROVALS:
            return {
                ...state,
                timeEntryApprovals: action.timeEntryApprovals
            }
        case SET_TIME_ENTRY_APPROVALS_LOADING:
            return {
                ...state,
                approvalsLoading: action.loading
            }
        default:
            return state;
    }

}