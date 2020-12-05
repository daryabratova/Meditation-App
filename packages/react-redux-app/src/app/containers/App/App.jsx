import React from 'react';
import { Provider } from 'react-redux';

import { cn } from '../../helpers/classname';

import { store } from '../../redux/store';

import { Audio } from '../Audio';
import { Video } from '../Video';
import { Intervals } from '../Intervals';
import { Timer } from '../Timer';
import { Themes } from '../Themes';

import './App.scss';

const appClassName = cn('app');

export const App = () => {
  return (
    <Provider store={store}>
      <Audio />
      <Video />
      <div className={appClassName('layout')}>
        <Intervals />
        <Timer />
        <Themes />
      </div>
    </Provider>
  );
};
