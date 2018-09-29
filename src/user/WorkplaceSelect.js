import React from 'react';
import { workplaceCodes } from '../actions/UserActions';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const WorkplaceSelect = (props) => {
    const { getFieldDecorator, formLayout } = props;
    let options = workplaceCodes.map((status) => {
        return <Option value={status.value} key={status.value}>{status.name}</Option>
    });
    return (
        <FormItem label="Workplace" {...formLayout}>
            {getFieldDecorator('workplace', {
                initialValue: workplaceCodes[0].value
            })(
                <Select size="default" name="workplace">
                    {options}
                </Select>
            )}
        </FormItem>
    );
}

export default WorkplaceSelect;