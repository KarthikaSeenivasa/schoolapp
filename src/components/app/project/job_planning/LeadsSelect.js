import React from 'react';
import { Form, Select, Spin } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const LeadsSelect = (props) => {
    const { getFieldDecorator, loading, leads, formLayout, initialLeadIds, disabled } = props;
    let initialValue = null, options = null;

    if (leads.length > 0) {
        options = leads.map((lead) => {
            return (
                <Option value={lead.id} key={lead.id} search={lead.name}>
                    <span style={{ textTransform: 'capitalize' }}>{lead.name + ' (' + lead.username + ')' }</span>
                </Option>)
        });

        initialValue = initialLeadIds ? initialLeadIds : [leads[0].id];
    }

    return (
        <FormItem label="Team Leads" {...formLayout}>
            {getFieldDecorator('headEmployeeIds', {
                rules: [{required: true, message: 'Atleast one lead must be selected'}],
                initialValue: initialValue
            })(
                <Select size="default"
                    name="headEmployeeIds"
                    mode="multiple"
                    placeholder="Team leads of the job"
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
        </FormItem>)
}

export default LeadsSelect;