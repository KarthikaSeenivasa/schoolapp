import React from 'react';
import { Table } from 'antd';

class BudgetVsActualTable extends React.Component {

    columns = [
        {
            title: 'Trade name',
            dataIndex: 'tradeName',
            width: 100
        },
        {
            title: 'Budget Man Hours',
            dataIndex: 'budget',
            width: 70
        },
        {
            title: 'Actual Utilized Man Hours',
            dataIndex: 'actualUtilised',
            width: 70
        },
        {
            title: 'Balance Man Hours',
            dataIndex: 'balance',
            width: 70
        },
        {
            title: 'Actual Utilized Man Hours in %',
            dataIndex: 'actualPercentage',
            width: 70
        },
        {
            title: 'Balance Man Hours in %',
            dataIndex: 'balancePercentage',
            width: 70
        },
        {
            title: '% Progress Plan Weightage',
            dataIndex: 'progress',
            width: 70
        },
        {
            title: 'Deviation Actual Vs Budget',
            dataIndex: 'deviation',
            width: 70
        },
    ];

    render() {
        return (
            <Table dataSource={this.props.dataSource}
                columns={this.columns}
                size="small"
                key="tradeName"
                rowKey="tradeName"
                pagination={false}
            />
        )
    }
}

export default BudgetVsActualTable;