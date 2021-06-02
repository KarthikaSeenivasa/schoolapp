import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import UserSelect from '../components/app/timesheet/approval/UserSelect';
import './style.scss';
import axios from "axios";

import { Form, Input, Button, Icon, Select, Spin, Checkbox } from 'antd';

import { editUser, deleteUser, getUserById, checkUsernameAvailabilityUpdate, checkEmailAvailabilityUpdate, getAllRoles } from '../actions/UserActions';
import { validateNumberForForm } from '../utils/Util';
import WorkplaceSelect from './WorkplaceSelect';
const inputRef = React.createRef(null);
const FormItem = Form.Item;
const { Option } = Select;

class EditUser extends React.Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.props.dispatch(getAllRoles());
    }

    render() {
        const AntWrappedLoginForm = Form.create()(EditUserForm);

        return (
            <div className="login-container">
                <h1 className="page-title">Edit User</h1>
                <div className="login-content">
                    <AntWrappedLoginForm {...this.props} />
                </div>
            </div>
        );
    }
}

class EditUserForm extends React.Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            userId: "",
            isEmployeeUser: true,
            reportingToValues: [],
            editUserRecord: null,
            firsttime:true
        }
    }
    componentDidUpdate(){           
       if(this.state.userId && this.state.firsttime){
        this.state.firsttime= false;
        const params = {
            id: this.state.userId
        };
        const PROD_SERVER = "";
        const DEV_SERVER = process.env.NODE_ENV == "production" ? PROD_SERVER : "http://localhost"
        const GET_USER_API = DEV_SERVER + "/api/user/getUser";
        axios.get(GET_USER_API,{ params })
        .then((response) => {
            let { id, username, email, name } = response.data;
            let userRoles = response.data.roles;
            let isLead = false;
            if (userRoles.includes('ROLE_LEADER') || userRoles.includes('ROLE_MANAGEMENT')) {
                isLead = true;
            }
            let formvalues={
                userId:id,
                editusername:username,
                editemail:email,
                editname:name,
                isEmployeeUser:true,
                userRoles:userRoles
            }
            this.state.editUserRecord=formvalues;
            this.props.form.setFieldsValue(formvalues);
        }).catch((err) => {
            if(err.response.status === 401) {
               // dispatch(handleLogout());
                return;
            }
        });
    }
    }

    handleUserFilterChange = (user) => {
        this.setState({
            userId: user,
            firsttime:true
        });     
        localStorage.setItem('edituserId',user);   
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let { editusername, editemail, editname, role, isEmployeeUser, editemployeeNumber, reportingTo, workplace } = { ...values };
                this.props.dispatch(editUser(this.state.userId,editusername, editemail, editname, role, isEmployeeUser, editemployeeNumber, reportingTo, workplace
                    //, ()=>this.props.dispatch(getAllRoles(true))
                    ));
               location.reload();
            }
        });
    }
    deleteuser=()=>{
        this.props.dispatch(deleteUser(this.state.userId));
       // this.props.form.resetFields();
       location.reload();
    }
    onCheck = (e) => {
        this.setState({
            isEmployeeUser: e.target.checked
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
                    {getFieldDecorator('editusername', {
                        rules: [
                            { required: true, message: 'Please input the username' },
                            { validator: checkUsernameAvailabilityUpdate }
                        ],
                    })(
                        <Input
                            addonBefore="User Name"
                            prefix={<Icon type="user" />}
                            size="large"
                            name="editusername"
                            ref={inputRef}
                            placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('editemail', {
                        rules: [{ required: true, message: 'Email should not be empty' },
                        { type: "email", message: "Please enter a valid email" },
                        { validator: checkEmailAvailabilityUpdate }
                        ],
                    })(
                        <Input
                            addonBefore="Email"
                            prefix={<Icon type="mail" />}
                            size="large"
                            name="editemail"
                            type="email"
                            ref={inputRef}
                            placeholder="Email" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('editname', {
                        rules: [{ required: true, message: 'Please input the name' }],
                    })(
                        <Input
                            addonBefore="Name"
                            prefix={<Icon type="user" />}
                            size="large"
                            name="editname"
                            ref={inputRef}
                            placeholder="Name" />
                    )}
                </FormItem>

                <RoleSelect ref={inputRef} userRole={this.state.editUserRecord?.userRoles} getFieldDecorator={getFieldDecorator} formLayout={formLayout} loading={this.props.loading} roles={this.props.roles} />
               
                <FormItem>
                    <Button disabled= {!this.state.userId} type="primary" htmlType="submit" size="large" ref={inputRef} className="login-form-button">Save User Details</Button>
                </FormItem>
                <FormItem>
                    <Button disabled= {!this.state.userId} type="secondary" size="large" onClick={this.deleteuser} ref={inputRef} className="login-form-button">Delete User</Button>
                </FormItem>
            </Form>
        );
    }
}

const RoleSelect = (props) => {
    const { getFieldDecorator, loading, roles, formLayout, userRole } = props;
    let initialValue = null, options = null;

    if (roles.length > 0) {
        options = roles.map((role) => {
            return (
                <Option value={role.id} key={role.name}>
                    <span style={{ textTransform: 'capitalize' }}>{role.displayName}</span>
                </Option>)
        });
        let role = userRole ? roles.find(r=>r.name==userRole[0]) : roles[0];
        initialValue = role.id    //roles[0].id;
    }
    return (
        <FormItem label="Role:" {...formLayout}>
            {getFieldDecorator('role', {
                initialValue: initialValue
            })(
                <Select name="role"
                ref={inputRef}
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

export default withRouter(connect(mapStateToProps)(EditUser));