import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { getProjectSpecificTasks, updateProjectSpecificTasks } from '../../../../actions/ProjectActions';

import ResourceAllocation from './ResourceAllocation';

class TaskResourceAllocation extends React.Component {

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
        let {selectedTask} =  this.state;
        this.props.dispatch(updateProjectSpecificTasks(selectedTask.id, selectedTask.project.id, selectedTask.taskMaster.id, resourceAllocated, weightage));
        this.handleCancel();
    }

    render() {
        const columns = [
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
                title: "Actions",
                render: this.renderActions,
                width: 150
            }
        ];

        return (
            <div className="hls-form">
                <Table size="small"
                    loading={this.props.loading}
                    dataSource={this.props.projectSpecificTasks}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />
                {
                    this.state.showModal &&
                    <ResourceAllocation visible={this.state.showModal}
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

export default connect(mapStateToProps)(TaskResourceAllocation);