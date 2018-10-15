import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import ProjectsSelect from './ProjectSelect';

const { Header } = Layout;

const HeaderContainer = (props) => {
    let headEmployees = [];
    if (props.project) {
        props.project.headEmployee.map((emp) => {
            headEmployees.push(emp.user.name);
        });
    }
    return (
        <Header className="hdr">
            <div className="met">
                Budget Vs Actual Report
            </div>
            <div style={{display: 'flex'}}>
                <ProjectsSelect loading={props.loading}
                    projects={props.projects}
                    onChange={props.onProjectChange}
                />
                <div className="met" style={{ background: '#fff', color: 'rgba(0, 0, 0, 0.65)' }}>
                    {new Date().toLocaleDateString()}
                </div>
            </div>

        </Header>
    )
}


export default HeaderContainer;