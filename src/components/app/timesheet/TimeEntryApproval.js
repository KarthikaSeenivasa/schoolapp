import React from 'react';
import { Layout, Button, Table, DatePicker, Select, Input } from 'antd';
import './style.scss';
import { timeEntryEmployeeColumns, timeEntryColumns } from '../columns';
import AntTable from '../../table/AntTable';
const { Header, Content } = Layout;
const { Option } = Select;
const dataSource = []

for (var i = 0; i < 100; i++) {
    dataSource.push(
        {
            key: i,
            employee_number: i,
            employee_name: "Name",
            last_time_entry: "12 - 12 - 2013",
            status: "Free"
        }
    );
}

const taskSource = [];
for (var i = 0; i < 10; i++) {
    taskSource.push({
        key: i,
        project_name: "Project S",
        task: 'Some task',
        sub_task: 'Some Sub task',
        number_of_hours: '6'
    })
}

class TimeEntryApproval extends React.Component {

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
                        <Table columns={timeEntryEmployeeColumns} dataSource={dataSource} scroll={{ y: 200 }} size="small" pagination={false} />
                    </div>
                    <div className="task-container">
                        <div className="inputs">
                            <div className="date-con">
                                <span className="date-label">Date: </span>
                                <DatePicker />
                            </div>
                            <div className="emp-con">
                                <span className="emp-label">Employee: </span>
                                <Select size="default" name="sub_task" defaultValue="subtask1">
                                    <Option value="subtask1">Sub Task 1</Option>
                                    <Option value="subtask2">Sub Task 2</Option>
                                    <Option value="subtask3" disabled> Sub Task 3</Option>
                                    <Option value="subtask4">Sub Task 4</Option>
                                </Select>
                            </div>
                        </div>
                        <div className="approval-container">
                            <AntTable columns={timeEntryColumns} dataSource={taskSource} noTitle />
                        </div>
                        <div className="remarks">
                            <Input size="large" name="remarks" placeholder="Remarks" addonBefore="Remarks: " />
                        </div>
                        <div className="btns">
                            <Button size="default" className="sbmt" style={{ marginRight: '10px' }}>Approve</Button>
                            <Button size="default" className="sbmt" style={{ marginRight: '10px' }}>Deny</Button>
                            <Button size="default" className="sbmt">Cancel</Button>
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default TimeEntryApproval;