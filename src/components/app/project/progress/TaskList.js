import React from 'react';
import { connect } from 'react-redux';
import { Modal, Table } from 'antd';
import { getProjectSpecificTasks, updateProjectSpecificTasks, addProjectTaskProgress, updateProjectTaskProgress } from '../../../../actions/ProjectActions';
import { findIndexOf } from '../../../../utils/Util';
import TaskProgress from './TaskProgress';

class TaskList extends React.Component {

    state = {
        showProgressTable: false,
        selectedTask: null
    }

    renderActions = (text, record) => {
        let self = this;
        return (
            <span>
                <a onClick={() => {
                    self.handleEdit(text, record);
                }}>Edit Progress</a>
            </span>)
    }

    handleEdit = (text, record) => {
        this.setState({
            showProgressTable: true,
            selectedTask: record
        })
    }

    handleCancel = () => {
        this.setState({
            showProgressTable: false,
            selectedTask: null
        })
    }

    onAddProgress = (id, date, progressPercentage) => {
        this.props.dispatch(addProjectTaskProgress(id, date, progressPercentage));
    }

    onEditProgress = (id, date, progressPercentage) => {
        this.props.dispatch(updateProjectTaskProgress(id, this.state.selectedTask.id, date, progressPercentage));
    }

    componentWillMount() {
        this.props.dispatch(getProjectSpecificTasks(this.props.recordToEdit.id));
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.projectSpecificTasks !== nextProps.projectSpecificTasks) {
            if (this.state.selectedTask !== null) {
                let index = findIndexOf(nextProps.projectSpecificTasks, this.state.selectedTask.id);
                if (index !== -1) {
                    this.setState({
                        selectedTask: nextProps.projectSpecificTasks[index]
                    })
                }
            }
        }
    }

    render() {
        const columns = [
            {
                title: "Task Name",
                dataIndex: "taskMaster.taskName",
                width: 200
            },
            {
                title: "Actions",
                render: this.renderActions,
                width: 200
            }
        ];
        const { visible, onCancel } = this.props;

        return (
            <Modal visible={visible}
                title='Project Tasks and Progress'
                footer={null}
                onCancel={onCancel}
                maskClosable={false}
                destroyOnClose
                centered
            >
                <Table size="small"
                    loading={this.props.loading}
                    dataSource={this.props.projectSpecificTasks}
                    columns={columns}
                    pagination={false}
                    rowKey="id"
                />

                {
                    this.state.showProgressTable &&
                    <TaskProgress visible={this.state.showProgressTable}
                        onCancel={this.handleCancel}
                        title={this.state.selectedTask.taskMaster.taskName}
                        selectedTask={this.state.selectedTask}
                        dataSource={this.state.selectedTask.progress}
                        onEditProgress={this.onEditProgress}
                        onAddProgress={this.onAddProgress}
                        allowEdit={this.props.userRoles.includes('ROLE_MANAGEMENT')}
                    />

                }
            </Modal >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        projectSpecificTasks: state.projects.projectSpecificTasks,
        loading: state.projects.projectSpecificTasksLoading,
        userRoles: state.user.userRoles
    }
}

export default connect(mapStateToProps)(TaskList);