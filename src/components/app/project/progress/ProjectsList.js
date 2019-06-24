
import React from 'react';
import { Table, Progress } from 'antd';
import ProjectsListHeader from './ProjectsListHeader';

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
            <div style={{ width: 150 }}>
                <Progress percent={record.progress} size="small" />
            </div>
        )
    }

    onPageChange = (page, pageSize) => {
        this.props.onPageChange(page, pageSize);
    }

    renderTitle = () => (
        <ProjectsListHeader onJobNumberSearch = {(jobNumber) => {
                                this.props.handleJobNumberSearch(jobNumber);
                            }}
        />
    );

    render() {
        const columns = [
            {
                title: 'Job Name',
                dataIndex: 'name',
                width: 200
            },
            {
                title: 'Esskay Job Number',
                dataIndex: 'esskayJN',
                width: 150
            },
            {
                title: 'Progress',
                dataIndex: 'progress',
                render: this.renderProgress,
                width: 150
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
                title = {this.renderTitle}
                onPageChange={this.onPageChange}
            />
        )
    }

}

export default ProjectsList;