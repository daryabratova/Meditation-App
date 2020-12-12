import React, { useEffect } from 'react';

import { useAppContext } from '../../hooks/useAppContext';

import { getThemeByName } from '../../data/themes';

import { createTimer } from '../../helpers/timer';
import { cn } from '../../helpers/classname';
import { formatTime } from '../../helpers/formatTime';

import { Progress } from '../../components/Progress';

import './Timer.scss';

const timer = createTimer();

const timerClassName = cn('timer');

export const Timer = () => {
  const [appContextValue, setAppContextValue] = useAppContext();
  const { isActive, timeInterval, timePassed, theme } = appContextValue;

  const currentTheme = getThemeByName(theme);

  const handleClick = () => {
    setAppContextValue((appContextValue) => {
      return {
        ...appContextValue,
        isActive: !isActive,
      };
    });
  };

  useEffect(() => {
    timer.setTimeInterval(appContextValue.timeInterval);
  }, [appContextValue.timeInterval]);

  useEffect(() => {
    timer.setCallback((props) => {
      const { timePassed, isLast = false } = props;

      setAppContextValue((appContextValue) => {
        return {
          ...appContextValue,
          timePassed,
        };
      });

      if (isLast) {
        setAppContextValue((appContextValue) => {
          return {
            ...appContextValue,
            isActive: false,
            timePassed: 0,
          };
        });
      }
    });
  }, []);

  useEffect(() => {
    if (appContextValue.isActive) {
      timer.start();
    } else {
      timer.pause();
    }
  }, [appContextValue.isActive]);

  useEffect(() => {
    timer.reset();
  }, [appContextValue.timeInterval, appContextValue.theme]);

  useEffect(() => {
    if (appContextValue.timePassed === 0) {
      timer.reset();
    }
  }, [appContextValue.timePassed]);

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
