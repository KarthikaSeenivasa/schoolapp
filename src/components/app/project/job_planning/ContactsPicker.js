import React from 'react';
import { Select } from 'antd';

import ClientSelect from './ClientSelect';
import ContactsSelect from './ContactsSelect';

class ContactsPicker extends React.Component {

    state = {
        contacts: [],
        initialContactIds: []
    }

    onClientChange = (value, option) => {
        for (var client of this.props.clients) {
            if (client.id === value) {
                let initialContactIds = [];
                if(client.contacts.length > 0) {
                    initialContactIds = [client.contacts[0].id];
                }
                this.setState({
                    contacts: client.contacts,
                    initialContactIds
                });
                return;
            }
        }
    }

    componentWillMount() {
        let initialContactIds = [];
        if(this.props.clients[0].contacts.length > 0) {
            initialContactIds = [this.props.clients[0].contacts[0].id];
        }
        this.setState({
            contacts: this.props.clients[0].contacts,
            initialContactIds
        })
    }

    render() {
        let initialValue = [];
        if (this.state.contacts.length > 0) {
            initialValue = this.props.initialContactIds ? this.props.initialContactIds : this.state.initialContactIds;
        }
        return (
            <div>
                <ClientSelect loading={this.props.clientsLoading}
                    clients={this.props.clients}
                    formLayout={this.props.formLayout}
                    getFieldDecorator={this.props.form.getFieldDecorator}
                    initialValue={this.props.initialClientId}
                    onChange={this.onClientChange}
                    disabled={this.props.disabled}
                />

                <ContactsSelect loading={this.props.clientsLoading}
                    formLayout={this.props.formLayout}
                    getFieldDecorator={this.props.form.getFieldDecorator}
                    setFieldsValue={this.props.form.setFieldsValue}
                    initialValue={initialValue}
                    disabled={this.props.disabled}
                    contacts={this.state.contacts}
                />
            </div>
        )
    }
}

export default ContactsPicker;