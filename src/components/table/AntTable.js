
import React from 'react';
import { Table } from 'antd';

class AntTable extends React.Component {

    state = {
        selectedRowKeys: []
    };

    selectRow = (record) => {
        let selectedRowKeys = [...this.state.selectedRowKeys];

        if (selectedRowKeys.indexOf(record.key) == -1) {
            selectedRowKeys = [];
            selectedRowKeys.push(record.key);
            this.setState({ selectedRowKeys });
        }
    }

    onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
    }

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
            type: "radio"
        };
        return (
            <Table
                rowSelection={rowSelection}
                columns={this.props.columns}
                dataSource={this.props.dataSource}
                onRow={(record) => ({
                    onClick: () => {
                        this.selectRow(record);
                    }
                })}
                pagination={false}
                scroll={{ y: 200 }}
                size="small"
            />
        );
    }
}

export default AntTable;