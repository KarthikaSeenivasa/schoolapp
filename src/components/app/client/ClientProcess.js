import React from 'react';
import { connect } from 'react-redux';
import { Modal, Steps, Spin } from 'antd';

import ClientDetails from './ClientDetails';

import { addClient, updateClient } from '../../../actions/ClientActions';
import ContactsList from './ContactsList';

const { Step } = Steps;

class ClientProcess extends React.Component {

    state = {
        currentStep: 0,
        addedRecord: null
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    onOk = (e) => {
        if (this.state.currentStep === 0) {
            this.handleClientOperation();
        }
        if (this.state.currentStep === 1) {
            this.props.onCancel();
        }

    }


    handleClientOperation = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { name, email } = { ...values };

                if (this.props.formMode === 1) {
                    this.props.dispatch(addClient(name, email, this.performAddCallback));
                } else {
                    if (name !== this.props.recordToEdit.name || email !== this.props.recordToEdit.email) {
                        this.props.dispatch(updateClient(this.props.recordToEdit.id, name, email, () => {
                            this.setState({
                                currentStep: 1
                            });
                        })
                        );
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

    performAddCallback = (addedRecord) => {
        this.setState({
            addedRecord,
            currentStep: 1
        })
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {

        return (
            <Modal visible={this.props.visible}
                title={(this.props.formMode === 1) ? 'Add New Client' : 'Edit Client Information'}
                okText={this.state.currentStep === 0 ? "Next" : "Finish"}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                centered
                okButtonProps={{
                    disabled: this.props.clientActionLoading
                }}
                cancelButtonProps={{
                    disabled: this.props.clientActionLoading
                }}
                width="calc(50vw)"
                destroyOnClose
            >
                <Steps current={this.state.currentStep}>
                    <Step title="Client Details" />
                    <Step title="Contacts" />
                </Steps>
                <Spin spinning={this.props.clientActionLoading}>
                    {
                        this.state.currentStep === 0 &&
                        <ClientDetails wrappedComponentRef={this.saveFormRef}
                            formMode={this.props.formMode}
                            recordToEdit={this.props.recordToEdit} />
                    }
                    {
                        this.state.currentStep === 1 &&
                        <ContactsList recordToEdit={this.state.addedRecord ? this.state.addedRecord : this.props.recordToEdit} />
                    }
                </Spin>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        clients: state.clients.clients,
        clientActionLoading: state.clients.clientActionLoading
    }
}
export default connect(mapStateToProps)(ClientProcess);
