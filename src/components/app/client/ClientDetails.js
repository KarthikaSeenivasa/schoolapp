import React from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

class ClientDetails extends React.Component {

    componentDidMount() {
        if (this.props.formMode !== 1) {
            this.props.form.setFieldsValue(this.props.recordToEdit);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 }
        }
        return (
            <Form className="cls-frm">
                <FormItem label="Client Name" {...formLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Client\'s name cannot be empty' }],
                    })(
                        <Input
                            name="name"
                            placeholder="Name" />
                    )}
                </FormItem>

                <FormItem label="Client Email Address" {...formLayout}>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type: "email", message: 'Client\'s email is invalid' }],
                    })(
                        <Input
                            name="email"
                            placeholder="Email Address" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ClientDetails);