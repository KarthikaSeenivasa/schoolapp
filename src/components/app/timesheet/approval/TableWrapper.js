
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

    onPageChange = (page, pageSize) => {
        this.props.onPageChange(page, pageSize);
    }

    render() {
        const columns = [
            {
                title: 'Project Name',
                dataIndex: 'project.name',
                width: 150
            },
            {
                title: 'Task',
                dataIndex: 'taskMaster.taskName',
                width: 150
            },
            {
                title: 'Number of Hours',
                dataIndex: 'hours',
                width: 150
            },
            {
                title: 'Requested By',
                dataIndex: 'employee.user.name',
                width: 150
            },
            {
                title: 'Approval Status',
                dataIndex: 'approval',
                render: this.renderApprovalStatusSelect,
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
                pagination={{
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    onChange: this.onPageChange,
                    total: this.props.numberOfRows
                }}
                size="small"
                title={this.renderTitle}
                loading={this.props.loading}
                rowKey="id"
                onPageChange={this.onPageChange}
                numberOfRows={this.props.numberOfRows}
            />
        )
    }
}

export default TableWrapper;