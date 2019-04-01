import React from "react";
import { Select, Spin } from 'antd';

const Option = Select.Option;

export default class ProjectsListHeader extends React.Component {
  render() {
    return (
      <div className="tab-hdr">
        {this.props.showLead && (
          <span>
            <span style={{ marginRight: 10 }}>Team Leader:</span>
            <LeadSelect leads={this.props.leads}
                        loading={this.props.loading}
                        onChange={this.props.onLeadSelectChange}
            />
          </span>
        )}
      </div>
    );
  }
}
const LeadSelect = (props) => {
    const { loading, leads } = props;
    let options = [<Option value="all" key="all" search="all">All</Option>];
    if (leads.length > 0) {
        options = options.concat(leads.map((lead) => {
            return (
                <Option value={lead.id} key={lead.id} search={lead.name}>
                    <span style={{ textTransform: 'capitalize' }}>{lead.name + ' (' + lead.username + ')'}</span>
                </Option>)
        }));
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
            filterOption
            showSearch
            optionFilterProp="search"
            defaultValue="all"
            style={{minWidth: 150}}
            onChange={(leadId)=>{props.onChange(leadId)}}
        >
            {options}
        </Select>
    )
}