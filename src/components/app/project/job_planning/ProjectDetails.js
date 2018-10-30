import React from 'react';
import moment from 'moment';
import { Input, Form, DatePicker } from 'antd';

import { DATE_FORMAT, validateNumberForForm } from '../../../../utils/Util';

import LeadsSelect from './LeadsSelect';
import StatusSelect from './StatusSelect';
import ContactsPicker from './ContactsPicker';
import IFADatePicker from './IFADatePicker';

const FormItem = Form.Item;

class ProjectDetails extends React.Component {

    componentDidMount() {
        if (this.props.formMode === 2 || this.props.formMode === 3) {
            let newValues = { ...this.props.recordToEdit };
            newValues.receivingDate = newValues.receivingDate ? moment(new Date(newValues.receivingDate)) : undefined;
            newValues.startDate = newValues.startDate ? moment(new Date(newValues.startDate)) : undefined;
            newValues.plannedIFA = newValues.plannedIFA ? moment(new Date(newValues.plannedIFA)) : undefined;
            newValues.actualIFA = newValues.actualIFA ? moment(new Date(newValues.actualIFA)) : undefined;
            newValues.actualIFF = newValues.actualIFF ? moment(new Date(newValues.actualIFF)) : undefined;

            this.props.form.setFieldsValue(newValues);
        }
    }

    formLayout = {
        labelCol: { span: 7 },
        wrapperCol: { span: 9 }
    }

    partFormLayout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 12 }
    }

    render() {
        const { form, formMode } = this.props;
        const { getFieldDecorator } = form;

        let disabled = (formMode === 3);

        return (
            <Form className="hls-form">
                <FormItem label="Job Name" {...this.formLayout}>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Job name cannot be empty' }]
                    })(
                        <Input
                            size="default"
                            name="name"
                            placeholder="Job Name"
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <div className="row-flex">
                    <FormItem label="Esskay Job Number" {...this.partFormLayout}>
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

                    <FormItem label="Client Job Number" {...this.partFormLayout}>
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

                <ContactsPicker formLayout={this.formLayout} disabled={disabled} {...this.props} />

                <LeadsSelect loading={this.props.leadsLoading}
                    leads={this.props.leads}
                    formLayout={this.formLayout}
                    getFieldDecorator={getFieldDecorator}
                    initialLeadIds={this.props.initialTeamLeadIds}
                    disabled={disabled}
                />

                <StatusSelect getFieldDecorator={getFieldDecorator}
                    formLayout={this.formLayout}
                    initialProjectStatus={this.props.initialStatus}
                    disabled={disabled}
                />

                <FormItem label="Current Status Description" {...this.formLayout}>
                    {getFieldDecorator('statusDescription')(
                        <Input
                            size="default"
                            name="statusDescription"
                            placeholder="Status Description"
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <div className="row-flex">
                    <FormItem label="Budget" {...this.partFormLayout}>
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

                    <FormItem label="Order Receiving Date" {...this.partFormLayout}>
                        {getFieldDecorator('receivingDate')(
                            <DatePicker
                                format={DATE_FORMAT}
                                disabled={disabled}
                            />
                        )}
                    </FormItem>
                </div>

                <IFADatePicker formLayout={this.partFormLayout} disabled={disabled} {...this.props} /> 

                <div className="row-flex">
                    <FormItem label="Actual IFA Date" {...this.partFormLayout}>
                        {getFieldDecorator('actualIFA')(
                            <DatePicker format={DATE_FORMAT}
                                name="actualIFA"
                                disabled={disabled}
                            />
                        )}
                    </FormItem>

                    <FormItem label="Actual IFF Date" {...this.partFormLayout}>
                        {getFieldDecorator('actualIFF')(
                            <DatePicker format={DATE_FORMAT}
                                name="actualIFF"
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