import React from 'react';
import StatusSelect from './StatusSelect';

class TableHeader extends React.Component {

    state = {
        filterValue: 'PENDING'
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
                return 'All the time entries are listed';
            case 'APPROVED':
                return 'The listed time entries are approved';
            case 'PENDING':
                return 'The listed time entries are pending for approval';
            case 'DECLINED':
                return 'The listed time entries are declined'
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

export default TableHeader;
