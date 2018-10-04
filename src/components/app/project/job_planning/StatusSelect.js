import React from 'react';
import { statusCodes } from '../../../../actions/ProjectActions';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const StatusSelect = (props) => {
    const { getFieldDecorator, initialProjectStatus, formLayout, disabled } = props;
    let options = statusCodes.map((status) => {
        return <Option value={status.value} key={status.value}>{status.name}</Option>
    });
    return (
        <FormItem label="Status" {...formLayout}>
            {getFieldDecorator('status', {
                initialValue: initialProjectStatus ? initialProjectStatus : statusCodes[0].value
            })(
                <Select size="default" name="status" disabled={disabled}>
                    {options}
                </Select>
            )}
        </FormItem>
    );
}

export default StatusSelect;