import React from 'react';
import { withRouter, Redirect } from 'react-router-dom'; 
import {connect} from 'react-redux';

import './style.scss';

import { Form, Input, Button, Icon, notification } from 'antd';

import { handleLogin } from '../actions/UserActions';

const FormItem = Form.Item;

class Login extends React.Component {

    render() {
        if(this.props.user.isAuthenticated){
            return (
                <Redirect to={{
                    pathname: '/app',
                    state: { from: this.props.location }
                  }} />
            );
        }
        const AntWrappedLoginForm = Form.create()(LoginForm);

        return (
            <div className="login-container">
                <h1 className="page-title">Login</h1>
                <div className="login-content">
                    <AntWrappedLoginForm dispatch={this.props.dispatch} />
                </div>
            </div>
        );
    }
}

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let requestParams = {...values};
                debugger;
                this.props.dispatch(handleLogin(requestParams.usernameOrEmail, requestParams.password));
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('usernameOrEmail', {
                        rules: [{ required: true, message: 'Please input your username or email' }],
                    })(
                        <Input
                            prefix={<Icon type="user" />}
                            size="large"
                            name="usernameOrEmail"
                            placeholder="Username or Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password' }],
                    })(
                        <Input
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            type="password"
                            placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Login</Button>
                </FormItem>
            </Form>
        );
    }
}

const mapStateToProps = (state) =>{
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Login));