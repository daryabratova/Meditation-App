import React from 'react';

import { intervalList } from '../../data/intervals';

import { useAppContext } from '../../hooks/useAppContext';

import { cn } from '../../helpers/classname';

import './Intervals.scss';

const intervalsClassName = cn('intervals');

export const Intervals = () => {
  const [appContextValue, setAppContextValue] = useAppContext();

  return (
    <div className={intervalsClassName('layout')}>
      {intervalList.map((interval) => {
        const handleClick = () => {
          setAppContextValue({
            ...appContextValue,
            isActive: false,
            timeInterval: interval.value,
            timePassed: 0,
          });
        };

        return (
          <button
            key={interval.value}
            className={intervalsClassName('pick-interval')}
            onClick={handleClick}
          >
            {interval.name}
          </button>
        );
      })}
    </div>
  );
};
