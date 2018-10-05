import React from 'react';
import { Form, Select, Spin } from 'antd';

const FormItem = Form.Item;

class ContactsSelect extends React.Component {

    componentWillReceiveProps(nextProps) {
        if(this.props.initialValue !== nextProps.initialValue) {
            nextProps.setFieldsValue({
                contacts: nextProps.initialValue
            })
        }
    }

    render() {
        const { getFieldDecorator, loading, formLayout, initialValue, disabled, contacts } = this.props;
        let options = [];
        if(contacts.length > 0){
            options = contacts.map((contact) => {
                return (
                    <Select.Option value={contact.id} key={contact.id} search={contact.name}>
                        <span style={{ textTransform: 'capitalize' }}>{contact.name}</span>
                    </Select.Option>)
            });
        }
        return (
            <FormItem label="Contacts" {...formLayout}>
                {getFieldDecorator('contactId', {
                    rules:[{required: true, message: "Atleast one contact must be selected"}],
                    initialValue: initialValue
                })(
                    <Select size="default"
                        name="contactId"
                        mode="multiple"
                        placeholder="Contacts of the Client"
                        notFoundContent={loading ?
                            <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                            :
                            'Not found'}
                        filterOption={true}
                        optionFilterProp="search"
                        disabled={disabled}
                    >
                        {options}
                    </Select>
                )}
            </FormItem>
        )
    }

}

export default ContactsSelect;