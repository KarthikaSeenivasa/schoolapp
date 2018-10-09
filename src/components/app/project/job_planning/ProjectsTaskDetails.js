import React from 'react';
import { Modal, Input, Slider, Icon } from 'antd';

class ProjectsTaskDetails extends React.Component {

    state = {
        resourceAllocated: 0,
        weightage: 0,
        resourceAllocationWarning: null,
        weightageWarning: null
    }

    onInputChange = (e) => {
        let warning = this.checkBudget(e.target.value);
        this.setState({
            resourceAllocated: e.target.value,
            resourceAllocationWarning: warning
        });
    }

    onSliderChange = (value) => {
        let warning = this.checkTotalWeightage(value)
        this.setState({
            weightage: value,
            weightageWarning: warning
        });
    }

    checkTotalWeightage = (value) => {
        value = value ? Number(value) : 0;
        let sum = value ? Number(value) : 0;

        for (let task of this.props.projectSpecificTasks) {
            if (task !== this.props.selectedTask) {
                sum += task.weightage;
            }
        }
        if (sum !== 100) {
            return 'Total Weightage does not equal 100%';
        }

        return undefined;
    }

    checkBudget = (value) => {
        value = value ? Number(value) : 0;
        let budget = this.props.selectedTask.project.budget;
        let sum = value ? Number(value) : 0;

        for (let task of this.props.projectSpecificTasks) {
            if (task !== this.props.selectedTask) {
                sum += task.resourceAllocated;
            }
            if (sum > budget) {
                return 'Resources Allocated goes beyond budget!';
            }
        }

        return undefined;
    }

    componentWillMount() {
        this.setState({
            resourceAllocated: this.props.selectedTask.resourceAllocated,
            weightage: this.props.selectedTask.weightage
        });

        this.checkBudget(this.props.selectedTask.resourceAllocated);
    }

    onOk = (e) => {
        this.props.onOk(this.state.resourceAllocated, this.state.weightage);
    }

    render() {
        return (
            <Modal visible={this.props.visible}
                onOk={this.onOk}
                title={this.props.selectedTask.taskMaster.taskName}
                onCancel={this.props.onCancel}
            >
                <div className="res-alloc">
                    <div className="res-alc-ipt">
                        <Input
                            addonBefore="Resources Allocated"
                            size="large"
                            name="resourceAllocated"
                            defaultValue={this.state.resourceAllocated}
                            placeholder="Resource Allocated"
                            onInput={this.onInputChange}
                        />
                        {
                            this.state.resourceAllocationWarning &&
                            <div className="res-wrn">
                                <Icon type="warning" theme="outlined" />
                                <span style={{ marginLeft: '5px' }}>{this.state.resourceAllocationWarning}</span>
                            </div>
                        }
                    </div>
                    <div className="weightage">
                        <span className="label">Weightage of the task</span>
                        <Slider defaultValue={Number(this.state.weightage)}
                            onAfterChange={this.onSliderChange}
                            step={0.1}
                            style={{ width: '75%', alignSelf: 'flex-end' }} />
                    </div>
                    {
                        this.state.weightageWarning &&
                        <div className="res-wrn">
                            <Icon type="warning" theme="outlined" />
                            <span style={{ marginLeft: '5px' }}>{this.state.weightageWarning}</span>
                        </div>
                    }
                </div>
            </Modal>
        )
    }
}

export default ProjectsTaskDetails;