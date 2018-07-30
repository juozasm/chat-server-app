import React from 'react';
import ReactDOM from 'react-dom';
import './sass/main.scss';
import App from './App';
import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import errorsReducer from './reducers/errorsReducer';
import authReducer from './reducers/authReducer';
import chatReducer from './reducers/chatReducer';
import usersReducer from './reducers/usersReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    errors:errorsReducer,
    auth:authReducer,
    chat:chatReducer,
    users:usersReducer
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}><App /></Provider>
    , document.getElementById('root'));
registerServiceWorker();


