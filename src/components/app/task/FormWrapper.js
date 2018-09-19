import React from 'react';
import { Input, Form, Modal } from 'antd';

import ParentTaskSelect from './ParentTaskSelect';

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
        const initialValue = (!this.props.recordToEdit) ? null : this.props.recordToEdit.headId;
        return (
            <Modal visible={visible}
                title={formMode == 1 ? 'Add Task' : 'Edit Task'}
                okText={formMode == 1 ? 'Add' : 'Edit'}
                onCancel={onCancel}
                onOk={onSubmit}
            >
                <Form onSubmit={this.handleSubmit} className="tsk-form">
                    <FormItem>
                        {getFieldDecorator('taskName', {
                            rules: [{ required: true, message: 'Task\'s name cannot be empty' }],
                        })(
                            <Input
                                addonBefore="Task Name"
                                name="taskName"
                                placeholder="Name of the task" />
                        )}
                    </FormItem>

                    <ParentTaskSelect getFieldDecorator={getFieldDecorator} tasks={this.props.tasks} initialValue={initialValue} />

                </Form>
            </Modal>
        );
    }
}

export default Form.create()(FormWrapper);