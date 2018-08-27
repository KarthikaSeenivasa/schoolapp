import React from 'react';
import { Layout, Button, Form } from 'antd';
import './style.scss';
import AntTable from '../../table/AntTable';

const { Header, Content } = Layout;

import { taskMasterColumns } from '../columns';
import TaskMasterForm from './TaskMasterForm';

const dataSource = [];

for (var i = 0; i < 100; i++) {
    dataSource.push(
        {
            key: i,
            task: 'Task Name',
            sub_task: 'Sub Task name',
            status: 'Pending'
        }
    );
}

class TaskMaster extends React.Component {

    render() {
        const AntWrappedForm = Form.create()(TaskMasterForm);
        return (
            <Layout className="task-master">
                <Header className="header">
                    <span>Task Master</span>
                    <div className="button-container">
                        <Button className="buttons">Add Task</Button>
                        <Button className="buttons">Edit Task</Button>
                        <Button className="buttons">Delete Task</Button>
                    </div>
                </Header>
                <Content className="content">
                    <div className="table-container">
                        <AntTable columns={taskMasterColumns} dataSource={dataSource} titleKey="task" />
                    </div>
                    <div className="form-container">
                        <AntWrappedForm />
                    </div>
                </Content>
            </Layout>
        );
    }

}


export default TaskMaster;