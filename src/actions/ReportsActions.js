import axios from 'axios';
import {  showFailureNotification } from '../utils/Util';

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
                let reports = { ...response.data.payload };
                reports.chartData = constructChartData(response.data.payload);
                dispatch(setReports(reports));

                dispatch(setReportsLoading(false));
            }).catch((err) => {
                debugger;
                if (err.response.status === 500) {
                    showFailureNotification('Could not fetch budget vs actual reports');
                }
            });
    }
}

function constructChartData(response) {
    let labels = [], series = [], budgets = [], actuals = [];
    for (let row of response.rows) {
        labels.push(row.tradeName);
        budgets.push(row.budget);
        actuals.push(row.actualUtilised);
    }

    series.push({ name: 'Budget', data: budgets }, { name: 'Actuals', data: actuals });
    return { labels, series };
}

function setReportsLoading(loading) {
    return {
        type: SET_REPORT_LOADING,
        loading
    }
}

function setReports(reports) {
    return {
        type: SET_REPORTS,
        reports
    }
}