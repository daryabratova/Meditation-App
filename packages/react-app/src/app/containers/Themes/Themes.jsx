import React from 'react';

import { useAppState } from '../../hooks/useAppState';
import { themeList } from '../../data/themes';
import { cn } from '../../helpers/classname';

import './Themes.scss';

const themesClassName = cn('themes');

export const Themes = () => {
  const [, setAppState] = useAppState();

  return (
    <div className={themesClassName('layout')}>
      {themeList.map((theme) => {
        const handleClick = () => {
          setAppState((appState) => {
            return {
              ...appState,
              isActive: false,
              timePassed: 0,
              theme: theme.name,
            };
          });
        };

        return (
          <button
            key={theme.name}
            className={themesClassName('pick-theme')}
            style={{ backgroundColor: theme.color, backgroundImage: `url(${theme.icon})` }}
            onClick={handleClick}
          />
        );
      })}
    </div>
  );
};
