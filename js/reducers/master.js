const initialState = {

    'phone': [

    ],

    'email': [

    ],

    'fax': [

    ],

    'website': [

    ]

};

const contactGroups = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_FIELD_TYPE':
            return state;
        default:
            return state
    }
}

export default contactGroups;