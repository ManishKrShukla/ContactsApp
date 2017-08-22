import {GET_GROUPS, SELECT_GROUP} from "../constants/contacts-constants";

const PREDEFINED_GROUPS = [{
        id: 1,
        name: 'Family'
    }, {
        id: 2,
        name: 'Friends'
    }, {
        id: 3,
        name: 'Work'
    }, {
        id: 4,
        name: 'Society'
    }, {
        id: 5,
        name: 'School'
}];

const initialState = {
    groups: [],
    selectedGroup: -1
};

const contactGroups = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_GROUP':
            return state;

        case SELECT_GROUP: 
            state.selectedGroup = parseInt(action.data);
            return state;

        case GET_GROUPS:
            if (action.data.loadAllContacts) {
                state.selectedGroup = -1;
            }

            if (state.groups.length === 0) {
                state.groups = PREDEFINED_GROUPS;                
            }
            return state;

        default:
            return state;
    }
}

export default contactGroups;