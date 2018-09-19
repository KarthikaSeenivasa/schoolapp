import React from 'react';
import { Select } from 'antd';
import { statusCodes } from '../../../../actions/TimeEntryActions';

const { Option } = Select;

const StatusSelect = (props) => {
    const { defaultValue, onChange, disabled, addAllOption } = props;
    let options = statusCodes.map((status) => {
        return <Option value={status.value} key={status.value}>{status.name}</Option>
    });
    if(addAllOption) {
        options.push(<Option value="ALL" key="ALL">All</Option>);
    }
    return (
        <Select size="default"
            name="approval"
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            {options}
        </Select>
    )
}

export default StatusSelect;