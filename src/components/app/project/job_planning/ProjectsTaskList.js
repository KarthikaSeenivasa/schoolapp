import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { getProjectSpecificTasks, updateProjectSpecificTasks } from '../../../../actions/ProjectActions';

import ProjectsTaskDetails from './ProjectsTaskDetails';

class ProjectsTaskList extends React.Component {

    constructor(props) {
        super(props);
        if (props.allowEdit) {
            this.columns.push({
                title: "Actions",
                render: this.renderActions,
                width: 150
            })
        }
    }

    state = {
        showModal: false,
        selectedTask: null
    }

    renderActions = (text, record) => {
        let self = this;
        return (
            <span>
                <a onClick={() => {
                    self.handleEdit(text, record);
                }}>Edit</a>
            </span>)
    }

    handleEdit = (text, record) => {
        this.setState({
            showModal: true,
            selectedTask: record
        })
    }

    handleCancel = () => {
        this.setState({
            showModal: false,
            selectedTask: null
        })
    }

    componentWillMount() {
        this.props.dispatch(getProjectSpecificTasks(this.props.recordToEdit.id));
    }

    handleEditProjectSpecificTask = (resourceAllocated, weightage) => {
        let { selectedTask } = this.state;
        this.props.dispatch(updateProjectSpecificTasks(selectedTask.id, selectedTask.project.id, selectedTask.taskMaster.id, resourceAllocated, weightage));
        this.handleCancel();
    }

    columns = [
        {
            title: "Task Name",
            dataIndex: "taskMaster.taskName",
            width: 150
        },
        {
            title: "Resource Allocated",
            dataIndex: "resourceAllocated",
            width: 150
        },
        {
            title: "Weightage",
            dataIndex: "weightage",
            width: 150
        }
    ];


    render() {

        return (
            <div className="hls-form">
                <Table size="small"
                    loading={this.props.loading}
                    dataSource={this.props.projectSpecificTasks}
                    columns={this.columns}
                    pagination={false}
                    rowKey="id"
                />
                {
                    this.state.showModal &&
                    <ProjectsTaskDetails visible={this.state.showModal}
                        onOk={this.handleEditProjectSpecificTask}
                        onCancel={this.handleCancel}
                        selectedTask={this.state.selectedTask}
                        projectSpecificTasks={this.props.projectSpecificTasks}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSpecificTasks: state.projects.projectSpecificTasks,
        loading: state.projects.projectSpecificTasksLoading
    }
}

export default connect(mapStateToProps)(ProjectsTaskList);