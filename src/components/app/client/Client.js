import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Form, Modal } from 'antd';
import './style.scss';

import FormWrapper from './FormWrapper';
import TableWrapper from './TableWrapper';

import { getClients, addClient, updateClient, deleteClient } from '../../../actions/ClientActions';

const { Header, Content } = Layout;
const { confirm } = Modal;

class Client extends React.Component {

    state = {
        showFormModal: false,
        formMode: -1, //1 for Add, 2 for Edit
        recordToEdit: null
    }

    showDeleteConfirm = (id) => {
        let self = this;
        confirm({
            title: 'Are you sure you want to delete this client?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.handleDeleteConfirmation(id);
            }
        });
    }

    handleDeleteConfirmation = (id) => {
        this.props.dispatch(deleteClient(id));
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
                let { name, primaryEmail, secondaryEmail } = { ...values };
                if (this.state.formMode === 1) {
                    this.props.dispatch(addClient(name, primaryEmail, secondaryEmail));
                } else {
                    this.props.dispatch(updateClient(this.state.recordToEdit.id, name, primaryEmail, secondaryEmail));
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
        this.props.dispatch(getClients());
    }

    render() {
        return (
            <Layout className="cli" >
                <Header className="hdr">
                    <span>Clients</span>
                    <div>
                        <Button className="btn" onClick={this.handleAdd}>Add Client</Button>
                    </div>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <TableWrapper handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            dataSource={this.props.clients}
                            loading={this.props.loading} />
                    </div>
                    <div className="frm-con">
                        <FormWrapper wrappedComponentRef={this.saveFormRef}
                            visible={this.state.showFormModal}
                            onCancel={this.handleCancel}
                            onSubmit={this.handleFormSubmit}
                            formMode={this.state.formMode}
                            recordToEdit={this.state.recordToEdit}
                        />
                    </div>
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        clients: state.clients.clients,
        loading: state.clients.loading
    }
}
export default connect(mapStateToProps)(Client);