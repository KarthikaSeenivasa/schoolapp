import React from 'react';
import { connect } from 'react-redux';
import { Layout, Button, Modal } from 'antd';
import './style.scss';

import ClientProcess from './ClientProcess';
import ClientsList from './ClientsList';

import { getClients, deleteClient } from '../../../actions/ClientActions';

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
                        <ClientsList handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            dataSource={this.props.clients}
                            loading={this.props.loading} />
                    </div>
                    <div className="frm-con">
                        {
                            this.state.showFormModal &&
                            <ClientProcess
                                visible={this.state.showFormModal}
                                onCancel={this.handleCancel}
                                formMode={this.state.formMode}
                                recordToEdit={this.state.recordToEdit}
                            />
                        }
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