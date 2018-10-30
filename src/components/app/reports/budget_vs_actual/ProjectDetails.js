import React from 'react';

const ProjectDetails = (props) => {
    if (!props.reports) {
        return null;
    }
    return (
        <div className="prj-dta">
            <div className="prj-val">
                Esskay Job Number: {props.reports.esskayJN}
            </div>
            <div className="prj-val">
                Client Job Number: {props.reports.clientJN}
            </div>
            <div className="prj-val">
                Client: {props.reports.client}
            </div>
            <div className="prj-val">
                Team Leader(s): {props.reports.teamLeader.toString()}
            </div>
            <div className="prj-val">
                Job Name: {props.reports.jobName}
            </div>
            <div className="prj-val">
                Job Status: {props.reports.status}
            </div>
        </div>
    )
}

export default ProjectDetails;