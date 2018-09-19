import React from 'react';
import { DatePicker, Checkbox } from 'antd';
import moment from 'moment';
import { DATE_FORMAT } from '../../../../utils/Util';

class TableHeader extends React.Component {

    state = {
        showFilter : true,
        filterValue : moment()
    } 

    onCheckboxChange = (event) => {
        this.props.onDatePickerChange(event.target.checked ? this.state.filterValue : undefined);

        this.setState({
            showFilter : event.target.checked
        });
    }

    onDatePickerChange = (date, dateString) => {
        this.setState ({
            filterValue : date
        });

        this.props.onDatePickerChange(date);
    }

    render() {
        return (
            <div className="tab-hdr">
                <span className="hdr-txt">
                    Total Number of Hours : {this.props.numberOfHours}
                </span>
                <div className="sts-con" style={{ marginRight: '50px' }}>
                    <span style={{ marginRight: '10px' }}>
                        <Checkbox checked={this.state.showFilter} onChange={this.onCheckboxChange}>
                            Filter By Date
                        </Checkbox>
                    </span>
                    <DatePicker format={DATE_FORMAT}
                                defaultValue={this.state.filterValue}
                                disabled={!this.state.showFilter}
                                allowClear={false}
                                onChange={this.onDatePickerChange}
                    />
                </div>
            </div>
        )
    }
}

export default TableHeader;
