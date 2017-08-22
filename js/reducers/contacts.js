import {SELECT_GROUP, GET_GROUPS, SELECT_CONTACT, UPDATE_CONTACT, UPDATE_CONTACT_SUCCESS, CLEAR_CONTACT_EVENT} from "../constants/contacts-constants";

const initialState = {
    ALL_CONTACTS: [

    ],

    CURRENT_CONTACTS: [

    ],

    selectedContact: {
        id : -1
    },
    isEditMode : false,
    event: ''
};

[0,0,0,0,0].forEach((val, ind) => {

    [0,0,0,0,0].forEach((val, index) => {
        initialState['ALL_CONTACTS'].push({
            id: index + 1,
            group_id: ind + 1,
            firstName: `First`,
            lastName: `Last ${ind + 1} - ${index + 1}`,
            fullName: `First Last ${ind + 1} - ${index + 1}`,

            phone: [
                {type: 'home 1', value: '123123123'},
                {type: 'home 2', value: '123123123'},
                {type: 'home 3', value: '123123123'}
            ],

            email: [
                {type: 'home 1', value: 'test@123.com'},
                {type: 'home 2', value: 'test@123.com'},
                {type: 'home 3', value: 'test@123.com'},
            ],

            website : [
                {type: 'home 1', value: 'web@123.com'},
                {type: 'home 2', value: 'web@123.com'},
                {type: 'home 3', value: 'web@123.com'},
            ]

            // mobile: `123123123-${index + 1}`,
            // home: `123123123-${index + 1}`,
            // homePage: `www.123-${index + 1}.com`
        });
    });

});

const contactGroups = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_GROUP':
            return state;

        case GET_GROUPS:
            if (action.data.loadAllContacts) {
                state.CURRENT_CONTACTS = state['ALL_CONTACTS'];
            }

            return state;

        case SELECT_CONTACT:
            let contact = state['ALL_CONTACTS'].find((contact) => contact.id === parseInt(action.data.contact) && contact.group_id === parseInt(action.data.group));
            state.selectedContact = contact;
            state.isEditMode = action.data.isEditMode;
            return state;

        case UPDATE_CONTACT:
            let index = state['ALL_CONTACTS'].findIndex((contact) => contact.id === parseInt(action.data.contact) && contact.group_id === parseInt(action.data.group));
            state['ALL_CONTACTS'][index] = action.data.contact;
            state['event'] = UPDATE_CONTACT_SUCCESS;
            return state;

        case SELECT_GROUP:
            state.CURRENT_CONTACTS = state['ALL_CONTACTS'].filter((contact) => contact.group_id === parseInt(action.data));
            state.selectedContact = {
                id : -1
            };
            return state;

        case CLEAR_CONTACT_EVENT:
            state.event = '';

        default:
            return state
    }
}

export default contactGroups;