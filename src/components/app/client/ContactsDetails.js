import React from 'react';
import { Form, Input, Modal } from 'antd';
import { validateNumberForForm } from '../../../utils/Util';

const FormItem = Form.Item;

class ContactDetails extends React.Component {

    componentDidMount() {
        if (this.props.formMode !== 1) {
            this.props.form.setFieldsValue(this.props.recordToEdit);
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Modal visible={this.props.visible}
                title={this.props.title}
                onCancel={this.props.handleCancel}
                onOk={this.props.handleOk}
                maskClosable={false}
                destroyOnClose
                centered
            >
                <Form className="cls-frm">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Contact\'s name cannot be empty' }],
                        })(
                            <Input
                                addonBefore="Name"
                                name="name"
                                placeholder="Name" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: 'Contact\'s phone cannot be empty' },
                                { validator: validateNumberForForm }
                            ],
                        })(
                            <Input
                                addonBefore="Phone"
                                name="phone"
                                placeholder="Phone Number" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('primaryEmail', {
                            rules: [
                                { required: true, message: 'Client\'s primary email is invalid/empty' },
                                { type: "email", message: "Contact\'s primary email is invalid" }
                            ],
                        })(
                            <Input
                                addonBefore="Primary Email"
                                name="primaryEmail"
                                placeholder="Primary Email Address" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('secondaryEmail', {
                            rules: [{ type: "email", message: "Contact\'s primary email is invalid" }],
                        })(
                            <Input
                                addonBefore="Secondary Email"
                                name="secondaryEmail"
                                placeholder="Secondary Email Address" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('designation')(
                            <Input
                                addonBefore="Designation"
                                name="designation"
                                placeholder="Designation" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(ContactDetails);