import { createReducer } from 'redux-act';

import { intervalList } from '../data/intervals';
import { themeList } from '../data/themes';

import * as actions from './actions';

const [firstInterval] = intervalList;
const [firstTheme] = themeList;

const defaultState = {
  isActive: false,
  timeInterval: firstInterval.value,
  timePassed: 0,
  theme: firstTheme.name,
};

export const reducer = createReducer((on) => {
  on(actions.setTimeInterval, (state, payload) => {
    return {
      ...state,
      isActive: false,
      timeInterval: payload,
      timePassed: 0,
    };
  });

  on(actions.toggleTimer, (state) => {
    return {
      ...state,
      isActive: !state.isActive,
    };
  });

  on(actions.setTimePassed, (state, payload) => {
    return {
      ...state,
      timePassed: payload,
    };
  });

  on(actions.resetTimer, (state) => {
    return {
      ...state,
      isActive: false,
      timePassed: 0,
    };
  });

  on(actions.setTheme, (state, payload) => {
    return {
      ...state,
      isActive: false,
      timePassed: 0,
      theme: payload,
    };
  });
}, defaultState);
