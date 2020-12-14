import React, { useState } from 'react';
import { appState } from '../../contexts/appState';

import { intervalList } from '../../data/intervals';
import { themeList } from '../../data/themes';

import { cn } from '../../helpers/classname';

import { Audio } from '../Audio';
import { Video } from '../Video';
import { Intervals } from '../Intervals';
import { Timer } from '../Timer';
import { Themes } from '../Themes';

import './App.scss';

const { Provider: AppStateProvider } = appState;

const [firstInterval] = intervalList;
const [firstTheme] = themeList;

const appClassName = cn('app');

export const App = () => {
  const appStateValue = useState({
    isActive: false,
    timeInterval: firstInterval.value,
    timePassed: 0,
    theme: firstTheme.name,
  });

  return (
    <AppStateProvider value={appStateValue}>
      <Audio />
      <Video />
      <div className={appClassName('layout')}>
        <Intervals />
        <Timer />
        <Themes />
      </div>
    </AppStateProvider>
  );
};
