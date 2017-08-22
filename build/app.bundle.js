webpackJsonp([0],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var GROUP_LIST = exports.GROUP_LIST = '/groups';
var GROUP_DETAILS = exports.GROUP_DETAILS = '/groups/:group';
var GROUP_CONTACT_DETAILS = exports.GROUP_CONTACT_DETAILS = '/groups/:group/:contact';
var EDIT_CONTACT_DETAILS = exports.EDIT_CONTACT_DETAILS = '/groups/:group/:contact/edit';
// export const GROUP_LIST = 'groups';


var getContactUrl = exports.getContactUrl = function getContactUrl(group, contact) {
    return GROUP_LIST + '/' + group + '/' + contact;
};

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contactsConstants = __webpack_require__(67);

var types = _interopRequireWildcard(_contactsConstants);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    loadGroups: function loadGroups() {
        var loadAllContacts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        return { type: types.GET_GROUPS, data: { loadAllContacts: loadAllContacts } };
    },

    addContact: function addContact(contact) {
        return { type: types.ADD_CONTACT, data: contact };
    },

    addGroup: function addGroup(group) {
        return { type: types.ADD_GROUP, data: group };
    },

    selectGroupAndSetContacts: function selectGroupAndSetContacts(groupId) {
        return { type: types.SELECT_GROUP, data: groupId };
    },

    selectContact: function selectContact(group, contact) {
        var isEditMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        return { type: types.SELECT_CONTACT, data: { group: group, contact: contact, isEditMode: isEditMode } };
    },

    updateContact: function updateContact(contact) {
        return { type: types.UPDATE_CONTACT, data: { contact: contact } };
    },

    clearEvents: function clearEvents(contact) {
        return { type: types.CLEAR_CONTACT_EVENT };
    }
};

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(134);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(37);

var _reduxLittleRouter = __webpack_require__(26);

var _reducers = __webpack_require__(274);

var _reducers2 = _interopRequireDefault(_reducers);

var _AppComponent = __webpack_require__(280);

var _AppComponent2 = _interopRequireDefault(_AppComponent);

var _bootstrap = __webpack_require__(284);

var _bootstrap2 = _interopRequireDefault(_bootstrap);

__webpack_require__(285);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactDom2.default.render(_react2.default.createElement(
    _reactRedux.Provider,
    { store: _reducers2.default },
    _react2.default.createElement(_AppComponent2.default, null)
), document.getElementById('root'));

(0, _reduxLittleRouter.push)('/groups');

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(62);

var _reduxLittleRouter = __webpack_require__(26);

var _locationTracker = __webpack_require__(275);

var _locationTracker2 = _interopRequireDefault(_locationTracker);

var _groups = __webpack_require__(276);

var _groups2 = _interopRequireDefault(_groups);

var _contacts = __webpack_require__(277);

var _contacts2 = _interopRequireDefault(_contacts);

var _master = __webpack_require__(278);

var _master2 = _interopRequireDefault(_master);

var _routes = __webpack_require__(279);

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _routerForBrowser = (0, _reduxLittleRouter.routerForBrowser)({
  routes: _routes2.default
}),
    reducer = _routerForBrowser.reducer,
    middleware = _routerForBrowser.middleware,
    enhancer = _routerForBrowser.enhancer;

var contactsApp = (0, _redux.combineReducers)({
  router: reducer,
  contactGroups: _groups2.default,
  contacts: _contacts2.default,
  master: _master2.default
});

var store = (0, _redux.createStore)(contactsApp, (0, _redux.compose)(enhancer, (0, _redux.applyMiddleware)(middleware, _locationTracker2.default)));

var initialLocation = store.getState().router;

if (initialLocation) {
  store.dispatch((0, _reduxLittleRouter.initializeCurrentLocation)(initialLocation));
}

exports.default = store;

/***/ }),

/***/ 275:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(117);

var _contactsAction = __webpack_require__(118);

