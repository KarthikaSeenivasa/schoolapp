import React from 'react';
import  moment  from 'moment';
import { Form, DatePicker, Input } from 'antd';

import { DATE_FORMAT, validateNumberForForm } from '../../../../utils/Util';

const FormItem = Form.Item;

class IFADatePicker extends React.Component {

    onTimeFrameChange = (e) => {
        if(!isNaN(e.target.value) && e.target.value !== ""){
            let valueInSeconds = e.target.value * 7 * 24 * 60 * 60;
            let startDate = this.props.form.getFieldValue('startDate');
            if(startDate) {
                let startDateUnix = startDate.unix();
                let plannedIFAUnix = startDateUnix + valueInSeconds;
                this.props.form.setFieldsValue({
                    plannedIFA : moment(new Date(plannedIFAUnix*1000))
                })
            }
        }
    }

    componentDidMount() {
        if (this.props.formMode === 2 || this.props.formMode === 3) {
            let plannedIFAUnix = this.props.recordToEdit.plannedIFA.unix();
            let startDateUnix = this.props.recordToEdit.startDate.unix();
            if(plannedIFAUnix && startDateUnix){
                let timeframeInMillis = plannedIFAUnix - startDateUnix;

                this.props.form.setFieldsValue({
                    timeframe : timeframeInMillis/(7 * 24 * 60 * 60)
                });
            }
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { disabled } = this.props;
        return (
            <div className="row-flex">
                <FormItem label="Start Date" name="startDate" {...this.partFormLayout}>
                    {getFieldDecorator('startDate')(
                        <DatePicker
                            format={DATE_FORMAT}
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <FormItem label="Timeframe(weeks)" {...this.partFormLayout}>
                    {getFieldDecorator('timeframe', {
                        rules: [{ validator: validateNumberForForm }]
                    })(
                        <Input
                            size="default"
                            name="timeframe"
                            onChange={this.onTimeFrameChange}
                            disabled={disabled}
                        />
                    )}
                </FormItem>

                <FormItem label="Planned IFA Date" name="plannedIFA" {...this.partFormLayout}>
                    {getFieldDecorator('plannedIFA')(
                        <DatePicker
                            format={DATE_FORMAT}
                            disabled
                        />
                    )}
                </FormItem>
            </div>
        )
    }
}

export default IFADatePicker;