import React from 'react';
import { Select, Spin } from 'antd';

const { Option } = Select;

const ProjectsSelect = (props) => {

    const { loading, projects, onChange } = props;
    let options = [], defaultValue = null;

    if (loading) {
        return (
            <div style={{ textAlign: 'center' }}>
                <Spin size="small" />
            </div>
        );
    }

    if (projects.length > 0) {
        options = projects.map((project) => {
            return (
                <Option value={project.id} key={project.id} search={project.esskayJN}>
                    <span style={{ textTransform: 'capitalize' }}>{project.esskayJN + '(' + project.name + ')'}</span>
                </Option>)
        });
        defaultValue = projects[0].id;
    }
    return (
        <Select size="default"
            name="projectId"
            notFoundContent={loading ?
                <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                :
                null}
            defaultValue={defaultValue}
            onChange={onChange}
            style={{ width: '300px' }}
            filterOption={true}
            optionFilterProp="search"
            showSearch
            notFoundContent='Not Found'
        >
            {options}
        </Select>
    )
}

export default ProjectsSelect;