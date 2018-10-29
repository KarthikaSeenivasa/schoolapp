
import React from 'react';
import { Table, Progress } from 'antd';

class ProjectsList extends React.Component {

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

    onPageChange = (page, pageSize) => {
        this.props.onPageChange(page, pageSize);
    }

    render() {
        const columns = [
            {
                title: 'Job Name',
                dataIndex: 'name',
                width: 100
            },
            {
                title: 'Esskay Job Number',
                dataIndex: 'esskayJN',
                width: 100
            },
            {
                title: 'Progress',
                dataIndex: 'progress',
                render: this.renderProgress,
                width: 100
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions,
                width: 100
            }
        ];

        return (
            <Table columns={columns}
                dataSource={this.props.dataSource}
                pagination={{
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    onChange: this.onPageChange,
                    total: this.props.numberOfRows
                }}
                loading={this.props.loading}
                size="small"
                rowKey="id"
                onPageChange={this.onPageChange}
            />
        )
    }

}

export default ProjectsList;