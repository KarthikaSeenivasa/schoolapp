import React from 'react';
import { Input, Form, Modal } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class FormWrapper extends React.Component {

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
                    <FormItem label="Remarks"{...formLayout}>
                        {getFieldDecorator('remarks',{
                            initialValue : recordToEdit.remarks
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

export default Form.create()(FormWrapper);