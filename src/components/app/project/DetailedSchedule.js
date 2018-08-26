import React from 'react';
import { Layout, Button, Form, Table } from 'antd';
import './style.scss';
import AntTable from '../../table/AntTable';
import { highLevelScheduleColumns, tasksColumns } from '../columns';

import DetailedScheduleForm from './DetailedScheduleForm';
const { Header, Content } = Layout;

const dataSource = []

for (var i = 0; i < 100; i++) {
    dataSource.push(
        {
            key: i,
            project_name: 'Project Name',
            description: 'Project Description goes here if there is any',
            start_date: "1-1-2014",
            end_date: "1-12-2014",
            progress: "30%"
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

class DetailedSchedule extends React.Component {
    render() {
        const AntWrappedForm = Form.create()(DetailedScheduleForm);
        return (
            <Layout className="detailed-schedule">
                <Header className="header">
                    <span>Project Detailed Schedule</span>
                    <div className="button-container">
                        <Button className="buttons">Add Task</Button>
                        <Button className="buttons">Edit Task</Button>
                        <Button className="buttons">Delete Task</Button>
                    </div>
                </Header>
                <Content className="content">
                    <div className="table-container">
                        <AntTable columns={highLevelScheduleColumns} dataSource={dataSource} titleKey="project_name" />
                    </div>
                    <div className="tasks-container">
                        <Table columns={tasksColumns} dataSource = {taskSource} scroll={{ y: 200 }} size="small" pagination={false}/>
                    </div>
                    <div className="form-container">
                        <AntWrappedForm />
                    </div>
                </Content>
            </Layout>
        );
    }
}

export default DetailedSchedule;