import React from 'react';
import { Select, Spin } from 'antd';

const Option = Select.Option;

const UserSelect = (props) => {
    const { loading, users } = props;
    let options = [<Option value="all" key="all" search="All">All</Option>];
    if (users.length > 0) {
        options = options.concat(users.map((user) => {
            return (
                <Option value={user.id} key={user.id} search={user.name}>
                    <span style={{ textTransform: 'capitalize' }}>{user.name + '(' + user.username + ')'}</span>
                </Option>)
        }));
    } 

    return (
        <Select size="default"
            name="user"
            mode="single"
            placeholder="Requested By"
            notFoundContent={loading ?
                <div style={{ textAlign: 'center' }}><Spin size="small" /></div>
                :
                'Not found'}
            filterOption
            showSearch
            optionFilterProp="search"
            defaultValue="all"
            style={{minWidth: 150}}
            onChange={(userId)=>{props.onChange(userId)}}
        >
            {options}
        </Select>
    )
}

export default UserSelect;