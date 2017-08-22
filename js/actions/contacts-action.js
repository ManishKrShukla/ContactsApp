import * as types from "../constants/contacts-constants";

export default {
    loadGroups: (loadAllContacts = false) => {
        return {type: types.GET_GROUPS,  data : {loadAllContacts}};
    },

    addContact: (contact) => {
        return {type: types.ADD_CONTACT, data: contact};
    },

    addGroup: (group) => {
        return {type: types.ADD_GROUP, data: group};
    },

    selectGroupAndSetContacts: (groupId) => {
        return {type: types.SELECT_GROUP, data :groupId};
    },

    selectContact: (group, contact, isEditMode = false) => {
        return {type: types.SELECT_CONTACT, data : {group, contact, isEditMode}};
    },

    updateContact: (contact) => {
        return {type: types.UPDATE_CONTACT, data: {contact}};
    },

    clearEvents: (contact) => {
        return {type: types.CLEAR_CONTACT_EVENT};
    }
};