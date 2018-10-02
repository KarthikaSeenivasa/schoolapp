import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

class ClientDetails extends React.Component {

    componentDidMount() {
        if (this.props.formMode !== 1) {
            this.props.form.setFieldsValue(this.props.recordToEdit);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form className="cls-frm">
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Client\'s name cannot be empty' }],
                    })(
                        <Input
                            addonBefore="Name"
                            name="name"
                            placeholder="Name" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, type: "email", message: 'Client\'s primary email is invalid/empty' }],
                    })(
                        <Input
                            addonBefore="Email"
                            name="email"
                            placeholder="Email Address" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(ClientDetails);