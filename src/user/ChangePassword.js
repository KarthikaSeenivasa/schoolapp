import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './style.scss';

import { Form, Input, Button, Icon } from 'antd';

import { handleChangePassword } from '../actions/UserActions';

const FormItem = Form.Item;

class ChangePassword extends React.Component {

    render() {
        const AntWrappedLoginForm = Form.create()(ChangePasswordForm);

        return (
            <div className="login-container">
                <h1 className="page-title">Change Password</h1>
                <div className="login-content">
                    <AntWrappedLoginForm dispatch={this.props.dispatch} />
                </div>
            </div>
        );
    }
}

class ChangePasswordForm extends React.Component {

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { oldPassword, newPassword } = { ...values };
                this.props.dispatch(handleChangePassword(oldPassword, newPassword));

                this.props.form.resetFields();
            }
        });
    }

    compareToFirstPassword = (rule, value, callback) => {
        if (value && value !== this.props.form.getFieldValue('newPassword')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('oldPassword', {
                        rules: [{ required: true, message: 'Please input your old password' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="oldPassword"
                            type="password"
                            placeholder="Old Password" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('newPassword', {
                        rules: [{ required: true, message: 'Please input your new password' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="newPassword"
                            type="password"
                            placeholder="New Password" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('confirmNewPassword', {
                        rules: [
                            { required: true, message: 'Please confirm your new password' },
                            { validator: this.compareToFirstPassword }
                        ],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="confirmNewPassword"
                            type="password"
                            placeholder="Confirm New Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Change Password</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(ChangePassword));