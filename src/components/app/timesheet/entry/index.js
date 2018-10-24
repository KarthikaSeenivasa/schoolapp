import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Layout, Button, Modal } from 'antd';
import './style.scss';

import { getTimeEntries, addTimeEntry, deleteTimeEntry, updateTimeEntry } from '../../../../actions/TimeEntryActions';
import { getProjects } from '../../../../actions/ProjectActions';
import { getTasks } from '../../../../actions/TaskActions';

import TimeEntryList from './TimeEntryList';
import TimeEntryDetails from './TimeEntryDetails';

const { Header, Content } = Layout;
const { confirm } = Modal;

class TimeEntry extends React.Component {

    state = {
        showFormModal: false,
        formMode: -1, //1 for Add, 2 for Edit
        recordToEdit: null,
        date: moment()
    }

    getInitialProjectId = () => {
        if (this.state.formMode === 2 && this.state.recordToEdit.project) {
            return this.state.recordToEdit.project.id;
        }
        return undefined;
    }

    getInitialLeadId = () => {
        if (this.state.formMode === 2 && this.state.recordToEdit.headEmployee) {
            return this.state.recordToEdit.headEmployee.id;
        }
        return undefined;
    }

    getInitialTaskIds = () => {
        let initialTaskIds = [], taskMaster;
        if (this.state.formMode === 2 && this.state.recordToEdit.taskMaster) {
            taskMaster = this.state.recordToEdit.taskMaster;
            initialTaskIds.unshift(taskMaster.id);
            do {
                taskMaster = taskMaster.headId;
                initialTaskIds.unshift(taskMaster.id);
            } while (taskMaster.headId);

            return initialTaskIds;

        } else if (this.state.formMode === 1 && this.props.tasks.length > 0) {
            taskMaster = this.props.tasks[0];

            initialTaskIds.push(taskMaster.value);
            while (taskMaster.children && taskMaster.children.length > 0) {
                taskMaster = taskMaster.children[0];
                initialTaskIds.push(taskMaster.value);
            }

            return initialTaskIds;
        } else {
            return undefined;
        }
    }

    showDeleteConfirm = (id) => {
        let self = this;
        confirm({
            title: 'Are you sure you want to delete this time entry?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.handleDeleteConfirmation(id);
            }
        });
    }

    handleDeleteConfirmation = (id) => {
        this.props.dispatch(deleteTimeEntry(id));
    }

    handleDeleteAction = (id, record) => {
        this.showDeleteConfirm(record.id);
    }

    handleEditAction = (id, record) => {
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
                let { projectId, headEmployeeId, hours, taskMasterId, description } = { ...values };
                let taskMasterIdParam = taskMasterId ? taskMasterId[taskMasterId.length - 1] : undefined
                if (this.state.formMode === 1) {
                    this.props.dispatch(addTimeEntry(projectId, headEmployeeId, hours, taskMasterIdParam, description));
                } else {
                    this.props.dispatch(updateTimeEntry(this.state.recordToEdit.id, projectId, headEmployeeId, hours, taskMasterIdParam, description));
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
        this.props.dispatch(getProjects(undefined, -1, -1));
        this.props.dispatch(getTasks(true));
        this.props.dispatch(getTimeEntries(moment()));
    }

    handleDateFilterChange = (date) => {
        this.setState({
            date
        });
        this.props.dispatch(getTimeEntries(date));
    }

    onPageChange = (page, pageSize) => {
        this.props.dispatch(getTimeEntries(this.state.date, page, pageSize));
    }

    render() {
        return (
            <Layout className="tm-ety" >
                <Header className="hdr">
                    <span>Time Sheet Entry</span>
                    <div>
                        <Button className="btn" onClick={this.handleAdd}>Add Time Entry</Button>
                    </div>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <TimeEntryList handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            handleDateFilterChange={this.handleDateFilterChange}
                            dataSource={this.props.timeEntries}
                            loading={this.props.timeEntriesLoading}
                            onPageChange={this.onPageChange}
                            numberOfRows={this.props.numberOfRows}
                        />
                    </div>
                    {this.state.showFormModal &&
                        <div className="frm-con">
                            <TimeEntryDetails wrappedComponentRef={this.saveFormRef}
                                visible={this.state.showFormModal}
                                onCancel={this.handleCancel}
                                onSubmit={this.handleFormSubmit}
                                formMode={this.state.formMode}
                                recordToEdit={this.state.recordToEdit}
                                projectsLoading={this.props.projectsLoading}
                                projects={this.props.projects}
                                initialProjectId={this.getInitialProjectId()}
                                initialLeadId={this.getInitialLeadId()}
                                tasksLoading={this.props.tasksLoading}
                                tasks={this.props.tasks}
                                initialTaskIds={this.getInitialTaskIds()}
                            />
                        </div>
                    }
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        timeEntries: state.timeEntries.timeEntries,
        numberOfRows: state.timeEntries.numberOfRows,
        projects: state.projects.projects,
        tasks: state.tasks.cascaderOptions,
        timeEntriesLoading: state.timeEntries.loading,
        projectsLoading: state.projects.loading,
        tasksLoading: state.tasks.loading
    }
}
export default connect(mapStateToProps)(TimeEntry);