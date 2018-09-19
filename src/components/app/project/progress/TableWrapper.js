
import React from 'react';
import { Table, Progress } from 'antd';

class TableWrapper extends React.Component {

    renderActions = (text, record) => {
        return (
            <span>
                <a onClick={() => {
                    this.props.handleEdit(text, record);
                }}>Edit</a>
            </span>)
    }

    renderProgress = (text, record) => {
        return (
            <Progress percent={record.progress} />
        )
    }

    render() {
        const columns = [
            {
                title: 'Project Name',
                dataIndex: 'name',
                width: 200
            },
            {
                title: 'Budget',
                dataIndex: 'budget',
                width: 200
            },
            {
                title: 'Progress',
                dataIndex: 'progress',
                render: this.renderProgress,
                width: 200
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