import React from 'react';
import { connect } from 'react-redux';
import ChartistGraph from 'react-chartist';
import Legend from "chartist-plugin-legend";
import { Layout, Spin, Divider } from 'antd';

import HeaderContainer from './HeaderContainer';

import './style.scss';
import { getProjects } from '../../../../actions/ProjectActions';
import BudgetVsActualTable from './BudgetVsActualTable';
import { getBudgetVsActual } from '../../../../actions/ReportsActions';

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
        }));
    }

    render() {
        let chartOptions = {
            plugins: [
                Legend({})
            ]
        }

        let animation = {
            draw: function (data) {
                if (data.type === "bar") {
                    data.element.animate({
                        opacity: {
                            begin: (data.index + 1) * 80,
                            dur: 500,
                            from: 0,
                            to: 1,
                            easing: "ease"
                        }
                    });
                }
            }
        }
        return (
            <Layout className="rep" >
                <HeaderContainer onProjectChange={this.onProjectChange}
                    projects={this.props.projects}
                    loading={this.props.projectsLoading}
                />
                <Content className="con">
                    <Spin spinning={this.props.loading}>
                        <div className="cht-con">
                            {
                                this.props.reports &&
                                <div className="cht">
                                    <ChartistGraph type="Bar"
                                        data={this.props.reports ? this.props.reports.chartData : null}
                                        style={{ width: '100%', height: '100%' }}
                                        options={chartOptions}
                                        listener={animation}
                                    />
                                </div>
                            }
                            <Divider type="vertical" style={{ height: '100%' }} />
                            {
                                this.props.reports &&
                                <div className="prj-dta">
                                    <div className="prj-val">
                                        Esskay Job Number: {this.props.reports.esskayJN}
                                    </div>
                                    <div className="prj-val">
                                        Client Job Number: {this.props.reports.clientJN}
                                    </div>
                                    <div className="prj-val">
                                        Client: {this.props.reports.client}
                                    </div>
                                    <div className="prj-val">
                                        Team Leads: {this.props.reports.teamLeader.toString()}
                                    </div>
                                    <div className="prj-val">
                                        Job Name: {this.props.reports.jobName}
                                    </div>
                                </div>
                            }

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