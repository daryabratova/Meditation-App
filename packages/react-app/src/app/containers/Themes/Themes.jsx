import React from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { themeList } from '../../data/themes';
import { cn } from '../../helpers/classname';

import './Themes.scss';

const themesClassName = cn('themes');

export const Themes = () => {
  const [appContextValue, setAppContextValue] = useAppContext();

  return (
    <div className={themesClassName('layout')}>
      {themeList.map((theme) => {
        const handleClick = () => {
          setAppContextValue({
            ...appContextValue,
            isActive: false,
            elapsedTime: 0,
            theme: theme.name,
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
