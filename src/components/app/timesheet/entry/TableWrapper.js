
import React from 'react';
import TableHeader from './TableHeader';
import { Table, Divider } from 'antd';

class TableWrapper extends React.Component {

    renderActions = (text, record) => {
        if (record.approval === "APPROVED") {
            return (
                <span>---</span>
            )
        }

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

    renderTitle = (currentPageData) => {
        let numberOfHours = 0;
        for (let row of this.props.dataSource) {
            numberOfHours += row.hours;
        }
        return (
            <TableHeader onDatePickerChange={(date) => {
                this.props.handleDateFilterChange(date);
            }}
                numberOfHours={numberOfHours}
            />
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
                title: 'Trade & Activity',
                dataIndex: 'taskMaster.taskName',
                width: 150
            },
            {
                title: 'Number of Hours',
                dataIndex: 'hours',
                width: 150
            },
            {
                title: 'Approver',
                dataIndex: 'headEmployee.user.name',
                width: 150
            },
            {
                title: "Approval Status",
                dataIndex: "approval",
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
                pagination={{
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    onChange: this.onPageChange,
                    total: this.props.numberOfRows
                }}
                title={this.renderTitle}
                size="small"
                scroll={{ y: 300 }}
                rowKey="id" />
        )
    }

}

export default TableWrapper;