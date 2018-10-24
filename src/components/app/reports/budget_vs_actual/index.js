import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin, Divider } from 'antd';

import HeaderContainer from './HeaderContainer';

import './style.scss';
import { getProjects } from '../../../../actions/ProjectActions';
import BudgetVsActualTable from './BudgetVsActualTable';
import { getBudgetVsActual } from '../../../../actions/ReportsActions';
import BudgetVsActualGraph from './BudgetVsActualGraph';
import ProjectDetails from './ProjectDetails';

const { Content } = Layout;

class BudgetVsActual extends React.Component {

    state = {
        project: null
    }

    onProjectChange = (value, option) => {
        for (let project of this.props.projects) {
            if (project.id === value) {
                this.changeProject(project);
                break;
            }
        }
    }

    changeProject = (project) => {
        this.setState({
            project
        });
        this.props.dispatch(getBudgetVsActual(project.id));
    }

    componentWillMount() {
        this.props.dispatch(getProjects(()=>{
            this.changeProject(this.props.projects[0]);
        }, -1, -1));
    }

    render() {
        return (
            <Layout className="rep" >
                <HeaderContainer onProjectChange={this.onProjectChange}
                    projects={this.props.projects}
                    loading={this.props.projectsLoading}
                />
                <Content className="con">
                    <Spin spinning={this.props.loading}>
                        <div className="cht-con">
                            <BudgetVsActualGraph reports={this.props.reports} />
                            <Divider type="vertical" style={{ height: '100%' }} />
                            <ProjectDetails reports={this.props.reports} />
                        </div>
                        <BudgetVsActualTable dataSource={this.props.reports ? this.props.reports.rows : []} />
                    </Spin>
                </Content>
            </Layout >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reports: state.reports.reports,
        loading: state.reports.loading,
        projects: state.projects.projects,
        projectsLoading: state.projects.loading
    }
}

export default connect(mapStateToProps)(BudgetVsActual);