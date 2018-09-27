import React from 'react';
import { Input, Form, Modal } from 'antd';

import ProjectsSelect from './ProjectsSelect';
import TaskSelect from './TaskSelect';
import LeadsSelect from './LeadsSelect';

import { validateNumberForForm } from '../../../../utils/Util';

const FormItem = Form.Item;
const { TextArea } = Input;

class FormWrapper extends React.Component {

    state = {
        headEmployees: []
    }

    setHeadEmployees = (id) => {
        if (this.props.projects.length > 0) {
            for (let project of this.props.projects) {
                if (id === project.id) {
                    this.setState({ headEmployees: project.headEmployee });
                }
            }
        }
    }

    componentWillMount() {
        if (this.props.formMode === 1 && this.props.projects.length > 0) {
            this.setHeadEmployees(this.props.projects[0].id);
        } else if(this.props.formMode === 2 && this.props.recordToEdit.project) {
            this.setHeadEmployees(this.props.recordToEdit.project.id);
        } 
        
    }

    componentDidMount() {
        if (this.props.formMode !== 1) {
            this.props.form.setFieldsValue(this.props.recordToEdit);
        }
    }

    render() {
        const { visible, onCancel, onSubmit, form, formMode } = this.props;
        const { getFieldDecorator } = form;

        const formLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12, offset : 2 }
        }
        return (
            <Modal visible={visible}
                title={formMode == 1 ? 'Add Time Entry' : 'Edit Time Entry'}
                okText={formMode == 1 ? 'Add' : 'Edit'}
                onCancel={onCancel}
                onOk={onSubmit}
            >
                <Form className="hls-form">
                    <ProjectsSelect getFieldDecorator={getFieldDecorator}
                        loading={this.props.projectsLoading}
                        projects={this.props.projects}
                        formLayout={formLayout}
                        onChange={(value, option) => { this.setHeadEmployees(value) }}
                        initialProjectId={this.props.initialProjectId}
                    />

                    <TaskSelect getFieldDecorator={getFieldDecorator}
                        formLayout={formLayout}
                        tasks={this.props.tasks}
                        loading={this.props.tasksLoading}
                        initialTaskIds={this.props.initialTaskIds}
                    />

                    <FormItem {...formLayout}>
                        {getFieldDecorator('hours', {
                            rules: [{ validator: validateNumberForForm }],
                        })(
                            <Input
                                addonBefore="Number of Hours"
                                size="default"
                                name="hours"
                                placeholder="Number of Hours" />
                        )}
                    </FormItem>
                    <LeadsSelect getFieldDecorator={getFieldDecorator}
                        loading={this.props.projectsLoading}
                        leads={this.state.headEmployees}
                        formLayout={formLayout}
                        initialLeadId={this.props.initialLeadId}
                    />
                    <FormItem label="Description"{...formLayout}>
                        {getFieldDecorator('description')(
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 5 }}
                                name="description"
                                placeholder="Description" />
                        )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}

export default Form.create()(FormWrapper);