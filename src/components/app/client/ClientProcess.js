import React from 'react';
import { connect } from 'react-redux';
import { Modal, Steps } from 'antd';

import ClientDetails from './ClientDetails';

import { addClient, updateClient } from '../../../actions/ClientActions';
import ContactsList from './ContactsList';

const { Step } = Steps;

class ClientProcess extends React.Component {

    state = {
        currentStep: 0
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
                    this.props.dispatch(addClient(name, email));
                } else {
                    this.props.dispatch(updateClient(this.props.recordToEdit.id, name, email));
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

    render() {

        return (
            <Modal visible={this.props.visible}
                title={(this.props.formMode === 1) ? 'Add New Client' : 'Edit Client Information'}
                okText={this.state.currentStep === 0 ? "Next" : "Finish"}
                onCancel={this.props.onCancel}
                onOk={this.onOk}
                centered
                okButtonProps={{
                    loading: this.props.clientActionLoading,
                    disabled: this.props.clientActionLoading
                }}
                destroyOnClose
            >
                <Steps current={this.state.currentStep}>
                    <Step title="Client Details" />
                    <Step title="Contacts" />
                </Steps>
                {
                    this.state.currentStep === 0 &&
                    <ClientDetails wrappedComponentRef={this.saveFormRef} 
                                   formMode={this.props.formMode}
                                   recordToEdit={this.props.recordToEdit} />
                }
                {
                    this.state.currentStep === 1 &&
                    <ContactsList recordToEdit={this.props.recordToEdit} />
                }
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
