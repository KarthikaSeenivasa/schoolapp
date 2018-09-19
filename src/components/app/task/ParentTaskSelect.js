import React from 'react';
import { Form, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const ParentTaskSelect = (props) => {
    const { getFieldDecorator, tasks, initialValue } = props;
    const formLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 }
    }
    let options = [(<Option key={-1} value={null} search="---">---</Option>)];
    if (tasks) {
        options = options.concat(tasks.map((task) => {
            return (<Option key={task.id} value={task.id} search={task.taskName}>{task.taskName}</Option>)
        }));
    }

    return (
        <FormItem label="Parent Task" {...formLayout}>
            {getFieldDecorator('headId', {
                initialValue: initialValue,
            })(
                <Select size="default"
                    name="headId"
                    showSearch
                    optionFilterProp="search"
                    filterOption={true}
                    notFoundContent='Not Found'
                >
                    {options}
                </Select>
            )}
        </FormItem>
    )
}

export default ParentTaskSelect;