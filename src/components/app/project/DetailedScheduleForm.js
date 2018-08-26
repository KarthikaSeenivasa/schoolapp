import React from 'react';
import { Input, Button, Form, Select } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Option } = Select;

class DetailedScheduleForm extends React.Component {
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
            <Form onSubmit={this.handleSubmit} className="hls-form">
                <div className="hls-inputs">
                    <div className="form-left">
                        <FormItem label="Task"
                            {...formLayout}
                        >
                            {getFieldDecorator('task', {
                                initialValue: 'task1',
                            })(
                                <Select size="default" name="task">
                                    <Option value="task1">Task 1</Option>
                                    <Option value="task2">Task 2</Option>
                                    <Option value="task3" disabled>Task 3</Option>
                                    <Option value="task4">Task 4</Option>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem label="Estimate"
                            {...formLayout}
                        >
                            {getFieldDecorator('estimate')(
                                <Input
                                    size="default"
                                    name="estimate"
                                    placeholder="Estimates" />
                            )}
                        </FormItem>
                    </div>
                    <div className="form-right">
                        <FormItem label="Description"
                            {...formLayout}
                        >
                            {getFieldDecorator('description')(
                                <TextArea
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                    name="description"
                                    placeholder="Description of the Task" />
                            )}
                        </FormItem>
                    </div>
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

export default DetailedScheduleForm;