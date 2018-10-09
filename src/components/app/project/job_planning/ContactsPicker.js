import React from 'react';

import ClientSelect from './ClientSelect';
import ContactsSelect from './ContactsSelect';

class ContactsPicker extends React.Component {

    state = {
        contacts: [],
        initialContactIds: [],
        initialClientId: null
    }

    onClientChange = (value, option) => {
        let initialContactIds = [], contacts = [], initialClientId;
        for (var client of this.props.clients) {
            if (client.id === value) {
                initialClientId = value;
                if (client.contacts.length > 0) {
                    contacts = client.contacts;
                    initialContactIds = [client.contacts[0].id];
                    break;
                }
            }
        }
        this.setState({
            contacts,
            initialContactIds,
            initialClientId
        });
    }

    componentWillMount() {
        let initialContactIds = [], contacts = [], initialClientId;
        if (this.props.formMode === 2 || this.props.formMode === 3) {
            initialContactIds = this.props.initialContactIds;
            for (const client of this.props.clients) {
                for(const contact of client.contacts) {
                    if(initialContactIds[0] === contact.id) {
                        contacts = client.contacts;
                        initialClientId = client.id;
                        break;
                    }
                }
            }
        } else {
            if (this.props.clients[0].contacts.length > 0) {
                initialContactIds = [this.props.clients[0].contacts[0].id];
                contacts = this.props.clients[0].contacts;
                initialClientId = this.props.clients[0].id;
            }
        }

        this.setState({
            contacts,
            initialContactIds,
            initialClientId
        })
    }

    render() {
  
        return (
            <div>
                <ClientSelect loading={this.props.clientsLoading}
                    clients={this.props.clients}
                    formLayout={this.props.formLayout}
                    getFieldDecorator={this.props.form.getFieldDecorator}
                    initialValue={this.state.initialClientId}
                    onChange={this.onClientChange}
                    disabled={this.props.disabled}
                />

                <ContactsSelect loading={this.props.clientsLoading}
                    formLayout={this.props.formLayout}
                    getFieldDecorator={this.props.form.getFieldDecorator}
                    setFieldsValue={this.props.form.setFieldsValue}
                    initialValue={this.state.initialContactIds}
                    disabled={this.props.disabled}
                    contacts={this.state.contacts}
                />
            </div>
        )
    }
}

export default ContactsPicker;