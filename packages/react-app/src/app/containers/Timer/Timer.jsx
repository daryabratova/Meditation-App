import React, { useEffect } from 'react';

import { useAppState } from '../../hooks/useAppState';

import { getThemeByName } from '../../data/themes';

import { createTimer } from '../../helpers/timer';
import { cn } from '../../helpers/classname';
import { formatTime } from '../../helpers/formatTime';

import { Progress } from '../../components/Progress';

import './Timer.scss';

const timer = createTimer();

const timerClassName = cn('timer');

export const Timer = () => {
  const [appState, setAppState] = useAppState();
  const { isActive, timeInterval, timePassed, theme } = appState;

  const currentTheme = getThemeByName(theme);

  const handleClick = () => {
    setAppState((appState) => {
      return {
        ...appState,
        isActive: !isActive,
      };
    });
  };

  useEffect(() => {
    timer.setTimeInterval(appState.timeInterval);
  }, [appState.timeInterval]);

  useEffect(() => {
    timer.setCallback((props) => {
      const { timePassed, isLast = false } = props;

      setAppState((appState) => {
        return {
          ...appState,
          timePassed,
        };
      });

      if (isLast) {
        setAppState((appState) => {
          return {
            ...appState,
            isActive: false,
            timePassed: 0,
          };
        });
      }
    });
  }, []);

  useEffect(() => {
    if (appState.isActive) {
      timer.start();
    } else {
      timer.pause();
    }
  }, [appState.isActive]);

  useEffect(() => {
    timer.reset();
  }, [appState.timeInterval, appState.theme]);

  useEffect(() => {
    if (appState.timePassed === 0) {
      timer.reset();
    }
  }, [appState.timePassed]);

  return (
    <div className={timerClassName('layout')}>
      <Progress value={timePassed / timeInterval} color={currentTheme.color}>
        <button
          className={timerClassName('switcher', { active: isActive })}
          onClick={handleClick}
          autoFocus
        />
      </Progress>
      <div className={timerClassName('time')}>{formatTime(timeInterval - timePassed)}</div>
    </div>
  );
};
