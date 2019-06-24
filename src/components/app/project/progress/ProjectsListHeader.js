import React from "react";
import { Select, Spin, Input } from 'antd';

const Option = Select.Option;
const Search = Input.Search;

export default class ProjectsListHeader extends React.Component {
  render() {
    console.log('inside jobnumber render');
    return (
      <div className="tab-hdr">
        <span>
            <JobNumberSearch 
            onSearch={this.props.onJobNumberSearch}
            />
        </span>
      </div>
    );
  }
}

const JobNumberSearch = (props) => {
    console.log('inside jobnumbersearch');
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