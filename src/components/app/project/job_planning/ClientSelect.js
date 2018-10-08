
import React from 'react';
import { Form, Select, Spin } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const ClientSelect = (props) => {

    const { getFieldDecorator, loading, clients, formLayout, initialValue, disabled } = props;
    let options = null;

    if (clients.length > 0) {
        options = clients.map((client) => {
            return (
                <Option value={client.id} key={client.id}>
                    <span style={{ textTransform: 'capitalize' }}>{client.name}</span>
                </Option>)
        });
    }

    return (
        <FormItem label="Client Name" {...formLayout} >
            {getFieldDecorator('clientId', {
                initialValue: initialValue
            })(
                <Select size="default"
                    name="clientId"
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        null}
                    onChange={props.onChange}
                    disabled={disabled}
                >
                    {options}
                </Select>
            )}
        </FormItem>
    );
}

export default ClientSelect;