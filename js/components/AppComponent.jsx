import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push, replace, go, goBack, goForward } from 'redux-little-router';

import ContactsAppComponent from './ContactsAppComponent.jsx';

import action from '../actions/contacts-action';
import ContactGroupsComponent from './ContactGroupsComponent.jsx';
import ContactsListComponent from './ContactsListComponent.jsx';

const mapStateToProps = (state) => {
    return {
        groups: state.contactGroups.groups,
        selectedGroup: state.contactGroups.selectedGroup,
        contacts: state.contacts.CURRENT_CONTACTS,
        location: state.location,
        selectedContact: state.contacts.selectedContact,
        initialLocation: state.router,
        isEditMode: state.contacts.isEditMode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addGroup: (group) => dispatch(action.addGroup(group)),
        getGroups: () => dispatch(action.loadGroups()),
        selectGroup: (group) => dispatch(action.selectGroupAndSetContacts),
        selectContact: (contact) => bindActionCreators(action.selectContact),
        addContact: () => bindActionCreators(action.addContact, dispatch),
        updateContact: () => bindActionCreators(action.updateContact, dispatch),
        redirectToGroups: () => dispatch(replace({pathname: '/groups'})),
        searchContacts: (route) => dispatch(replace(route))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactsAppComponent);