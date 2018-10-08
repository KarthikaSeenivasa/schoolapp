
import React from 'react';
import { Table, Divider } from 'antd';
import { renderDate, renderStatus } from '../../../../utils/Util';

class ProjectsList extends React.Component {

    constructor(props) {
        super(props);

        if (props.allowEdit) {
            this.columns.push({
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions,
                width: 150
            });
        } else {
            this.columns.push({
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderViewOnly,
                width: 150
            });
        }
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

    columns = [
        {
            title: 'Project Name',
            dataIndex: 'name',
            width: 200
        },
        {
            title: 'Esskay Job Number',
            dataIndex: 'esskayJN',
            width: 200
        },
        {
            title: 'Order Receiving Date',
            dataIndex: 'receivingDate',
            render: renderDate
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: renderStatus
        }
    ];

    render() {

        return (
            <Table columns={this.columns}
                dataSource={this.props.dataSource}
                pagination={false}
                loading={this.props.loading}
                size="medium"
                rowKey="id" />
        )
    }

}

export default ProjectsList;