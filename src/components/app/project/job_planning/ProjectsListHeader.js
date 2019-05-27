import React from "react";
import { Select, Spin, Input } from 'antd';

const Option = Select.Option;
const Search = Input.Search;

export default class ProjectsListHeader extends React.Component {
  render() {
    return (
      <div className="tab-hdr">
        {
          this.props.showLead && (
          <span>
            <span style={{ marginRight: '10px' }}>Team Leader:</span>
            <LeadSelect leads={this.props.leads}
                        loading={this.props.loading}
                        onChange={this.props.onLeadSelectChange}
            />
          </span>
        )}
        <JobNumberSearch 
          onSearch={this.props.onJobNumberSearch}
        />
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

const JobNumberSearch = (props) => {
  return(
    <span>
      <span style={{ marginLeft: '100px', marginRight: '10px' }}>Job Number:</span>
        <Search
          placeholder="Search by Job number"
          onSearch={(jobNumber) => {props.onSearch(jobNumber)}}
          style={{ width: 200 }}
        />
    </span>
  )
}