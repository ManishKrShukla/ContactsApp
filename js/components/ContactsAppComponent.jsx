import React from 'react';
import { replace } from 'redux-little-router';

import {UPDATE_CONTACT_SUCCESS} from "../constants/contacts-constants";
import {getContactUrl} from "../routes/constants";
import store from '../reducers';
import action from '../actions/contacts-action';
import ContactGroupsComponent from './ContactGroupsComponent.jsx';
import ContactsListComponent from './ContactsListComponent.jsx';
import {GROUP_LIST, GROUP_CONTACT_DETAILS} from '../routes/constants';

export default class ContactsAppComponent extends React.Component {
    constructor() {
        super();
        
        this.unsubscribe = store.subscribe(() => {
            let state = store.getState();

            if (state.contacts.event === UPDATE_CONTACT_SUCCESS) {
                store.dispatch(action.clearEvents());
                store.dispatch(replace(
                    {
                        pathname: getContactUrl(state.router.params.group, state.router.params.contact)
                    }
                ));
            }
        });

        // this.componentDidUpdate = this.loadComponentOnParams.bind(this);
    }

    componentDidMount() {
        this.setState({detailsComponent: null});
        if (this.props.selectedContact.id !== -1) {
            this.renderDetailsComponent(this.props);
        }
    }

    componentWillReceiveProps(newProps) {
        let location = this.props.initialLocation;
 
        if (location.pathname === '/') {
            this.props.redirectToGroups();
        }

        if (newProps.selectedContact.id === -1) {
            this.setState({detailsComponent: null});
        } else if (this.props.selectedContact.id !== newProps.selectedContact.id) {
            this.renderDetailsComponent(newProps);
        }
    }

    async renderDetailsComponent(params) {
    // renderDetailsComponent(params) {
        // require.ensure(['./ContactDetailsComponent.jsx'], (require) => {
        //     console.log("component loaded");
        //     const ContactDetailsComponent = require('./ContactDetailsComponent.jsx').default;
        //     this.setState({detailsComponent: <ContactDetailsComponent updateContact={params.updateContact} isEditMode={params.isEditMode} contact={params.selectedContact} />});
        // }, 'contact-details');

        // import('./ContactDetailsComponent.jsx').then((ContactDetailsComponent) => {
        //     this.setState({detailsComponent: <ContactDetailsComponent updateContact={params.updateContact} isEditMode={params.isEditMode} contact={params.selectedContact} />});
        // });
    
        const ContactDetailsComponent = await import(/* webpackChunkName: "contact-details" */'./ContactDetailsComponent.jsx');
        this.setState({detailsComponent: <ContactDetailsComponent.default updateContact={params.updateContact} isEditMode={params.isEditMode} contact={params.selectedContact} />});
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    
    render () {
        return (
            <div className="container">
                <ContactGroupsComponent groups={this.props.groups} onSelect={this.props.selectGroup} selectedGroup={this.props.selectedGroup} />
                <ContactsListComponent onSelect={this.props.selectContact} selectedContact={this.props.selectedContact} location={this.props.initialLocation} onSearch={this.props.searchContacts} contacts={this.props.contacts} />
                
                
                {this.state && this.state.detailsComponent}
                {/* <ContactDetailsComponent updateContact={this.props.updateContact} isEditMode={this.props.isEditMode} contact={this.props.selectedContact} /> */}
            </div>
        )
    }
};