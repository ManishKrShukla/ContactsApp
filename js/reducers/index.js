import { combineReducers } from 'redux'
import { routerForBrowser } from 'redux-little-router';
import { createStore, compose, applyMiddleware } from 'redux';
import { initializeCurrentLocation } from 'redux-little-router';

import locationMiddleWare from '../middlewares/location-tracker';
import contactGroups from './groups';
import contacts from './contacts';
import master from './master';
import routes from '../routes';

const {reducer, middleware, enhancer} = routerForBrowser({
  routes
});

const contactsApp = combineReducers({
    router: reducer,
    contactGroups,
    contacts,
    master
});

const store = createStore(
  contactsApp,
  compose(
    enhancer,
    applyMiddleware(middleware, locationMiddleWare)
  )
);  

const initialLocation = store.getState().router;

if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

export default store;