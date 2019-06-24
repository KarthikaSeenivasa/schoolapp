
import React from 'react';
import { Table, Divider } from 'antd';
import {  renderStatus } from '../../../../utils/Util';
import ProjectsListHeader from './ProjectsListHeader';

class ProjectsList extends React.Component {

    constructor(props) {
        super(props);

        if (props.allowDelete) {
            this.columns.push({
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions,
                width: 150
            });
        }
        else if (props.allowEdit) {
            this.columns.push({
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderEditOnly,
                width: 150
            });
        } 
        else {
            this.columns.push({
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderViewOnly,
                width: 150
            });
        }
    }

    renderEditOnly = (text, record) => {
        return (
            <span>
                <a onClick={() => {
                    this.props.handleEdit(text, record);
                }}>Edit</a>
            </span>
        );
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
            </span>
        );
    }

    renderViewOnly = (text, record) => {
        return (
            <span>
                <a onClick={() => {
                    this.props.handleView(text, record);
                }}>View</a>
            </span>
        );
    }

    renderTitle = () => (
        <ProjectsListHeader showLead={this.props.allowEdit}
                            leads={this.props.leads}
                            loading={this.props.leadsLoading}                            
                            onLeadSelectChange = {(lead)=>{
                                this.props.handleLeadFilterChange(lead);
                            }}
                            onJobNumberSearch = {(jobNumber) => {
                                this.props.handleJobNumberSearch(jobNumber);
                            }}
        />
    );

    columns = [
        {
            title: 'Job Name',
            dataIndex: 'name',
            width: 200
        },
        {
            title: 'Esskay Job Number',
            dataIndex: 'esskayJN',
            width: 200
        },
        {
            title: 'Team Leaders',
            dataIndex: 'headEmployee',
            render: (text, record)=>{
                let leads = [];
                for(var emp of record.headEmployee) {
                    leads.push(emp.user.name);
                }
                return leads.toString();
            },
            width: 200
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: renderStatus,
            width: 150
        }
    ];

    onPageChange = (page, pageSize) => {
        this.props.onPageChange(page, pageSize);
    }

    render() {

        return (
            <Table columns={this.columns}
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
                title={this.renderTitle}
                onPageChange={this.onPageChange}
            />
        )
    }

}

export default ProjectsList;