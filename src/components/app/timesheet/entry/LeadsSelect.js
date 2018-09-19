import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const LeadsSelect = (props) => {
    const { getFieldDecorator, loading, leads, formLayout, initialLeadId } = props;
    let initialValue = null, options = null;

    if (leads.length > 0) {
        options = leads.map((lead) => {
            return (
                <Option value={lead.user ? lead.user.id : lead.id}
                    key={lead.user ? lead.user.id : lead.id}
                    search={lead.user ? lead.user.name : lead.name}>
                    <span style={{ textTransform: 'capitalize' }}>{lead.user ? lead.user.name : lead.name}</span>
                </Option>)
        });

        initialValue = initialLeadId ? initialLeadId : leads[0].user ? leads[0].user.id : leads[0].id;
    }

    return (
        <FormItem label="Approver" {...formLayout}>
            {getFieldDecorator('headEmployeeId', {
                initialValue: initialValue
            })(
                <Select size="default"
                    name="headEmployeeId"
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        null}
                >
                    {options}
                </Select>
            )}
        </FormItem>)
}

export default LeadsSelect;