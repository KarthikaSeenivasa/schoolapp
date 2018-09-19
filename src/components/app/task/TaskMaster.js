import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Spin, Modal } from 'antd';
import './style.scss';

import TreeWrapper from './TreeWrapper';
import FormWrapper from './FormWrapper';

import { getTasks, addTask, deleteTask, updateTask } from '../../../actions/TaskActions';

const { Header, Content } = Layout;
const { confirm } = Modal;

class TaskMaster extends React.Component {

    state = {
        showFormModal: false,
        formMode: -1, //1 for Add, 2 for Edit
        recordToEdit: null
    }

    showDeleteConfirm = (id) => {
        let self = this;
        confirm({
            title: 'Are you sure you want to delete this task?',
            content: 'All the subtasks will also be deleted.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.handleDeleteConfirmation(id);
            }
        });
    }

    handleDeleteConfirmation = (id) => {
        this.props.dispatch(deleteTask(id));
    }

    handleDeleteAction = (record) => {
        this.showDeleteConfirm(record.id);
    }

    handleEditAction = (record) => {
        this.setState({
            showFormModal: true,
            formMode: 2,
            recordToEdit: record
        });
    }

    handleFormSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { taskName, headId } = { ...values };
                headId = headId === null ? undefined : headId;
                if (this.state.formMode === 1) {
                    this.props.dispatch(addTask(taskName, headId));
                } else {
                    this.props.dispatch(updateTask(this.state.recordToEdit.id, taskName, headId));
                }
                form.resetFields();
                this.setState({
                    showFormModal: false
                });
            }
        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleCancel = () => {
        this.setState({
            showFormModal: false
        });
    }

    handleAdd = (e) => {
        this.setState({
            showFormModal: true,
            formMode: 1
        });
    }


    componentWillMount() {
        this.props.dispatch(getTasks());
    }

    render() {
        let taskTreeContainer = this.props.tasks.length === 0
            ? <div style={{ textAlign: 'center' }}>No Tasks</div> :
            <TreeWrapper tasks={this.props.tasks}
                onDelete={this.handleDeleteAction}
                onEdit={this.handleEditAction} />;
        return (
            <Layout className="tsk-mtr">
                <Header className="hdr">
                    <span style={{ marginLeft: '10px' }}>Task Tree</span>
                    <Button onClick={this.handleAdd} style={{ margin: '1px 10px 1px 0px', height: '25px' }}>Add Task</Button>
                </Header>
                <Content className="con">
                    <Spin spinning={this.props.loading}>
                        <div className="tab-con">
                            {taskTreeContainer}
                        </div>
                    </Spin>
                    <FormWrapper wrappedComponentRef={this.saveFormRef}
                        visible={this.state.showFormModal}
                        onCancel={this.handleCancel}
                        onSubmit={this.handleFormSubmit}
                        formMode={this.state.formMode}
                        recordToEdit={this.state.recordToEdit}
                        tasks={this.props.taskList}
                    />
                </Content>
            </Layout>
        );
    }

}

const mapStateToProps = (state) => {
    let taskList = [];
    if (state.tasks.tasks.length > 0) {
        for (let task of state.tasks.tasks) {
            taskList.push({
                id: task.id,
                taskName: task.taskName
            });
            if (task.subtasks.length > 0) {
                for (let subTask of task.subtasks) {
                    taskList.push({
                        id: subTask.id,
                        taskName: subTask.taskName
                    });
                }
            }
        }
    }
    return {
        tasks: state.tasks.tasks,
        taskList: taskList,
        loading: state.tasks.loading
    }
}
export default connect(mapStateToProps)(TaskMaster);