var _contactsAction2 = _interopRequireDefault(_contactsAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locationTracker = function locationTracker(store) {
    return function (next) {
        return function (action) {

            if (action.type === "ROUTER_LOCATION_CHANGED") {

                if (store.getState().contactGroups.groups.length === 0 && action.payload.route !== _constants.GROUP_LIST) {
                    next(_contactsAction2.default.loadGroups());
                }

                switch (action.payload.route) {
                    case _constants.GROUP_LIST:
                        next(_contactsAction2.default.loadGroups(true));
                        break;

                    case _constants.GROUP_DETAILS:
                        // if (store.getState().contactGroups.groups.length === 0) {
                        //     next(appActions.loadGroups());
                        // }
                        next(_contactsAction2.default.selectGroupAndSetContacts(action.payload.params.group));
                        break;

                    case _constants.GROUP_CONTACT_DETAILS:
                        next(_contactsAction2.default.selectGroupAndSetContacts(action.payload.params.group));
                        next(_contactsAction2.default.selectContact(action.payload.params.group, action.payload.params.contact));
                        break;

                    case _constants.EDIT_CONTACT_DETAILS:
                        next(_contactsAction2.default.selectGroupAndSetContacts(action.payload.params.group));
                        next(_contactsAction2.default.selectContact(action.payload.params.group, action.payload.params.contact, true));
                        break;

                }
            }

            next(action);
        };
    };
};

exports.default = locationTracker;

/***/ }),

/***/ 276:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contactsConstants = __webpack_require__(67);

var PREDEFINED_GROUPS = [{
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

var initialState = {
    groups: [],
    selectedGroup: -1
};

var contactGroups = function contactGroups() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'ADD_GROUP':
            return state;

        case _contactsConstants.SELECT_GROUP:
            state.selectedGroup = parseInt(action.data);
            return state;

        case _contactsConstants.GET_GROUPS:
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
};

exports.default = contactGroups;

/***/ }),

/***/ 277:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _contactsConstants = __webpack_require__(67);

var initialState = {
    ALL_CONTACTS: [],

    CURRENT_CONTACTS: [],

    selectedContact: {
        id: -1
    },
    isEditMode: false,
    event: ''
};

[0, 0, 0, 0, 0].forEach(function (val, ind) {

    [0, 0, 0, 0, 0].forEach(function (val, index) {
        initialState['ALL_CONTACTS'].push({
            id: index + 1,
            group_id: ind + 1,
            firstName: 'First',
            lastName: 'Last ' + (ind + 1) + ' - ' + (index + 1),
            fullName: 'First Last ' + (ind + 1) + ' - ' + (index + 1),

            phone: [{ type: 'home 1', value: '123123123' }, { type: 'home 2', value: '123123123' }, { type: 'home 3', value: '123123123' }],

            email: [{ type: 'home 1', value: 'test@123.com' }, { type: 'home 2', value: 'test@123.com' }, { type: 'home 3', value: 'test@123.com' }],

            website: [{ type: 'home 1', value: 'web@123.com' }, { type: 'home 2', value: 'web@123.com' }, { type: 'home 3', value: 'web@123.com' }]

            // mobile: `123123123-${index + 1}`,
            // home: `123123123-${index + 1}`,
            // homePage: `www.123-${index + 1}.com`
        });
    });
});

var contactGroups = function contactGroups() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'ADD_GROUP':
            return state;

        case _contactsConstants.GET_GROUPS:
            if (action.data.loadAllContacts) {
                state.CURRENT_CONTACTS = state['ALL_CONTACTS'];
            }

            return state;

        case _contactsConstants.SELECT_CONTACT:
            var contact = state['ALL_CONTACTS'].find(function (contact) {
                return contact.id === parseInt(action.data.contact) && contact.group_id === parseInt(action.data.group);
            });
            state.selectedContact = contact;
            state.isEditMode = action.data.isEditMode;
            return state;

        case _contactsConstants.UPDATE_CONTACT:
            var index = state['ALL_CONTACTS'].findIndex(function (contact) {
                return contact.id === parseInt(action.data.contact) && contact.group_id === parseInt(action.data.group);
            });
            state['ALL_CONTACTS'][index] = action.data.contact;
            state['event'] = _contactsConstants.UPDATE_CONTACT_SUCCESS;
            return state;

        case _contactsConstants.SELECT_GROUP:
            state.CURRENT_CONTACTS = state['ALL_CONTACTS'].filter(function (contact) {
                return contact.group_id === parseInt(action.data);
            });
            state.selectedContact = {
                id: -1
            };
            return state;

        case _contactsConstants.CLEAR_CONTACT_EVENT:
            state.event = '';

        default:
            return state;
    }
};

exports.default = contactGroups;

/***/ }),

/***/ 278:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var initialState = {

    'phone': [],

    'email': [],

    'fax': [],

    'website': []

};

var contactGroups = function contactGroups() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    switch (action.type) {
        case 'ADD_FIELD_TYPE':
            return state;
        default:
            return state;
    }
};

exports.default = contactGroups;

