
import React from 'react';
import { Table } from 'antd';

import TableHeader from './TableHeader';
import StatusSelect from './StatusSelect';

class TableWrapper extends React.Component {

    renderActions = (text, record) => {
        return (
            <span>
                <a onClick={() => {
                    this.props.handleEdit(text, record);
                }}>Add Remarks</a>
            </span>)
    }

    renderApprovalStatusSelect = (text, record) => {
        return (
            <StatusSelect defaultValue={record.approval}
                disabled={false}
                addAllOption={false}
                onChange={(value, option) => {
                    this.props.handleStatusChange(record, value);
                }} />
        );
    }

    renderTitle = (currentPageData) => {
        return (
            <TableHeader onStatusChange={(value, option) => {
                this.props.handleStatusFilterChange(value, option);
            }} />
        )
    }

    render() {
        const columns = [
            {
                title: 'Project Name',
                dataIndex: 'project.name'
            },
            {
                title: 'Task',
                dataIndex: 'taskMaster.taskName'
            },
            {
                title: 'Number of Hours',
                dataIndex: 'hours'
            },
            {
                title: 'Requested By',
                dataIndex: 'employee.user.name'
            },
            {
                title: 'Approval Status',
                dataIndex: 'approval',
                render: this.renderApprovalStatusSelect
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
                size="medium"
                title={this.renderTitle}
                loading={this.props.loading}
                rowKey="id" />
        )
    }
}

export default TableWrapper;