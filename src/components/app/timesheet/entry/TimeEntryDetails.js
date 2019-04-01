import React from 'react';
import moment from 'moment';
import { Input, Form, Modal, DatePicker } from 'antd';

import ProjectsSelect from './ProjectsSelect';
import TaskSelect from './TaskSelect';
import LeadsSelect from './LeadsSelect';

import { validateNumberForForm, DATE_FORMAT } from '../../../../utils/Util';

const FormItem = Form.Item;
const { TextArea } = Input;

class TimeEntryDetails extends React.Component {

    state = {
        headEmployees: []
    }

    setHeadEmployees = (id) => {
        if (this.props.projects.length > 0) {
            for (let project of this.props.projects) {
                if (id === project.id) {
                    this.setState({ headEmployees: project.headEmployee });
                    this.props.form.setFieldsValue({
                        headEmployeeId: project.headEmployee[0].user.id
                    });
                }
            }
        }
    }

    componentWillMount() {
        if (this.props.formMode === 1 && this.props.projects.length > 0) {
            this.setHeadEmployees(this.props.projects[0].id);
        } else if (this.props.formMode === 2 && this.props.recordToEdit.project) {
            this.setHeadEmployees(this.props.recordToEdit.project.id);
        }

    }

    componentDidMount() {
        if (this.props.formMode !== 1) {
            let newRecord = { ...this.props.recordToEdit };
            newRecord.date = moment(this.props.recordToEdit.date);
            this.props.form.setFieldsValue(newRecord);
        } else {
            this.props.form.setFieldsValue({
                date: moment().startOf('day')
            })
        }
    }

    render() {
        const { visible, onCancel, onSubmit, form, formMode } = this.props;
        const { getFieldDecorator } = form;

        const formLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 12, offset: 2 }
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
                    <FormItem label="Date" {...formLayout}>
                        {getFieldDecorator('date', {
                            rules: [{ required: true, message: "Date is required" }],
                        })(
                            <DatePicker
                                format={DATE_FORMAT}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Numer of hours" {...formLayout}>
                        {getFieldDecorator('hours', {
                            rules: [{ validator: validateNumberForForm }],
                        })(
                            <Input
                                size="default"
                                name="hours"
                                placeholder="Hours" />
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
                    <FormItem label="Remarks"{...formLayout}>
                        {getFieldDecorator('remarks')(
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 5 }}
                                name="remarks"
                                placeholder="Remarks"
                                disabled
                                />
                        )}
                    </FormItem>
                </Form>
            </Modal >
        );
    }
}

export default Form.create()(TimeEntryDetails);