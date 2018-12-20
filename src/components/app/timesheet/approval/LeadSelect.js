import React from 'react';
import { Select, Spin } from 'antd';

const Option = Select.Option;

const LeadSelect = (props) => {
    const { loading, leads } = props;
    let options = [<Option value="all" key="all" search="All">All</Option>];
    if (leads.length > 0) {
        options = leads.map((lead) => {
            return (
                <Option value={lead.id} key={lead.id} search={lead.name}>
                    <span style={{ textTransform: 'capitalize' }}>{lead.name + '(' + lead.username + ')'}</span>
                </Option>)
        });
    } 

    return (
        <Select size="default"
            name="lead"
            mode="single"
            placeholder="Team leads"
            notFoundContent={loading ?
                <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                :
                'Not found'}
            filterOption={true}
            optionFilterProp="search"
            defaultValue="all"
            style={{minWidth: 150}}
            onChange={(leadId)=>{props.onChange(leadId)}}
        >
            {options}
        </Select>
    )
}

export default LeadSelect;