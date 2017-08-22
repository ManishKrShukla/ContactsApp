import {GROUP_LIST, GROUP_DETAILS, GROUP_CONTACT_DETAILS, EDIT_CONTACT_DETAILS} from '../routes/constants';
import appActions from '../actions/contacts-action';

const locationTracker = store => next => action => {

    if (action.type === "ROUTER_LOCATION_CHANGED") {
    
        if (store.getState().contactGroups.groups.length === 0 && action.payload.route !== GROUP_LIST) {
            next(appActions.loadGroups());
        }

        switch(action.payload.route) {
            case GROUP_LIST:
                next(appActions.loadGroups(true));
                break; 

            case GROUP_DETAILS:
                // if (store.getState().contactGroups.groups.length === 0) {
                //     next(appActions.loadGroups());
                // }
                next(appActions.selectGroupAndSetContacts(action.payload.params.group));
                break; 

            case GROUP_CONTACT_DETAILS:
                next(appActions.selectGroupAndSetContacts(action.payload.params.group));
                next(appActions.selectContact(action.payload.params.group, action.payload.params.contact));
                break; 

            case EDIT_CONTACT_DETAILS:
                next(appActions.selectGroupAndSetContacts(action.payload.params.group));
                next(appActions.selectContact(action.payload.params.group, action.payload.params.contact, true));
                break; 
        
        }

    }

    next(action);
};

export default locationTracker;