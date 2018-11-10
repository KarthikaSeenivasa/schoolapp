import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import moment from 'moment';
import './style.scss';

import TimeEntryApprovalList from './TimeEntryApprovalList';
import TimeEntryApprovalDetails from './TimeEntryApprovalDetails';

import { getTimeEntryApprovals, updateTimeEntryApproval } from '../../../../actions/TimeEntryActions';

const { Header, Content } = Layout;

class TimeEntryApproval extends React.Component {

    state = {
        showFormModal: false,
        recordToEdit: null,
        status: 'PENDING',
        date: [moment().startOf('day'), moment().startOf('day')]
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
        this.props.dispatch(getTimeEntryApprovals(value, 1, 10, this.state.date));
        this.setState({
            status: value
        });
    }

    handleDateFilterChange = (date) => {
        this.setState({
            date
        });
        this.props.dispatch(getTimeEntryApprovals(this.state.status, 1, 10, date));
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
        this.props.dispatch(getTimeEntryApprovals(this.state.status, page, pageSize, this.state.date));
    }

    componentWillMount() {
        this.props.dispatch(getTimeEntryApprovals("PENDING", 1, 10, [moment().startOf('day'), moment().startOf('day')]));
    }

    render() {
        return (
            <Layout className="tim-etry" >
                <Header className="hdr">
                    <span>Time Sheet Approval</span>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <TimeEntryApprovalList handleDelete={this.handleDeleteAction}
                            handleEdit={this.handleEditAction}
                            handleStatusChange={this.handleStatusChange}
                            handleStatusFilterChange={this.handleStatusFilterChange}
                            handleDateFilterChange={this.handleDateFilterChange}
                            dataSource={this.props.timeEntryApprovals}
                            loading={this.props.loading}
                            onPageChange={this.onPageChange}
                            numberOfRows={this.props.numberOfRows}
                        />
                    </div>
                    <div className="frm-con">
                        {this.state.showFormModal &&
                            < TimeEntryApprovalDetails wrappedComponentRef={this.saveFormRef}
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