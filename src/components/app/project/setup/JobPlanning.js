import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Modal } from 'antd';
import '../style.scss';

import TableWrapper from './TableWrapper';
import SetupModal from './SetupModal';

import { getProjects, deleteProject } from '../../../../actions/ProjectActions';

import { getClients } from '../../../../actions/ClientActions';

import { getAllRoles } from '../../../../actions/UserActions';

const { Header, Content } = Layout;
const { confirm } = Modal;

class ProjectSetup extends React.Component {

    state = {
        showFormModal: false,
        formMode: -1, //1 for Add, 2 for Edit
        recordToEdit: null
    }

    showDeleteConfirm = (id) => {
        let self = this;
        confirm({
            title: 'Are you sure you want to delete this project?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.handleDeleteConfirmation(id);
            }
        });
    }

    handleDeleteConfirmation = (id) => {
        this.props.dispatch(deleteProject(id));
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

    handleCancel = () => {
        this.setState({
            showFormModal: false
        });
    }

    handleAddAction = (e) => {
        this.setState({
            showFormModal: true,
            formMode: 1
        });
    }

    componentWillMount() {
        this.props.dispatch(getClients());
        this.props.dispatch(getProjects());
        this.props.dispatch(getAllRoles());
    }

    getInitialClientId = () => {
        if (this.state.formMode === 2 && this.state.recordToEdit.client) {
            return this.state.recordToEdit.client.id;
        }
        return undefined;
    }

    getInitialTeamLeadIds = () => {
        if (this.state.formMode === 2 && this.state.recordToEdit.headEmployee) {
            return this.state.recordToEdit.headEmployee.map((emp) => {
                return emp.user.id;
            });

        }
        return undefined;
    }

    getInitialStatus = () => {
        if (this.state.formMode === 2 && this.state.recordToEdit.status) {
            return this.state.recordToEdit.status;
        }
        return undefined;
    }

    render() {
        return (
            <Layout className="proj" >
                <Header className="head">
                    <span>Job Planning</span>
                    <div>
                        <Button className="btns" onClick={this.handleAddAction}>Add Project</Button>
                    </div>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <TableWrapper handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            dataSource={this.props.projects}
                            loading={this.props.loading} />
                    </div>
                    {
                        this.state.showFormModal &&

                        <div className="form-con">
                            <SetupModal visible={this.state.showFormModal}
                                onCancel={this.handleCancel}
                                formMode={this.state.formMode}
                                recordToEdit={this.state.recordToEdit}
                                initialClientId={this.getInitialClientId()}
                                initialTeamLeadIds={this.getInitialTeamLeadIds()}
                                initialStatus={this.getInitialStatus()}
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
        projects: state.projects.projects,
        loading: state.projects.loading,
    }
}
export default connect(mapStateToProps)(ProjectSetup);