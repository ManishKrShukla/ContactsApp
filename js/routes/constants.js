export const GROUP_LIST = '/groups';
export const GROUP_DETAILS = '/groups/:group';
export const GROUP_CONTACT_DETAILS = '/groups/:group/:contact';
export const EDIT_CONTACT_DETAILS = '/groups/:group/:contact/edit';
// export const GROUP_LIST = 'groups';


export const getContactUrl = (group, contact) => {
    return `${GROUP_LIST}/${group}/${contact}`;
};