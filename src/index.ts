import 'core-js/es6';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');
import 'ts-helpers';

import {bootstrap} from '@angular/platform-browser-dynamic';
import {createStore, applyMiddleware} from 'redux';
import {provider} from 'ng2-redux';
import {Iterable} from 'immutable';
import rootReducer from './reducers';

const thunk = require('redux-thunk').default;

const logger = require('redux-logger')({
  level: 'info',
  collapsed: true,
  stateTransformer: (state) => {
    let newState = {};
    for (let i of Object.keys(state)) {
      newState[i] = Iterable.isIterable(state[i]) ? state[i].toJS() : state[i];
    }
    return newState;
  }
});

const store = applyMiddleware(thunk, logger)(createStore)(rootReducer, {});

import {RtbmMyApp} from './containers/my-app';

bootstrap(RtbmMyApp, [
  provider(store)
]);
