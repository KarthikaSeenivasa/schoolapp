import React from 'react';
import { Layout, Button, Form } from 'antd';
import './style.scss';
import AntTable from '../../table/AntTable';

const { Header, Content } = Layout;

import { highLevelScheduleColumns } from '../columns';
import HighLevelScheduleForm from './HighLevelScheduleForm';

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

class HighLevelSchedule extends React.Component {

    render() {
        const AntWrappedForm = Form.create()(HighLevelScheduleForm);
        return (
            <Layout className="high-level-schedule">
                <Header className="header">
                    <span>Project High Level Schedule</span>
                    <div className="button-container">
                        <Button className="buttons">Add Project</Button>
                        <Button className="buttons">Edit Project</Button>
                        <Button className="buttons">Delete Project</Button>
                    </div>
                </Header>
                <Content className="content">
                    <div className="table-container">
                        <AntTable columns={highLevelScheduleColumns} dataSource={dataSource} titleKey="project_name" />
                    </div>
                    <div className="form-container">
                        <AntWrappedForm />
                    </div>
                </Content>
            </Layout>
        );
    }

}


export default HighLevelSchedule;