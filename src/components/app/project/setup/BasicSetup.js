import React from 'react';
import moment from 'moment';
import { Input, Form, DatePicker } from 'antd';

import { DATE_FORMAT, validateNumberForForm } from '../../../../utils/Util';

import ClientSelect from './ClientSelect';
import LeadsSelect from './LeadsSelect';
import StatusSelect from './StatusSelect';

const FormItem = Form.Item;

class BasicSetup extends React.Component {

    state = {
        startDate: null,
        dataOfCompletion: null
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('startDate', value);
    }

    onEndChange = (value) => {
        this.onChange('dataOfCompletion', value);
    }

    disabledStartDate = (startValue) => {
        const endValue = this.state.dataOfCompletion;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledDateOfCompletion = (endValue) => {
        const startValue = this.state.startDate;
        if (!endValue || !startValue) {
            return false;
        }
        return endValue.valueOf() <= startValue.valueOf();
    }

    componentDidMount() {
        if (this.props.formMode === 2 || this.props.formMode === 3) {
            let newValues = { ...this.props.recordToEdit };
            newValues.startDate = newValues.startDate ? moment(new Date(newValues.startDate)) : undefined;
            newValues.endDate = newValues.endDate ? moment(new Date(newValues.endDate)) : undefined;
            newValues.dateOfCompletion = newValues.dateOfCompletion ? moment(new Date(newValues.endDate)) : undefined;

            this.props.form.setFieldsValue(newValues);
        }
    }


    render() {
        const { form, formMode } = this.props;
        const { getFieldDecorator } = form;

        const formLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 }
        }

        let disabled = (formMode === 3);

        return (
            <Form className="hls-form">
                <FormItem {...formLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Project name cannot be empty' }]
                    })(
                        <Input
                            addonBefore="Project Name"
                            size="default"
                            name="name"
                            placeholder="Name of the Project"
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <ClientSelect loading={this.props.clientsLoading}
                    clients={this.props.clients}
                    formLayout={formLayout}
                    getFieldDecorator={getFieldDecorator}
                    initialClientId={this.props.initialClientId}
                    disabled={disabled}
                />

                <div className="row-flex" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormItem label="Start Date">
                        {getFieldDecorator('startDate')(
                            <DatePicker
                                format={DATE_FORMAT}
                                onChange={this.onStartChange}
                                disabledDate={this.disabledStartDate}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="PO Completion Date" name="endDate">
                        {getFieldDecorator('endDate')(
                            <DatePicker
                                format={DATE_FORMAT}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>

                <FormItem {...formLayout}>
                    {getFieldDecorator('budget', {
                        rules: [{ validator: validateNumberForForm }]
                    })(
                        <Input
                            addonBefore="Budget"
                            size="default"
                            name="budget"
                            placeholder="Budget of the Project"
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <LeadsSelect loading={this.props.leadsLoading}
                    leads={this.props.leads}
                    formLayout={formLayout}
                    getFieldDecorator={getFieldDecorator}
                    initialLeadIds={this.props.initialTeamLeadIds}
                    disabled={disabled}
                />

                <StatusSelect getFieldDecorator={getFieldDecorator}
                    formLayout={formLayout}
                    initialProjectStatus={this.props.initialStatus}
                    disabled={disabled}
                />

                <FormItem label="Date of Completion" name="dateOfCompletion">
                    {getFieldDecorator('dateOfCompletion')(
                        <DatePicker format={DATE_FORMAT}
                            onChange={this.onEndChange}
                            disabledDate={this.disabledDateOfCompletion}
                            disabled={disabled}
                        />
                    )}
                </FormItem>
            </Form>
        )
    }
}

export default Form.create()(BasicSetup);