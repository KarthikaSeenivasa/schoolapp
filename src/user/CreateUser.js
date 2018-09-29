import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';

import { Form, Input, Button, Icon, Select, Spin, Checkbox } from 'antd';

import { createUser, checkUsernameAvailability, checkEmailAvailability, getAllRoles } from '../actions/UserActions';
import { validateNumberForForm } from '../utils/Util';
import WorkplaceSelect from './WorkplaceSelect';

const FormItem = Form.Item;
const { Option } = Select;

class CreateUser extends React.Component {

    componentWillMount() {
        this.props.dispatch(getAllRoles());
    }

    render() {
        const AntWrappedLoginForm = Form.create()(CreateUserForm);

        return (
            <div className="login-container">
                <h1 className="page-title">Create User</h1>
                <div className="login-content">
                    <AntWrappedLoginForm {...this.props} />
                </div>
            </div>
        );
    }
}

class CreateUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            isEmployee: false,
            reportingToValues: []
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { username, email, name, password, role, isEmployee, employeeNumber, reportingTo } = { ...values };
                this.props.dispatch(createUser(username, email, name, password, role, isEmployee, employeeNumber, reportingTo));
                this.props.form.resetFields();
            }
        });
    }

    onCheck = (e) => {
        this.setState({
            isEmployee: e.target.checked
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 17 },
        }
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [
                            { required: true, message: 'Please input the username' },
                            { validator: checkUsernameAvailability }
                        ],
                    })(
                        <Input
                            addonBefore="User Name"
                            prefix={<Icon type="user" />}
                            size="large"
                            name="username"
                            placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input the name' }],
                    })(
                        <Input
                            addonBefore="Name"
                            prefix={<Icon type="user" />}
                            size="large"
                            name="username"
                            placeholder="Name" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type: "email", message: 'Email should be valid' },
                        { validator: checkEmailAvailability }
                        ],
                    })(
                        <Input
                            addonBefore="Email"
                            prefix={<Icon type="mail" />}
                            size="large"
                            name="email"
                            type="email"
                            placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your password' },
                        { min: 6, max: 100, message: "Password should be of 6 to 100 characters" }
                        ],
                    })(
                        <Input
                            addonBefore="Password"
                            prefix={<Icon type="lock" />}
                            size="large"
                            name="password"
                            placeholder="Password" />
                    )}
                </FormItem>

                <RoleSelect getFieldDecorator={getFieldDecorator} formLayout={formLayout} loading={this.props.loading} roles={this.props.roles} />

                <span style={{ display: 'flex' }}>
                    <FormItem>
                        {getFieldDecorator('isEmployee')(
                            <Checkbox onChange={this.onCheck}>Is Employee</Checkbox>
                        )}
                    </FormItem>

                    {
                        this.state.isEmployee && (

                            <FormItem>
                                {getFieldDecorator('employeeNumber', {
                                    rules: [{ validator: validateNumberForForm }]
                                })(
                                    <Input
                                        addonBefore="Employee Number"
                                        size="small"
                                        name="employeeNumber"
                                        placeholder="Employee Number" />
                                )}
                            </FormItem>
                        )
                    }
                </span>
                {
                    this.state.isEmployee && (
                        <ReportingToSelect getFieldDecorator={getFieldDecorator} formLayout={formLayout} loading={this.props.loading} users={this.props.users} />
                    )
                }
                {
                    this.state.isEmployee && (
                        <WorkplaceSelect getFieldDecorator={getFieldDecorator}  formLayout={formLayout}/>
                    )
                }
                <FormItem>
                    <Button type="primary" htmlType="submit" size="large" className="login-form-button">Create User</Button>
                </FormItem>
            </Form>
        );
    }
}

const RoleSelect = (props) => {
    const { getFieldDecorator, loading, roles, formLayout } = props;
    let initialValue = null, options = null;

    if (roles.length > 0) {
        options = roles.map((role) => {
            return (
                <Option value={role.id} key={role.name}>
                    <span style={{ textTransform: 'capitalize' }}>{role.displayName}</span>
                </Option>)
        });

        initialValue = roles[0].id;
    }
    return (
        <FormItem label="Role:" {...formLayout}>
            {getFieldDecorator('role', {
                initialValue: initialValue
            })(
                <Select name="role"
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        null}
                >
                    {options}
                </Select>
            )
            }
        </FormItem >
    );
}

const ReportingToSelect = (props) => {
    const { getFieldDecorator, loading, users, formLayout } = props;
    let initialValue = null, options = [(<Option value={null} key="-1" search="---" >---</Option>)];
    if (users.length > 0) {
        options = options.concat(users.map((user) => {
            return (
                <Option value={user.id} key={user.id} search={user.name} >
                    <span style={{ textTransform: 'capitalize' }}>{user.name}</span>
                </Option>)
        }));

        initialValue = users[0].id;
    }
    return (
        <FormItem label="Reporting to" {...formLayout}>
            {getFieldDecorator('reportingTo', {
                initialValue: initialValue
            })(
                <Select name="reportingTo"
                    showSearch
                    optionFilterProp="search"
                    filterOption={true}
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        'Not Found'}>
                    {options}
                </Select>
            )
            }
        </FormItem >
    );
}

const mapStateToProps = (state) => {
    let users = [];
    if (state.user.roles.length > 0) {
        for (let role of state.user.roles) {
            users = users.concat(role.users);
        }

    }
    return {
        roles: state.user.roles,
        users: users,
        loading: state.user.rolesLoading
    }
}

export default withRouter(connect(mapStateToProps)(CreateUser));