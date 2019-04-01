import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Modal } from 'antd';

import '../style.scss';

import ProjectsList from './ProjectsList';
import ProjectProcess from './ProjectProcess';

import { getProjects, deleteProject } from '../../../../actions/ProjectActions';
import { getClients } from '../../../../actions/ClientActions';
import { getAllRoles } from '../../../../actions/UserActions';

const { Header, Content } = Layout;

class JobPlanning extends React.Component {

    constructor(props) {
        super(props);
        this.allowEdit = props.userRoles.includes('ROLE_MANAGEMENT') ||
            props.userRoles.includes('ROLE_ADMIN') ||
            props.userRoles.includes('ROLE_COORDINATOR');
    }

    state = {
        showFormModal: false,
        formMode: -1, //1 for Add, 2 for Edit, 3 for view
        recordToEdit: null,
        leadId: "all" 
    }

    showDeleteConfirm = (id) => {
        let self = this;
        Modal.confirm({
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

    handleViewAction = (id, record) => {
        this.setState({
            showFormModal: true,
            formMode: 3,
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

    onPageChange = (page, pageSize) => {
        this.props.dispatch(getProjects(undefined, page, pageSize, false, this.state.leadId));
    }

    getInitialClientId = () => {
        if (this.state.formMode !== 1 && this.state.recordToEdit.client) {
            return this.state.recordToEdit.client.id;
        }
        return undefined;
    }

    getInitialTeamLeadIds = () => {
        if (this.state.formMode !== 1 && this.state.recordToEdit.headEmployee) {
            return this.state.recordToEdit.headEmployee.map((emp) => {
                return emp.user.id;
            });

        }
        return undefined;
    }

    getInitialStatus = () => {
        if (this.state.formMode !== 1 && this.state.recordToEdit.status) {
            return this.state.recordToEdit.status;
        }
        return undefined;
    }

    getInitialContactIds = () => {
        if (this.state.formMode !== 1 && this.state.recordToEdit.contact) {
            return this.state.recordToEdit.contact.map((contact) => {
                return contact.id;
            });

        }
        return undefined;
    }

    handleLeadFilterChange = (lead) => {
        this.setState({
            leadId: lead
        });
        this.props.dispatch(getProjects(undefined, 1, 10, false, lead));
    }

    render() {
        return (
            <Layout className="proj" >
                <Header className="head">
                    <span>Job Planning</span>
                    {
                        this.allowEdit &&
                        <div>
                            <Button className="btns" onClick={this.handleAddAction}>Add Job</Button>
                        </div>
                    }
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <ProjectsList handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            handleView={this.handleViewAction}
                            dataSource={this.props.projects}
                            loading={this.props.loading}
                            allowEdit={this.allowEdit}
                            onPageChange={this.onPageChange}
                            numberOfRows={this.props.numberOfRows}
                            leads={this.props.leads}
                            leadsLoading={this.props.leadsLoading}
                            handleLeadFilterChange={this.handleLeadFilterChange}
                        />
                    </div>
                    {
                        this.state.showFormModal &&

                        <div className="form-con">
                            <ProjectProcess visible={this.state.showFormModal}
                                onCancel={this.handleCancel}
                                formMode={this.state.formMode}
                                recordToEdit={this.state.recordToEdit}
                                initialClientId={this.getInitialClientId()}
                                initialTeamLeadIds={this.getInitialTeamLeadIds()}
                                initialStatus={this.getInitialStatus()}
                                initialContactIds={this.getInitialContactIds()}
                            />
                        </div>
                    }
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    let leads = [];
    if (state.user.roles.length > 0) {
        for (let role of state.user.roles) {
            if (role.name === "ROLE_LEADER" || role.name === "ROLE_MANAGEMENT") {
                leads = leads.concat(role.users);
            }
        }
    }
    return {
        projects: state.projects.projects,
        numberOfRows: state.projects.numberOfRows,
        loading: state.projects.loading,
        userRoles: state.user.userRoles,
        leads: leads,
        leadsLoading: state.user.rolesLoading
    }
}
export default connect(mapStateToProps)(JobPlanning);