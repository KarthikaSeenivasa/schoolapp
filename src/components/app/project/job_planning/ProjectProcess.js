import React from 'react';
import { connect } from 'react-redux';
import { Modal, Steps, Spin } from 'antd';

import ProjectDetails from './ProjectDetails';
import ProjectsTaskList from './ProjectsTaskList';

import { addProject, updateProject } from '../../../../actions/ProjectActions';
import { isEqual, compareDates } from '../../../../utils/Util';

const { Step } = Steps;

class ProjectProcess extends React.Component {

    state = {
        currentStep: 0,
        projectRow: null
    }

    onOk = (e) => {
        if (this.state.currentStep === 0) {
            this.handleSetupOperation();
        }
        if (this.state.currentStep === 1) {
            this.props.onCancel();
        }

    }

    isUpdateNeeded = (formValues) => {
        let { recordToEdit, initialContactIds, initialTeamLeadIds, initialStatus } = this.props;

        if (!isEqual(formValues.name, recordToEdit.name) ||
            !isEqual(formValues.esskayJN, recordToEdit.esskayJN) ||
            !isEqual(formValues.clientJN, recordToEdit.clientJN) ||
            !isEqual(formValues.contactId, initialContactIds) ||
            !isEqual(formValues.headEmployeeIds, initialTeamLeadIds) ||
            !isEqual(formValues.status, initialStatus) ||
            !isEqual(formValues.statusDescription, recordToEdit.statusDescription) ||
            !isEqual(formValues.budget, recordToEdit.budget)) {

            return true;
        }

        if (!compareDates(formValues.startDate, recordToEdit.startDate) ||
            !compareDates(formValues.receivingDate, recordToEdit.receivingDate) ||
            !compareDates(formValues.plannedIFA, recordToEdit.plannedIFA) ||
            !compareDates(formValues.actualIFA, recordToEdit.actualIFA) ||
            !compareDates(formValues.actualIFF, recordToEdit.actualIFF)) {

            return true;
        }
        return false;
    }

    handleSetupOperation = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { name, esskayJN, clientJN, clientId, contactId, headEmployeeIds, status, statusDescription, startDate, plannedIFA, budget, receivingDate, actualIFA, actualIFF } = { ...values };

                if (this.props.formMode === 1) {
                    this.props.dispatch(addProject(name, esskayJN, clientJN, clientId, contactId,
                        headEmployeeIds, status, statusDescription, startDate,
                        plannedIFA, budget, receivingDate, actualIFA, actualIFF, this.performAddCallback));
                } else {
                    if (this.isUpdateNeeded(values, this.props.recordToEdit)) {
                        this.props.dispatch(updateProject(this.props.recordToEdit.id, name, esskayJN,
                            clientJN, clientId, contactId, headEmployeeIds, status,
                            statusDescription, startDate, plannedIFA, budget, receivingDate,
                            actualIFA, actualIFF, this.performAddCallback));
                    } else {
                        this.setState({
                            currentStep: 1
                        });
                    }
                }
                form.resetFields();
            }
        });
    }

    performAddCallback = (projectRow) => {
        this.setState({
            projectRow,
            currentStep: 1
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    isRoleAllowedToEdit = () => {
        let userRoles = this.props.user.userRoles;
        
        if (userRoles.includes('ROLE_ADMIN') ||
            userRoles.includes('ROLE_MANAGEMENT') ||
            userRoles.includes('ROLE_COORDINATOR')) {
            return true;
        }
        return false;
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                title={(this.props.formMode === 1) ? 'Add New Project' : 'Edit Project Information'}
                okText={this.state.currentStep === 0 ? "Next" : "Finish"}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                width='calc(60vw)'
                centered
                okButtonProps={{
                    disabled: this.props.projectActionLoading
                }}
                cancelButtonProps={{
                    disabled: this.props.projectActionLoading
                }}
                destroyOnClose
            >
                <Steps current={this.state.currentStep}>
                    <Step title="Basic Information" />
                    <Step title="Resource Allocation" />
                </Steps>
                <Spin spinning={this.props.projectActionLoading}>
                    {
                        this.state.currentStep === 0 &&
                        <ProjectDetails wrappedComponentRef={this.saveFormRef}
                            recordToEdit={this.props.recordToEdit}
                            formMode={this.props.formMode}
                            initialClientId={this.props.initialClientId}
                            initialContactIds={this.props.initialContactIds}
                            initialTeamLeadIds={this.props.initialTeamLeadIds}
                            initialStatus={this.props.initialStatus}
                            clients={this.props.clients}
                            clientsLoading={this.props.clientsLoading}
                            leads={this.props.leads}
                            leadsLoading={this.props.leadsLoading}
                        />
                    }
                    {
                        this.state.currentStep === 1 &&
                        <div className="hls-form">
                            <ProjectsTaskList recordToEdit={this.state.projectRow ? this.state.projectRow : this.props.recordToEdit}
                                allowEdit={this.props.formMode !== 3 && this.isRoleAllowedToEdit()}
                            />
                        </div>
                    }
                </Spin>
            </Modal>
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
        clients: state.clients.clients,
        clientsLoading: state.clients.loading,
        leads: leads,
        leadsLoading: state.user.rolesLoading,
        projectActionLoading: state.projects.projectActionLoading,
        user: state.user
    }
}
export default connect(mapStateToProps)(ProjectProcess);
