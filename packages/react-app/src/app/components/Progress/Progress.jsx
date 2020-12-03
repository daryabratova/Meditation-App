import React from 'react';

import { cn } from '../../helpers/classname';

import './Progress.scss';

const progressClassName = cn('progress');

export const Progress = (props) => {
  const { value, color, children } = props;

  const canvasSize = 453;
  const radius = 216.5;
  const thickness = 20;

  const baseLineLength = 2 * Math.PI * radius;
  const movingLineLength = baseLineLength - value * baseLineLength;

  return (
    <div className={progressClassName('layout')}>
      <svg
        className={progressClassName('base-line')}
        width={canvasSize}
        height={canvasSize}
        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={canvasSize / 2}
          cy={canvasSize / 2}
          r={radius}
          fill="none"
          strokeWidth={thickness}
          stroke="#fff"
        />
      </svg>
      <svg
        className={progressClassName('moving-line')}
        width={canvasSize}
        height={canvasSize}
        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx={canvasSize / 2}
          cy={canvasSize / 2}
          r={radius}
          fill="none"
          strokeDasharray={baseLineLength}
          strokeDashoffset={movingLineLength}
          strokeWidth={thickness}
          stroke={color}
        />
      </svg>
      <div className={progressClassName('content')}>{children}</div>
    </div>
  );
};
