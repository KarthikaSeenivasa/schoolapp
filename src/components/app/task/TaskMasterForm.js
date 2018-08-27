import React from 'react';
import { Input, Button, Form, Select } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

class TaskMasterForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //TODO: Add Handling
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 10, offset: 3 }
        }
        return (
            <Form onSubmit={this.handleSubmit} className="tsk-form">
                <div className="tsk-inputs">
                    <FormItem label="Task Name"
                        {...formLayout}
                    >
                        {getFieldDecorator('task', {
                            initialValue: 'task3',
                        })(
                            <Select size="default" name="task">
                                <Option value="task1">Task 1</Option>
                                <Option value="task2">Task 2</Option>
                                <Option value="task3" disabled>Task 3</Option>
                                <Option value="task4">Task 4</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="Sub Task Name"
                        {...formLayout}
                    >
                        {getFieldDecorator('subtask', {
                            initialValue: 'subtask3',
                        })(
                            <Select size="default" name="sub_task">
                                <Option value="subtask1">Sub Task 1</Option>
                                <Option value="subtask2">Sub Task 2</Option>
                                <Option value="subtask3" disabled> Sub Task 3</Option>
                                <Option value="subtask4">Sub Task 4</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="Status"
                        {...formLayout}
                    >
                        {getFieldDecorator('status', {
                            initialValue: 'done',
                        })(
                            <Select size="default" name="task">
                                <Option value="pending">Pending</Option>
                                <Option value="done">Done</Option>
                            </Select>
                        )}
                    </FormItem>
                </div>
                <div className="btns">
                    <FormItem>
                        <Button type="primary" htmlType="submit" size="large" className="sbmt">Submit</Button>
                    </FormItem>
                    <FormItem>
                        <Button htmlType="submit" size="large" className="sbmt">Cancel</Button>
                    </FormItem>
                </div>
            </Form>
        );
    }
}

export default TaskMasterForm;