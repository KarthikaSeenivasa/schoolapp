import React from 'react';
import { Layout, Button, Form, Table } from 'antd';
import './style.scss';
import { timeEntryEmployeeColumns } from '../columns';

const { Header, Content } = Layout;

const dataSource = []

for (var i = 0; i < 100; i++) {
    dataSource.push(
        {
            key: i,
            employee_number:i,
            employee_name: "Name",
            last_time_entry:"12 - 12 - 2013",
            status:"Free"
        }
    );
}

const taskSource = [];
for (var i = 0; i < 100; i++) {
    taskSource.push({
        key: i,
        task: 'Some task',
        estimate: 'Some estimate',
        action: 'Some Action'
    })
}

class TimeEntry extends React.Component {

    render() {
        return (
            <Layout className="time-entry">
                <Header className="header">
                    <span>Time Entry</span>
                    <div className="button-container">
                        <Button className="buttons">Add Entry</Button>
                        <Button className="buttons">Edit Entry</Button>
                        <Button className="buttons">Delete Entry</Button>
                    </div>
                </Header>
                <Content className="content">
                    <div className="emptab-container">
                        <Table columns={timeEntryEmployeeColumns} dataSource = {dataSource} scroll={{ y: 200 }} size="small" pagination={false}/>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default TimeEntry;