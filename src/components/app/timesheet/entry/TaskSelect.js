import React from 'react';
import { Form, Cascader } from 'antd';

const FormItem = Form.Item;

const TaskSelect = (props) => {
    const { getFieldDecorator, formLayout, tasks, initialTaskIds } = props;

    return (
        <FormItem label="Task Name" {...formLayout}>
            {getFieldDecorator('taskMasterId', {
                initialValue: initialTaskIds,
            })(
                <Cascader name="taskMasterId"
                    allowClear={false}
                    options={tasks}
                />
            )}
        </FormItem>
    )
}

export default TaskSelect;