/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(117);

var routes = {};

routes[_constants.GROUP_LIST] = {
    title: 'Contact Groups'
};

routes[_constants.GROUP_DETAILS] = {
    title: 'Contact Group'
};

routes[_constants.GROUP_CONTACT_DETAILS] = {
    title: 'View Contact Details'
};

routes[_constants.EDIT_CONTACT_DETAILS] = {
    title: 'Edit Contact Details'
};

exports.default = routes;

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _redux = __webpack_require__(62);

var _reactRedux = __webpack_require__(37);

var _reduxLittleRouter = __webpack_require__(26);

var _ContactsAppComponent = __webpack_require__(281);

var _ContactsAppComponent2 = _interopRequireDefault(_ContactsAppComponent);

var _contactsAction = __webpack_require__(118);

var _contactsAction2 = _interopRequireDefault(_contactsAction);

var _ContactGroupsComponent = __webpack_require__(282);

var _ContactGroupsComponent2 = _interopRequireDefault(_ContactGroupsComponent);

var _ContactsListComponent = __webpack_require__(283);

var _ContactsListComponent2 = _interopRequireDefault(_ContactsListComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
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

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        addGroup: function addGroup(group) {
            return dispatch(_contactsAction2.default.addGroup(group));
        },
        getGroups: function getGroups() {
            return dispatch(_contactsAction2.default.loadGroups());
        },
        selectGroup: function selectGroup(group) {
            return dispatch(_contactsAction2.default.selectGroupAndSetContacts);
        },
        selectContact: function selectContact(contact) {
            return (0, _redux.bindActionCreators)(_contactsAction2.default.selectContact);
        },
        addContact: function addContact() {
            return (0, _redux.bindActionCreators)(_contactsAction2.default.addContact, dispatch);
        },
        updateContact: function updateContact() {
            return (0, _redux.bindActionCreators)(_contactsAction2.default.updateContact, dispatch);
        },
        redirectToGroups: function redirectToGroups() {
            return dispatch((0, _reduxLittleRouter.replace)({ pathname: '/groups' }));
        },
        searchContacts: function searchContacts(route) {
            return dispatch((0, _reduxLittleRouter.replace)(route));
        }
    };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_ContactsAppComponent2.default);

/***/ }),

/***/ 281:
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: await is a reserved word (64:40)\n\n\u001b[0m \u001b[90m 62 | \u001b[39m        \u001b[90m// });\u001b[39m\n \u001b[90m 63 | \u001b[39m    \n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 64 | \u001b[39m        \u001b[36mconst\u001b[39m \u001b[33mContactDetailsComponent\u001b[39m \u001b[33m=\u001b[39m await \u001b[36mimport\u001b[39m(\u001b[32m'./ContactDetailsComponent.jsx'\u001b[39m)\u001b[33m;\u001b[39m\n \u001b[90m    | \u001b[39m                                        \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 65 | \u001b[39m        \u001b[36mthis\u001b[39m\u001b[33m.\u001b[39msetState({detailsComponent\u001b[33m:\u001b[39m \u001b[33m<\u001b[39m\u001b[33mContactDetailsComponent\u001b[39m updateContact\u001b[33m=\u001b[39m{params\u001b[33m.\u001b[39mupdateContact} isEditMode\u001b[33m=\u001b[39m{params\u001b[33m.\u001b[39misEditMode} contact\u001b[33m=\u001b[39m{params\u001b[33m.\u001b[39mselectedContact} \u001b[33m/\u001b[39m\u001b[33m>\u001b[39m})\u001b[33m;\u001b[39m\n \u001b[90m 66 | \u001b[39m    }\n \u001b[90m 67 | \u001b[39m\u001b[0m\n");

/***/ }),

/***/ 282:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reduxLittleRouter = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactGroupsComponent = function (_React$Component) {
    _inherits(ContactGroupsComponent, _React$Component);

    function ContactGroupsComponent() {
        _classCallCheck(this, ContactGroupsComponent);

        return _possibleConstructorReturn(this, (ContactGroupsComponent.__proto__ || Object.getPrototypeOf(ContactGroupsComponent)).apply(this, arguments));
    }

    _createClass(ContactGroupsComponent, [{
        key: 'render',

        // componentWillReceiveProps(nextProps, nextState) {
        //     console.log(nextProps);
        //     console.log(nextState);
        // }

        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'contacts-group' },
                _react2.default.createElement(
                    'h5',
                    { className: 'h5-heading' },
                    ' On This Mac '
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-contacts app-list' },
                    _react2.default.createElement(
                        _reduxLittleRouter.Link,
                        { className: 'list-group-item' + (this.props.selectedGroup == -1 ? ' active' : ''), href: '/groups' },
                        'All Contacts'
                    ),
                    this.props.groups.map(function (group) {
                        return _react2.default.createElement(
                            _reduxLittleRouter.Link,
                            { key: group.id, className: 'list-group-item' + (_this2.props.selectedGroup == group.id ? ' active' : ''), href: '/groups/' + group.id },
                            group.name
                        );
                    })
                )
            );
        }
    }]);

    return ContactGroupsComponent;
}(_react2.default.Component);

