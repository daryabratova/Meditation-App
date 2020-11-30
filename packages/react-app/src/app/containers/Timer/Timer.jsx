import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';

import { getThemeByName } from '../../data/themes';

import { cn } from '../../helpers/classname';
import { formatTime } from '../../helpers/formatTime';

import { Progress } from '../../components/Progress';

import './Timer.scss';

const timerClassName = cn('timer');

export const Timer = () => {
  const [appContextValue, setAppContextValue] = useAppContext();
  const { isActive, timeInterval, elapsedTime, theme } = appContextValue;

  const currentTheme = getThemeByName(theme);

  const handleClick = () => {
    setAppContextValue({
      ...appContextValue,
      isActive: !isActive,
    });
  };

  return (
    <div className={timerClassName('layout')}>
      <Progress value={0.5} color={currentTheme.color}>
        <button
          className={timerClassName('switcher', { active: isActive })}
          onClick={handleClick}
          autoFocus
        />
      </Progress>
      <div className={timerClassName('time')}>{formatTime(timeInterval - elapsedTime)}</div>
    </div>
  );
};
