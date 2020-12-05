import React from 'react';

import { useDispatch } from 'react-redux';

import { intervalList } from '../../data/intervals';

import { cn } from '../../helpers/classname';

import { setTimeInterval } from '../../redux/actions';

import './Intervals.scss';

const intervalsClassName = cn('intervals');

export const Intervals = () => {
  const dispatch = useDispatch();

  return (
    <div className={intervalsClassName('layout')}>
      {intervalList.map((interval) => {
        const handleClick = () => {
          dispatch(setTimeInterval(interval.value));
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
