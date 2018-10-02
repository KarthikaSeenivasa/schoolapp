
import React from 'react';
import { Table, Divider, Button } from 'antd';

const dataSource = [];

for (var i = 0; i < 5; i++) {
    dataSource.push({
        name: 'Name',
        designation: 'Vetti',
        phone: '12345',
        primaryEmail: '123@132.com'
    })
}

class ClientsContactsList extends React.Component {

    constructor(props) {
        super(props);

        this.columns = [
            {
                title: 'Contact Name',
                dataIndex: 'name'
            },
            {
                title: 'Designation',
                dataIndex: 'designation'
            },
            {
                title: 'Primary Email',
                dataIndex: 'primaryEmail'
            },
            {
                title: 'Actions',
                dataIndex: 'id',
                key: 'id',
                render: this.renderActions
            }
        ];
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
            </span>)
    }


    renderTitle = (currentTableData) => {
        let self = this;
        return (
            <div className="title">
                <Button type="primary" size="small" onClick={self.handleAddAction}>Add Contact</Button>
            </div>
        )
    }

    render() {
        return (
            <div className="cls-frm">
                <Table columns={this.columns}
                    dataSource={dataSource}
                    loading={this.props.loading}
                    pagination={false}
                    title={this.renderTitle}
                    size="small"
                    rowKey="id" />
            </div>
        )
    }

}

export default ClientsContactsList;