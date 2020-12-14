import React from 'react';

import { intervalList } from '../../data/intervals';

import { useAppState } from '../../hooks/useAppState';

import { cn } from '../../helpers/classname';

import './Intervals.scss';

const intervalsClassName = cn('intervals');

export const Intervals = () => {
  const [, setAppState] = useAppState();

  return (
    <div className={intervalsClassName('layout')}>
      {intervalList.map((interval) => {
        const handleClick = () => {
          setAppState((appState) => {
            return {
              ...appState,
              isActive: false,
              timeInterval: interval.value,
              timePassed: 0,
            };
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
