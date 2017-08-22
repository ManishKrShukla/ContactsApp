import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { push } from 'redux-little-router';

import store from './reducers'
import AppComponent from './components/AppComponent.jsx'
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import '../css/App.css';

ReactDom.render(
    <Provider store={store}>
        <AppComponent />
    </Provider>

, document.getElementById('root'));

push('/groups');