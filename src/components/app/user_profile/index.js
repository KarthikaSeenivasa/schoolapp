import React from 'react';
import { connect } from 'react-redux';
import { Layout, Spin } from 'antd';

import './style.scss';

const { Header, Content } = Layout;

class UserProfile extends React.Component {

    render() {
        let { userLoading, id, username, name, email, userRoles } = this.props.user;
        return (
            <Layout className="proj" >
                <Header className="head">
                    <span>User Profile</span>
                </Header>
                <Content className="con">
                    <Spin spinning={userLoading}>
                        <div className="pro-con">
                            <div className="usr-pro">
                                <span className="lbl">User ID</span>
                                <span className="val">{id}</span>
                            </div>
                            <div className="usr-pro">
                                <span className="lbl">User Name</span>
                                <span className="val">{username}</span>
                            </div>
                            <div className="usr-pro">
                                <span className="lbl">Name</span>
                                <span className="val">{name}</span>
                            </div>
                            <div className="usr-pro">
                                <span className="lbl">Email</span>
                                <span className="val">{email}</span>
                            </div>
                            <div className="usr-pro">
                                <span className="lbl">Roles</span>
                                <span className="val">{userRoles.toString()}</span>
                            </div>
                        </div>
                    </Spin>
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UserProfile);