exports.default = ContactGroupsComponent;
;

/***/ }),

/***/ 283:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(10);

var _react2 = _interopRequireDefault(_react);

var _reduxLittleRouter = __webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContactsListComponent = function (_React$Component) {
    _inherits(ContactsListComponent, _React$Component);

    function ContactsListComponent() {
        _classCallCheck(this, ContactsListComponent);

        var _this = _possibleConstructorReturn(this, (ContactsListComponent.__proto__ || Object.getPrototypeOf(ContactsListComponent)).call(this));

        _this.state = {
            search: '',
            contacts: []
        };
        return _this;
    }

    _createClass(ContactsListComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.updateContacts(this.props);
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(props) {
            this.updateContacts(props);
        }
    }, {
        key: 'updateContacts',
        value: function updateContacts(props) {
            var searchTerm = props.location.query.search;

            if (searchTerm) {
                this.setStateForSearch(searchTerm);
            } else {
                this.setState({
                    contacts: props.contacts
                });
            }

            this.searchInput.focus();
        }
    }, {
        key: 'setStateForSearch',
        value: function setStateForSearch(searchTerm) {
            this.setState({
                search: searchTerm,
                contacts: this.props.contacts.filter(function (contact) {
                    return contact.fullName.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
                })
            });
        }
    }, {
        key: 'search',
        value: function search(event) {
            this.setStateForSearch(event.target.value);

            var query = {
                search: event.target.value
            };

            if (event.target.value === '') {
                query = {};
            }

            this.props.onSearch({
                pathname: this.props.location.pathname,
                query: query
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                'div',
                { className: 'contacts-list', id: 'search-contacts' },
                _react2.default.createElement(
                    'div',
                    { className: 'input-group' },
                    _react2.default.createElement(
                        'div',
                        { className: 'input-group-addon' },
                        _react2.default.createElement('span', { className: 'glyphicon glyphicon-search' })
                    ),
                    _react2.default.createElement('input', {
                        ref: function ref(input) {
                            _this2.searchInput = input;
                        },
                        value: this.state.search,
                        onChange: function onChange(event) {
                            return _this2.search(event);
                        },
                        type: 'text', className: 'form-control', placeholder: 'Search' })
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'list-group app-list' },
                    this.state.contacts.map(function (contact) {
                        return _react2.default.createElement(
                            _reduxLittleRouter.Link,
                            {
                                key: contact.id + ' - ' + contact.group_id,
                                className: 'list-group-item' + (_this2.props.selectedContact.id == contact.id ? ' active' : ''),
                                href: '/groups/' + contact.group_id + '/' + contact.id },
                            contact.firstName + ' ' + contact.lastName
                        );
                    })
                )
            );
        }
    }]);

    return ContactsListComponent;
}(_react2.default.Component);

exports.default = ContactsListComponent;
;

/***/ }),

/***/ 284:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 285:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var GET_GROUPS = exports.GET_GROUPS = 'GET_GROUPS';
var ADD_CONTACT = exports.ADD_CONTACT = 'ADD_CONTACT';
var UPDATE_CONTACT = exports.UPDATE_CONTACT = 'UPDATE_CONTACT';
var ADD_GROUP = exports.ADD_GROUP = 'ADD_GROUP';
var SELECT_GROUP = exports.SELECT_GROUP = 'SELECT_GROUP';
var SELECT_CONTACT = exports.SELECT_CONTACT = 'SELECT_CONTACT';

var UPDATE_CONTACT_SUCCESS = exports.UPDATE_CONTACT_SUCCESS = 'UPDATE_CONTACT_SUCCESS';
var CLEAR_CONTACT_EVENT = exports.CLEAR_CONTACT_EVENT = 'CLEAR_CONTACT_EVENT';

/***/ })

},[119]);