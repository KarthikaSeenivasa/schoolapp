
import React from 'react';
import { connect } from 'react-redux';
import { Table, Divider, Button, Modal } from 'antd';
import { getContacts, addContact, updateContact, deleteContact } from '../../../actions/ClientActions';
import ContactsDetails from './ContactsDetails';

class ContactsList extends React.Component {

    state = {
        showModal: false,
        formMode: -1,
        recordToEdit: null
    }

    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Contact Name',
                dataIndex: 'name'
            },
            {
                title: 'Designation',
                dataIndex: 'designation'
            },
            {
                title: 'Phone',
                dataIndex: 'phone'
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions
            }
        ];
    }

    renderActions = (text, record) => {
        let self = this;
        return (
            <span>
                <a onClick={() => {
                    self.handleEditAction(text, record);
                }}>Edit</a>
                <Divider type="vertical" />
                <a onClick={() => {
                    self.handleDeleteAction(text, record);
                }}>Delete</a>
            </span>)
    }

    showDeleteConfirm = (id) => {
        let self = this;
        Modal.confirm({
            title: 'Are you sure you want to delete this contact?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                self.handleDeleteConfirmation(id);
            }
        });
    }

    handleDeleteConfirmation = (id) => {
        this.props.dispatch(deleteContact(id, this.props.recordToEdit.id));
    }

    renderTitle = (currentTableData) => {
        let self = this;
        return (
            <div className="title">
                <Button type="primary" size="small" onClick={self.handleAddAction}>Add Contact</Button>
            </div>
        )
    }


    handleEditAction = (text, record) => {
        this.setState({
            showModal: true,
            formMode: 2,
            recordToEdit: record
        })
    }

    handleDeleteAction = (id, record) => {
        this.showDeleteConfirm(record.id);
    }

    handleAddAction = (e) => {
        this.setState({
            showModal: true,
            formMode: 1
        })
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        });
    }

    componentWillMount() {
        this.props.dispatch(getContacts(this.props.recordToEdit.id));
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleOk = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { name, phone, primaryEmail, secondaryEmail, designation } = { ...values };

                if (this.state.formMode === 1) {
                    this.props.dispatch(addContact(this.props.recordToEdit.id, name, phone, designation, primaryEmail, secondaryEmail));
                } else {
                    this.props.dispatch(updateContact(this.state.recordToEdit.id, name, phone, designation, primaryEmail, secondaryEmail, this.props.recordToEdit.id));
                }

                form.resetFields();
                this.handleCancel();
            }
        });
    }

    render() {
        return (
            <div className="cls-frm">
                <Table columns={this.columns}
                    dataSource={this.props.contacts}
                    loading={this.props.loading}
                    pagination={false}
                    title={this.renderTitle}
                    size="small"
                    rowKey="id" />

                {
                    this.state.showModal &&
                    <ContactsDetails wrappedComponentRef={this.saveFormRef}
                        title={this.state.editMode ? "Edit Contact" : "Add Contact"}
                        visible={this.state.showModal}
                        formMode={this.state.formMode}
                        recordToEdit={this.state.recordToEdit}
                        handleCancel={this.handleCancel}
                        handleOk={this.handleOk}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        contacts: state.clients.contacts,
        loading: state.clients.contactsLoading
    }
}

export default connect(mapStateToProps)(ContactsList);