import React from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import '../style.scss';

import ProjectsList from './ProjectsList';
import TaskList from './TaskList';

import { getProjects } from '../../../../actions/ProjectActions';

const { Header, Content } = Layout;

class ProjectProgress extends React.Component {

    state = {
        showModal: false,
        recordToEdit: null
    }

    handleEditAction = (id, record) => {
        this.setState({
            showModal: true,
            recordToEdit: record
        });
    }

    handleFormSubmit = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {

                form.resetFields();
                this.setState({
                    showModal: false
                });
            }
        });
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        });
    }

    componentWillMount() {
        this.props.dispatch(getProjects());
    }

    onPageChange = (page, pageSize) => {
        this.props.dispatch(getProjects(undefined, page, pageSize));
    }

    render() {
        return (
            <Layout className="proj" >
                <Header className="head">
                    <span>Progress Tracking</span>
                </Header>
                <Content className="con">
                    <div className="tab-con">
                        <ProjectsList handleEdit={this.handleEditAction}
                            dataSource={this.props.projects}
                            loading={this.props.loading}
                            onPageChange={this.onPageChange}
                            numberOfRows={this.props.numberOfRows}
                        />
                    </div>
                    {this.state.showModal &&
                        <div className="frm-con">
                            <TaskList visible={this.state.showModal}
                                onCancel={this.handleCancel}
                                recordToEdit={this.state.recordToEdit}
                            />
                        </div>
                    }
                </Content>
            </Layout>
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
        projects: state.projects.projects,
        numberOfRows: state.projects.numberOfRows,
        loading: state.projects.loading,
        clients: state.clients.clients,
        clientsLoading: state.clients.loading,
        leads: leads,
        leadsLoading: state.user.rolesLoading
    }
}
export default connect(mapStateToProps)(ProjectProgress);