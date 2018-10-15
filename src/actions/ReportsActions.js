import axios from 'axios';
import { findIndexOf, showFailureNotification, showSuccessNotification, getDateParam } from '../utils/Util';

export const SET_REPORTS = "SET_REPORTS";
export const SET_REPORT_LOADING = "SET_REPORT_LOADING";
export const GET_BUDGET_VS_ACTUAL = "GET_BUDGET_VS_ACTUAL"

const DEV_SERVER = "http://kira:8080";
const REPORTS_API = DEV_SERVER + "/api/report/budget-actual";

export function getBudgetVsActual(projectId) {
    return (dispatch, getState) => {
        dispatch(setReportsLoading(true));
        axios.get(REPORTS_API + "/project/" + projectId)
            .then((response) => {
                debugger;
                dispatch(setReports(response.data.payload));
                dispatch(setReportsLoading(false));
            }).catch((err) => {
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch budget vs actual reports');
                }
            });
    }
}

function setReportsLoading(loading) {
    return {
        type: SET_REPORT_LOADING,
        loading
    }
}

function setReports(reports) {
    return {
        type : SET_REPORTS,
        reports
    }
}