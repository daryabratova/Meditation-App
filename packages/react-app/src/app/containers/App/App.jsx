import React, { useState } from 'react';
import { appContext } from '../../contexts/appContext';

import { intervalList } from '../../data/intervals';
import { themeList } from '../../data/themes';

import { cn } from '../../helpers/classname';

import { Audio } from '../Audio';
import { Video } from '../Video';
import { Intervals } from '../Intervals';
import { Timer } from '../Timer';
import { Themes } from '../Themes';

import './App.scss';

const { Provider: AppContextProvider } = appContext;

const [firstInterval] = intervalList;
const [firstTheme] = themeList;

const appClassName = cn('app');

export const App = () => {
  const appContextState = useState({
    isActive: false,
    timeInterval: firstInterval.value,
    timePassed: 0,
    theme: firstTheme.name,
  });

  return (
    <AppContextProvider value={appContextState}>
      <Audio />
      <Video />
      <div className={appClassName('layout')}>
        <Intervals />
        <Timer />
        <Themes />
      </div>
    </AppContextProvider>
  );
};
