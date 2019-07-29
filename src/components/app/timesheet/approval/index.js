import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import moment from 'moment';
import './style.scss';

import TimeEntryApprovalList from './TimeEntryApprovalList';
import TimeEntryApprovalDetails from './TimeEntryApprovalDetails';

import { getTimeEntryApprovals, updateTimeEntryApproval } from '../../../../actions/TimeEntryActions';
import { getAllRoles } from '../../../../actions/UserActions';

const { Header, Content } = Layout;

class TimeEntryApproval extends React.Component {

    constructor(props){
        super(props);
        this.showLead = props.userRoles.includes('ROLE_MANAGEMENT') ||
        props.userRoles.includes('ROLE_ADMIN') ||
        props.userRoles.includes('ROLE_COORDINATOR');
    }

    state = {
        showFormModal: false,
        recordToEdit: null,
        status: 'PENDING',
        date: [moment().startOf('day'), moment().startOf('day')],
        leadId: "all",
        userId: "all"
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
                let { declined } = { ...values };
                this.props.dispatch(updateTimeEntryApproval(this.state.recordToEdit.id, undefined, remarks, declined));
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
        this.props.dispatch(getTimeEntryApprovals(value, 1, 10, this.state.date, this.state.leadId, this.state.userId));
        this.setState({
            status: value
        });
    }

    handleDateFilterChange = (date) => {
        this.setState({
            date
        });
        this.props.dispatch(getTimeEntryApprovals(this.state.status, 1, 10, date, this.state.leadId, this.state.userId));
    }

    handleLeadFilterChange = (lead) => {
        this.setState({
            leadId: lead
        })
        this.props.dispatch(getTimeEntryApprovals(this.state.status, 1, 10, this.state.date, lead, this.state.userId));
    }

    handleUserFilterChange = (user) => {
        this.setState({
            userId: user
        });
        this.props.dispatch(getTimeEntryApprovals(this.state.status, 1, 10, this.state.date, this.state.leadId, user));
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
        this.props.dispatch(getTimeEntryApprovals(this.state.status, page, pageSize, this.state.date, this.state.leadId, this.state.userId));
    }

    componentWillMount() {
        this.props.dispatch(getAllRoles());
        this.props.dispatch(getTimeEntryApprovals("PENDING", 1, 10, [moment().startOf('day'), moment().startOf('day')], this.state.leadId, this.state.userId));
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
                            leads={this.props.leads}
                            leadsLoading={this.props.leadsLoading}
                            numberOfRows={this.props.numberOfRows}
                            handleLeadFilterChange={this.handleLeadFilterChange}
                            showLead={this.showLead}
                            users={this.props.users}
                            handleUserFilterChange={this.handleUserFilterChange}
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
    let leads = [];
    let users = [];
    if (state.user.roles.length > 0) {
        for (let role of state.user.roles) {
            users = users.concat(role.users);
            if (role.name === "ROLE_LEADER" || role.name === "ROLE_MANAGEMENT") {
                leads = leads.concat(role.users);
            }
        }
    }
    return {
        timeEntryApprovals: state.timeEntries.timeEntryApprovals,
        numberOfRows: state.timeEntries.numberOfRows,
        loading: state.timeEntries.approvalsLoading,
        leads: leads,
        leadsLoading: state.user.rolesLoading,
        userRoles: state.user.userRoles,
        users: users
    }
}
export default connect(mapStateToProps)(TimeEntryApproval);