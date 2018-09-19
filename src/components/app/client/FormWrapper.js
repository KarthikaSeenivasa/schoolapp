import React from 'react';
import { Form, Input, Modal } from 'antd';

const FormItem = Form.Item;

class FormWrapper extends React.Component {

    componentDidMount() {
        if (this.props.formMode !== 1) {
            this.props.form.setFieldsValue(this.props.recordToEdit);
        }
    }

    render() {
        const { visible, onCancel, onSubmit, form, formMode } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Modal visible={visible}
                title={formMode == 1 ? 'Add Client' : 'Edit Client'}
                okText={formMode == 1 ? 'Add' : 'Edit'}
                onCancel={onCancel}
                onOk={onSubmit}
            >
                <Form className="cls-frm">
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Client\'s name cannot be empty' }],
                        })(
                            <Input
                                addonBefore="Name"
                                size="small"
                                name="name"
                                placeholder="Name" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('primaryEmail', {
                            rules: [{ required: true, type: "email", message: 'Client\'s primary email is invalid/empty' }],
                        })(
                            <Input
                                addonBefore="Primary Email"
                                size="small"
                                name="primaryEmail"
                                placeholder="Primary Email Address" />
                        )}
                    </FormItem>

                    <FormItem>
                        {getFieldDecorator('secondaryEmail', {
                            rules: [{ type: "email", message: 'Client\'s secondary email is invalid' }],
                        })(
                            <Input
                                addonBefore="Secondary Email"
                                size="small"
                                name="secondaryEmail"
                                placeholder="Secondary Email Address" />
                        )}
                    </FormItem>
                </Form>
            </Modal>

        );
    }
}

export default Form.create()(FormWrapper);