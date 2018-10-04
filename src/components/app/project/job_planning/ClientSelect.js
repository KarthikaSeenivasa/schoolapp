
import React from 'react';
import { Form, Select, Spin } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const ClientSelect = (props) => {

    const { getFieldDecorator, loading, clients, formLayout, initialClientId, disabled } = props;
    let initialValue = null, options = null;

    if (clients.length > 0) {
        options = clients.map((client) => {
            return (
                <Option value={client.id} key={client.id}>
                    <span style={{ textTransform: 'capitalize' }}>{client.name}</span>
                </Option>)
        });
        initialValue = initialClientId ? initialClientId : clients[0].id;
    }

    return (
        <FormItem label="Client Name" {...formLayout}>
            {getFieldDecorator('clientName', {
                initialValue: initialValue
            })(
                <Select size="default"
                    name="clientName"
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        null}
                    onChange={props.onChange}
                    disabled={disabled}
                    width={250}
                >
                    {options}
                </Select>
            )}
        </FormItem>
    );
}

export default ClientSelect;