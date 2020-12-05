import React from 'react';

import { useDispatch } from 'react-redux';

import { themeList } from '../../data/themes';
import { cn } from '../../helpers/classname';

import { setTheme } from '../../redux/actions';

import './Themes.scss';

const themesClassName = cn('themes');

export const Themes = () => {
  const dispatch = useDispatch();

  return (
    <div className={themesClassName('layout')}>
      {themeList.map((theme) => {
        const handleClick = () => {
          dispatch(setTheme(theme.name));
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
