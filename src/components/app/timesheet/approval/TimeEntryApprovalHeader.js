import React from 'react';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';

import StatusSelect from './StatusSelect';
import { DATE_FORMAT } from '../../../../utils/Util';

const { RangePicker } = DatePicker;

class TimeEntryApprovalHeader extends React.Component {

    state = {
        filterValue: 'PENDING',
        showDateFilter: true,
        date: [moment().startOf('day'), moment().startOf('day')]
    }

    onCheckboxChange = (event) => {
        this.props.onDatePickerChange(event.target.checked ? this.state.date : undefined);

        this.setState({
            showDateFilter: event.target.checked
        });
    }

    onDatePickerChange = (date, dateString) => {
        this.setState({
            date
        });

        this.props.onDatePickerChange(date);
    }

    onStatusSelectChange = (value, option) => {
        this.setState({
            filterValue: value
        });

        this.props.onStatusChange(value, option);
    }

    getHeaderText = () => {
        switch (this.state.filterValue) {
            case 'ALL':
                return 'All Entries';
            case 'APPROVED':
                return 'Approved Entries';
            case 'PENDING':
                return 'Pending for approval';
            case 'DECLINED':
                return 'Declined Entries'
            default:
                return '';
        }
    }

    render() {
        let headerText = this.getHeaderText();
        return (
            <div className="tab-hdr">
                <span className="hdr-txt" style={{ fontStyle: 'italic', marginLeft: '50px' }}>
                    {headerText}
                </span>

                <div className="rge-con">
                    <span style={{ marginRight: '10px' }}>
                        <Checkbox checked={this.state.showDateFilter}
                            onChange={this.onCheckboxChange}>
                            Filter By Range
                        </Checkbox>
                    </span>
                    <RangePicker format={DATE_FORMAT}
                        defaultValue={this.state.date}
                        disabled={!this.state.showDateFilter}
                        allowClear={false}
                        onChange={this.onDatePickerChange}
                    />
                </div>

                <div className="sts-con" style={{ marginRight: '50px' }}>
                    <span style={{ marginRight: '10px' }}>
                        Approval Status:
                    </span>
                    <StatusSelect defaultValue={this.state.filterValue}
                        onChange={this.onStatusSelectChange}
                        addAllOption
                    />
                </div>
            </div>
        )
    }
}

export default TimeEntryApprovalHeader;
