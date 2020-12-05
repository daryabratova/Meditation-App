import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { getThemeByName } from '../../data/themes';

import { createTimer } from '../../helpers/timer';
import { cn } from '../../helpers/classname';
import { formatTime } from '../../helpers/formatTime';

import { getActive, getTimeInterval, getTimePassed, getTheme } from '../../redux/selectors';
import { toggleTimer, setTimePassed, resetTimer } from '../../redux/actions';

import { Progress } from '../../components/Progress';

import './Timer.scss';

const timer = createTimer();

const timerClassName = cn('timer');

export const Timer = () => {
  const isActive = useSelector(getActive);
  const timeInterval = useSelector(getTimeInterval);
  const timePassed = useSelector(getTimePassed);
  const theme = useSelector(getTheme);

  const dispatch = useDispatch();

  const currentTheme = getThemeByName(theme);

  const handleClick = () => {
    dispatch(toggleTimer());
  };

  useEffect(() => {
    timer.setTimeInterval(timeInterval);
  }, [timeInterval]);

  useEffect(() => {
    timer.setCallback((props) => {
      const { timePassed, isLast = false } = props;

      dispatch(setTimePassed(timePassed));

      if (isLast) {
        dispatch(resetTimer());
      }
    });
  }, []);

  useEffect(() => {
    if (isActive) {
      timer.start();
    } else {
      timer.pause();
    }
  }, [isActive]);

  useEffect(() => {
    if (timePassed === 0) {
      timer.reset();
    }
  }, [timePassed]);

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
