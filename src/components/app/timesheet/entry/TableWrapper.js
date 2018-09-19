
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
        for (let row of currentPageData) {
            numberOfHours += row.hours;
        }
        return (
            <TableHeader onDatePickerChange={(date) => {
                this.props.handleDateFilterChange(date);
            }}
            numberOfHours = {numberOfHours}
            />
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
                title: 'Approver',
                dataIndex: 'headEmployee.user.name'
            },
            {
                title: "Approval Status",
                dataIndex: "approval"
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
                title={this.renderTitle}
                size="medium"
                rowKey="id" />
        )
    }

}

export default TableWrapper;