import React from 'react';
import { connect } from 'react-redux';
import { Modal, Steps } from 'antd';

import ProjectDetails from './ProjectDetails';
import TaskResourceAllocation from './TaskResourceAllocation';

import { addProject, updateProject } from '../../../../actions/ProjectActions';

const { Step } = Steps;

class ProjectProcess extends React.Component {

    state = {
        currentStep: 0
    }

    onOk = (e) => {
        if (this.state.currentStep === 0) {
            this.handleSetupOperation();
        }
        if(this.state.currentStep === 1) {
            this.props.onCancel();
        }

    }


    handleSetupOperation = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { name, clientName, startDate, endDate, budget, teamLeads, status, dateOfCompletion } = { ...values };
                if (this.props.formMode === 1) {
                    this.props.dispatch(addProject(name, clientName, startDate, endDate, budget, teamLeads, status, dateOfCompletion));
                } else {
                    this.props.dispatch(updateProject(this.props.recordToEdit.id, name, clientName, startDate, endDate, budget, teamLeads, status, dateOfCompletion));
                }
                form.resetFields();
                if (this.state.currentStep === 0) {
                    this.setState({
                        currentStep: 1
                    });
                } else {
                    this.props.onCancel();
                }

            }
        });
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    getOkText = () => {
        if (this.state.currentStep === 0) {
            if (this.props.formMode === 1) {
                return 'Add Project';
            } else {
                return 'Edit Project';
            }
        } else {
            return 'Done';
        }
    }

    render() {
        const { visible, onCancel } = this.props;
        return (
            <Modal visible={visible}
                title="Project Setup"
                okText={this.getOkText()}
                onCancel={onCancel}
                onOk={this.onOk}
                width='calc(70vw)'
                centered
                okButtonProps={{
                    loading: this.props.projectActionLoading,
                    disabled: this.props.projectActionLoading
                }}
                destroyOnClose
            >
                <Steps current={this.state.currentStep}>
                    <Step title="Basic Setup" />
                    <Step title="Resource Allocation" />
                </Steps>
                {
                    this.state.currentStep === 0 &&
                    <ProjectDetails wrappedComponentRef={this.saveFormRef}
                        recordToEdit={this.props.recordToEdit}
                        formMode={this.props.formMode}
                        initialClientId={this.props.initialClientId}
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
                        <TaskResourceAllocation recordToEdit={this.props.recordToEdit}
                                                allowEdit={this.props.formMode !== 3}
                        />
                    </div>
                }
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
        projectActionLoading: state.projects.projectActionLoading
    }
}
export default connect(mapStateToProps)(ProjectProcess);
