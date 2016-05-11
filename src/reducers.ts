import {combineReducers} from 'redux';
import {fromJS} from 'immutable';

const INITIAL_STATE = fromJS({
  sampleData: 'BAR'
});

function sampleReducer(state = INITIAL_STATE, action: any = { type: '' }) {
  switch (action.type) {
    case 'App/FOO':
      return state.merge({ sampleData: action.payload });

    default:
      return state;
  }
}

export default combineReducers({ sampleReducer });
