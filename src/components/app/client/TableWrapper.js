
import React from 'react';
import { Table, Divider } from 'antd';

class TableWrapper extends React.Component {

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
        const columns = [
            {
                title: 'Client Name',
                dataIndex: 'name',
                width: 150
            },
            {
                title: 'Primary Email',
                dataIndex: 'primaryEmail',
                width: 150
            },
            {
                title: 'Secondary Email',
                dataIndex: 'secondaryEmail',
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

        return (
            <Table columns={columns}
                dataSource={this.props.dataSource}
                loading={this.props.loading}
                pagination={false}
                size="medium"
                rowKey="id" />
        )
    }

}

export default TableWrapper;