import React from 'react';
import { Input, Modal, DatePicker } from 'antd';
import { DATE_FORMAT } from '../../../../utils/Util';
import moment from 'moment';

class ProgressDetails extends React.Component {
    state = {
        date: null,
        progressPercentage: null,
        warning: ""
    }

    handleOk = (e) => {
        if (this.validate()) {
            this.props.handleOk(moment(this.state.date), this.state.progressPercentage);
        }
    }

    validate = () => {
        if (this.state.date && this.state.progressPercentage) {
            if (isNaN(this.state.progressPercentage) || (this.state.progressPercentage < 0 || this.state.progressPercentage > 100)) {
                this.setState({
                    warning: 'Please enter a valid number between 0 and 100'
                });
                return false;
            }
            this.setState({
                warning: ''
            })
            return true;
        }

        this.setState({
            warning: 'Please enter all the required fields'
        });
        return false;
    }

    onDateChange = (value) => {
        this.setState({
            date: value
        });
    }

    onProgressChange = (e) => {
        if (isNaN(e.target.value) || (e.target.value < 0 || e.target.value > 100)) {
            this.setState({
                warning: 'Please enter a valid number between 0 and 100'
            });
            return;
        }
        this.setState({
            warning: ''
        })
        this.setState({
            progressPercentage: e.target.value
        })
    }
    componentWillMount() {
        if (this.props.editMode && this.props.recordToEdit) {
            this.setState({
                date: this.props.recordToEdit.date,
                progressPercentage: this.props.recordToEdit.progressPercentage
            })
        }
    }
    render() {

        const { visible, handleCancel, recordToEdit, editMode } = this.props;
        return (
            <Modal visible={visible}
                title={editMode ? 'Edit Progress' : 'Add Progress'}
                onCancel={handleCancel}
                okText="Submit"
                onOk={(e) => this.handleOk(e)}
                destroyOnClose
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}>
                    <div className="date-con" style={{
                        margin: '10px 10px 30px 10px',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}>
                        <span className="lbl" style={{ margin: 'auto 5px' }}>Date:</span>
                        <DatePicker format={DATE_FORMAT}
                            onChange={this.onDateChange}
                            defaultValue={editMode ? moment(recordToEdit.date) : null} />
                    </div>
                    <div className="progress" style={{ width: '50%' }}>
                        <Input name="progressPercentage"
                            size="small"
                            addonBefore="Progress"
                            defaultValue={editMode ? recordToEdit.progressPercentage : ""}
                            onInput={this.onProgressChange}
                        />
                    </div>
                    <div style={{ color: 'red', marginTop: '5px' }}>{this.state.warning}</div>
                </div>
            </Modal >
        )
    }
}

export default ProgressDetails;