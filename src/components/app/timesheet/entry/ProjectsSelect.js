import React from 'react';
import { Form, Select, Spin } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

const ProjectsSelect = (props) => {

    const { getFieldDecorator, loading, projects, initialProjectId, formLayout, onChange } = props;
    let options = [], initialValue = null;

    if (projects.length > 0) {
        options = projects.map((project) => {
            return (
                <Option value={project.id} key={project.id} search={project.esskayJN}>
                    <span style={{ textTransform: 'capitalize' }}>{project.esskayJN + '(' + project.name + ')'}</span>
                </Option>)
        });

        initialValue = initialProjectId ? initialProjectId : projects[0].id;
    }
    return (
        <FormItem label="Project Name" {...formLayout}>
            {getFieldDecorator('projectId', {
                initialValue: initialValue,
            })(
                <Select size="default"
                    name="projectId"
                    notFoundContent={loading ?
                        <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                        :
                        "Not found"}
                    onChange={onChange}
                    showSearch
                    filterOption
                    optionFilterProp="search"
                >
                    {options}
                </Select>
            )}
        </FormItem>
    )
}

export default ProjectsSelect;