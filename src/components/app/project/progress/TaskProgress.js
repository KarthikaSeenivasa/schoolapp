
import React from 'react';
import { Table, Progress, Button, Modal } from 'antd';
import { renderDate } from '../../../../utils/Util';

import ProgressDetails from './ProgressDetails';

class TaskProgress extends React.Component {

    state = {
        showModal: false,
        editMode: false,
        recordToEdit: null
    }

    renderProgress = (text, record) => {
        return (
            <Progress percent={record.progressPercentage} />
        );
    }

    renderActions = (text, record) => {
        let self = this;
        return (
            <span>
                <a onClick={() => {
                    self.handleEditAction(text, record);
                }}>Edit</a>
            </span>)
    }

    renderTitle = (currentTableData) => {
        let self = this;
        return (
            <div className="title">
                <Button type="primary" size="small" onClick={self.handleAddAction}>Add Progress Entry</Button>
            </div>
        )
    }

    handleEditAction = (text, record) => {
        this.setState({
            showModal: true,
            editMode: true,
            recordToEdit: record
        })

    }

    handleAddAction = (e) => {
        this.setState({
            showModal: true,
            editMode: false
        })
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        });
    }

    handleOk = (date, progressPercentage) => {
        if (this.state.editMode) {
            this.props.onEditProgress(this.state.recordToEdit.id, date, progressPercentage);
        } else {
            this.props.onAddProgress(this.props.selectedTask.id, date, progressPercentage);
        }
        this.setState({
            showModal: false
        });
    }

    render() {
        let columns = [
            {
                title: 'Entered Date',
                dataIndex: 'date',
                render: renderDate,
                width: 150
            },
            {
                title: 'Progress',
                dataIndex: 'progressPercentage',
                render: this.renderProgress,
                width: 200
            }
        ];

        if (this.props.allowEdit) {
            columns.push({
                title: 'Actions',
                dataIndex: 'id',
                render: this.renderActions,
                width: 150
            });
        }

        return (
            <Modal visible={this.props.visible}
                title={this.props.title}
                footer={null}
                onCancel={this.props.onCancel}
                maskClosable={false}
                destroyOnClose
                centered
            >
                <Table size="small"
                    columns={columns}
                    dataSource={this.props.dataSource}
                    pagination={false}
                    rowKey="id"
                    title={this.renderTitle}
                />

                {this.state.showModal &&
                    <ProgressDetails visible={this.state.showModal}
                        editMode={this.state.editMode}
                        recordToEdit={this.state.recordToEdit}
                        handleCancel={this.handleCancel}
                        handleOk={this.handleOk}
                    />
                }
            </Modal>
        )
    }
}

export default TaskProgress;

