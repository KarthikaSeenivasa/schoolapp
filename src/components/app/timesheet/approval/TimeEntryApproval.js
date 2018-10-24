import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import './style.scss';

import TableWrapper from './TableWrapper';
import FormWrapper from './FormWrapper';

import { getTimeEntryApprovals, updateTimeEntryApproval } from '../../../../actions/TimeEntryActions';

const { Header, Content } = Layout;

class TimeEntryApproval extends React.Component {

    state = {
        showFormModal: false,
        recordToEdit: null,
        status: 'PENDING'
    }

    handleEditAction = (id, record) => {
        this.setState({
            showFormModal: true,
            recordToEdit: record
        });
    }

    handleFormSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                let { remarks } = { ...values };
                this.props.dispatch(updateTimeEntryApproval(this.state.recordToEdit.id, undefined, remarks));
                form.resetFields();
                this.setState({
                    showFormModal: false
                });
            }
        });
    }

    handleStatusChange = (record, value) => {
        this.props.dispatch(updateTimeEntryApproval(record.id, value));
    }

    handleStatusFilterChange = (value, option) => {
        this.props.dispatch(getTimeEntryApprovals(value));
        this.setState({
            status: value
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

    onPageChange = (page, pageSize) => {
        this.props.dispatch(getTimeEntryApprovals(this.state.status, page, pageSize));
    }

    componentWillMount() {
        this.props.dispatch(getTimeEntryApprovals("PENDING"));
    }

    render() {
        return (
            <Layout className="tim-etry" >
                <Header className="hdr">
                    <span>Time Sheet Approval</span>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <TableWrapper handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            handleStatusChange={this.handleStatusChange}
                            handleStatusFilterChange={this.handleStatusFilterChange}
                            dataSource={this.props.timeEntryApprovals}
                            loading={this.props.loading}
                            onPageChange={this.onPageChange}
                            numberOfRows={this.props.numberOfRows}
                        />
                    </div>
                    <div className="frm-con">
                        {this.state.showFormModal &&
                            < FormWrapper wrappedComponentRef={this.saveFormRef}
                                visible={this.state.showFormModal}
                                onCancel={this.handleCancel}
                                onSubmit={this.handleFormSubmit}
                                recordToEdit={this.state.recordToEdit}
                            />}
                    </div>
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        timeEntryApprovals: state.timeEntries.timeEntryApprovals,
        numberOfRows: state.timeEntries.numberOfRows,
        loading: state.timeEntries.approvalsLoading
    }
}
export default connect(mapStateToProps)(TimeEntryApproval);