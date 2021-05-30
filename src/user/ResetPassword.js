import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import UserSelect from '../components/app/timesheet/approval/UserSelect';
import './style.scss';

import { Form, Input, Button, Icon } from 'antd';

import { handleResetPassword } from '../actions/UserActions';

const FormItem = Form.Item;

class ResetPassword extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        const AntWrappedLoginForm = Form.create()(ResetPasswordForm);

        return (
            <div className="login-container">
                <h1 className="page-title">Reset Password</h1>
                <div className="login-content">
                    <AntWrappedLoginForm {...this.props} dispatch={this.props.dispatch} />
                </div>
            </div>
        );
    }
}

class ResetPasswordForm extends React.Component {
    constructor(props){
        super(props);
    }

    state = {
        userId: "",
        newPassword: "System@123"
    }

    handleUserFilterChange = (user) => {
        this.setState({
            userId: user
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //let { newPassword } = { ...values };
                this.props.dispatch(handleResetPassword(this.state.userId, this.state.newPassword));

                this.props.form.resetFields();
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userId', {
                        rules: [{ required: true, message: 'Please select user' }],
                    })(
                        <UserSelect users={this.props.users}
                        loading={this.props.loading}
                        onChange={this.handleUserFilterChange}
                        fromComp='resetPassword'
                        />
                    )}
                </FormItem>

                <FormItem>
                    {(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="newPassword"
                            value={this.state.newPassword}
                            disabled= {true}
                            placeholder="System@123" />
                    )}
                </FormItem>
               
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Reset Password</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {   
    let users = [];
    if (state.user.roles.length > 0) {
        for (let role of state.user.roles) {
            users = users.concat(role.users);
        }
    }
    return {
        users: users
        ,loading: state.user.rolesLoading
    }
}

export default withRouter(connect(mapStateToProps)(ResetPassword));