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
        recordToEdit: null
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
    }


    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    handleCancel = () => {
        this.setState({
            showFormModal: false
        });
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
                            loading={this.props.loading} />
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
        loading: state.timeEntries.approvalsLoading
    }
}
export default connect(mapStateToProps)(TimeEntryApproval);