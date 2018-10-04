import React from 'react';
import moment from 'moment';
import { Input, Form, DatePicker } from 'antd';

import { DATE_FORMAT, validateNumberForForm } from '../../../../utils/Util';

import ClientSelect from './ClientSelect';
import LeadsSelect from './LeadsSelect';
import StatusSelect from './StatusSelect';
import ContactsSelect from './ContactsSelect';
import ContactsPicker from './ContactsPicker';

const FormItem = Form.Item;

class ProjectDetails extends React.Component {

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
            labelCol: { span: 7 },
            wrapperCol: { span: 13 }
        }

        const partFormLayout = {
            labelCol: { span: 12 },
            wrapperCol: { span: 12 }
        }

        let disabled = (formMode === 3);

        return (
            <Form className="hls-form">
                <div className="row-flex">
                    <FormItem label="Project Name" {...partFormLayout}>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Project name cannot be empty' }]
                        })(
                            <Input
                                size="default"
                                name="name"
                                placeholder="Project Name"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Order Receiving Date" {...partFormLayout}>
                        {getFieldDecorator('receivingDate')(
                            <DatePicker
                                format={DATE_FORMAT}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                </div>

                <div className="row-flex">
                    <FormItem label="Esskay Job Number" {...partFormLayout}>
                        {getFieldDecorator('esskayJN', {
                            rules: [{ required: true, message: 'Esskay job number name cannot be empty' }]
                        })(
                            <Input
                                size="default"
                                name="esskayJN"
                                placeholder="Esskay Job Number"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Client Job Number" {...partFormLayout}>
                        {getFieldDecorator('clientJN', {
                            rules: [{ required: true, message: 'Client job number name cannot be empty' }]
                        })(
                            <Input
                                size="default"
                                name="clientJN"
                                placeholder="Client Job Number"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>

                <ContactsPicker formLayout={partFormLayout} {...this.props} />

                <div className="row-flex">
                    <FormItem label="Budget" {...partFormLayout}>
                        {getFieldDecorator('budget', {
                            rules: [{ validator: validateNumberForForm }]
                        })(
                            <Input
                                size="default"
                                name="budget"
                                placeholder="Budget"
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
                </div>

                <div className="row-flex">
                    <FormItem label="Start Date" {...partFormLayout}>
                        {getFieldDecorator('startDate')(
                            <DatePicker
                                format={DATE_FORMAT}
                                onChange={this.onStartChange}
                                disabledDate={this.disabledStartDate}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Timeframe(weeks)" {...partFormLayout}>
                        {getFieldDecorator('timeframe', {
                            rules: [{ validator: validateNumberForForm }]
                        })(
                            <Input
                                size="default"
                                name="timeframe"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>

                <FormItem label="Planned IFA Date" {...partFormLayout}>
                    {getFieldDecorator('plannedIFA')(
                        <DatePicker
                            format={DATE_FORMAT}
                            name="plannedIFA"
                            disabled={true}
                        />
                    )}
                </FormItem>

                <div className="row-flex">
                    <FormItem label="Actual IFA Date" {...partFormLayout}>
                        {getFieldDecorator('actualIFA')(
                            <DatePicker format={DATE_FORMAT}
                                name="actualIFA"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Actual IFF Date" {...partFormLayout}>
                        {getFieldDecorator('actualIFF')(
                            <DatePicker format={DATE_FORMAT}
                                name="actualIFF"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>

                <div className="row-flex">
                    <StatusSelect getFieldDecorator={getFieldDecorator}
                        formLayout={partFormLayout}
                        initialProjectStatus={this.props.initialStatus}
                        disabled={disabled}
                    />
                    <FormItem label="Description" {...partFormLayout}>
                        {getFieldDecorator('description')(
                            <Input
                                size="default"
                                name="description"
                                placeholder="Status Description"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>
            </Form>
        )
    }
}

export default Form.create()(ProjectDetails);