
import React from 'react';
import { Table, Divider } from 'antd';
import { renderDate } from '../../../../utils/Util';

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
                title: 'Project Name',
                dataIndex: 'name',
                width: 200
            },
            {
                title: 'Client',
                dataIndex: 'client.name',
                width: 200
            },
            {
                title: 'Start Date',
                dataIndex: 'startDate',
                render: renderDate
            },
            {
                title: 'Date of Completion',
                dataIndex: 'dateOfCompletion',
                render: renderDate
            },
            {
                title: 'Status',
                dataIndex: 'status'
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
                pagination={false}
                loading={this.props.loading}
                size="medium"
                rowKey="id" />
        )
    }

}

export default TableWrapper;