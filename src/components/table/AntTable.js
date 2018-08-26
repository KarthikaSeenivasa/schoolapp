
import React from 'react';
import { Table, Radio } from 'antd';

class AntTable extends React.Component {

    state = {
        selectedRowKeys: [],
        title: "Select a Row"
    };

    selectRow = (record) => {
        let selectedRowKeys = [...this.state.selectedRowKeys];

        if (selectedRowKeys.indexOf(record.key) == -1) {
            selectedRowKeys = [];
            selectedRowKeys.push(record.key);
            this.setState({ selectedRowKeys, title: record[this.props.titleKey] });
        }
    }

    onSelectedRowKeysChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys, title: selectedRows[0][this.props.titleKey] });
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
                title={() => {
                    if (!this.props.noTitle) {
                        return (
                            <div className="title"><span>{this.state.title}</span></div>
                        );
                    }
                }}
                pagination={false}
                scroll={{ y: 200 }}
                size="small"
            />
        );
    }
}

export default AntTable;