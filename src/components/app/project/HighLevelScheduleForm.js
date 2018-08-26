import React from 'react';
import { Input, Button, Form, DatePicker } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class HighLevelScheduleForm extends React.Component {
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
            wrapperCol: { span: 10, offset: 5 }
        }
        return (
            <Form onSubmit={this.handleSubmit} className="hls-form">
                <div className="hls-inputs">

                    <div className="form-left">
                        <FormItem label="Project Title"
                            {...formLayout}
                        >
                            {getFieldDecorator('project_title')(
                                <Input
                                    size="default"
                                    name="project_title"
                                    placeholder="Title of the Project" />
                            )}
                        </FormItem>
                        <FormItem label="Description"
                            {...formLayout}
                        >
                            {getFieldDecorator('description')(
                                <TextArea
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                    name="description"
                                    placeholder="Description of the Project" />
                            )}
                        </FormItem>
                    </div>
                    <div className="form-right">
                        <FormItem
                            {...formLayout}
                            label="Start Date"
                            name="start_date"
                        >
                            {getFieldDecorator('start_date')(
                                <DatePicker />
                            )}
                        </FormItem>
                        <FormItem
                            {...formLayout}
                            label="End Date"
                            name="end_date"
                        >
                            {getFieldDecorator('end_date')(
                                <DatePicker />
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

export default HighLevelScheduleForm;