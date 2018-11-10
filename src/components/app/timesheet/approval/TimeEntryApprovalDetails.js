import React from 'react';
import { Input, Form, Modal } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class TimeEntryApprovalDetails extends React.Component {

    render() {
        const { visible, onCancel, onSubmit, form, recordToEdit } = this.props;
        const { getFieldDecorator } = form;

        const formLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 15 }
        }
        return (
            <Modal visible={visible}
                title='Add Remarks'
                okText='Submit'
                onCancel={onCancel}
                onOk={onSubmit}
            >

                <Form className="hls-form">

                    <FormItem label="Requested By" {...formLayout}>
                        {getFieldDecorator('requestedBy', {
                            initialValue: recordToEdit.employee.user.name,
                        })(
                            <Input
                                size="default"
                                name="requestedBy"
                                disabled
                            />
                        )}
                    </FormItem>

                    <FormItem label="Job/Task" {...formLayout}>
                        {getFieldDecorator('jobAndTask', {
                            initialValue: recordToEdit.project.name + "/" + recordToEdit.taskMaster.taskName,
                        })(
                            <Input
                                size="default"
                                name="jobAndTask"
                                disabled
                            />
                        )}
                    </FormItem>

                    <FormItem label="Numer of hours" {...formLayout}>
                        {getFieldDecorator('hours', {
                            initialValue: recordToEdit.hours,
                        })(
                            <Input
                                size="default"
                                name="hours"
                                disabled
                            />
                        )}
                    </FormItem>

                    <FormItem label="Description"{...formLayout}>
                        {getFieldDecorator('description', {
                            initialValue: recordToEdit.description,
                        })(
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 5 }}
                                name="description"
                                placeholder="Description"
                                disabled
                            />
                        )}
                    </FormItem>

                    <FormItem label="Remarks"{...formLayout}>
                        {getFieldDecorator('remarks', {
                            initialValue: recordToEdit.remarks
                        })(
                            <TextArea
                                autosize={{ minRows: 3, maxRows: 5 }}
                                name="remarks"
                                placeholder="Remarks" />
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default Form.create()(TimeEntryApprovalDetails);