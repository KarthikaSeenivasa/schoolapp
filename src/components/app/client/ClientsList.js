
import React from 'react';
import { Table, Divider } from 'antd';

class ClientsList extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Client Name',
                dataIndex: 'name',
                width: 150
            },
            {
                title: 'Email',
                dataIndex: 'email',
                width: 150
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions,
                width: 150
            }
        ];
    }

    renderActions = (text, record) => {
        return (
            <span>
                <a onClick={() => {
                    this.props.handleEdit(text, record);
                }}>Edit</a>
                <Divider type="vertical" />
                <a onClick={() => {
                    this.props.handleDelete(text, record);
                }}>Delete</a>
            </span>)
    }

    render() {
        return (
            <Table columns={this.columns}
                dataSource={this.props.dataSource}
                loading={this.props.loading}
                pagination={false}
                size="medium"
                rowKey="id" />
        )
    }

}

export default ClientsList;