import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getThemeByName } from '../../data/themes';
import { getActive, getTheme } from '../../redux/selectors';

export const Audio = () => {
  const isActive = useSelector(getActive);
  const theme = useSelector(getTheme);

  const currentTheme = getThemeByName(theme);

  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current.load();
  }, [currentTheme.audio]);

  useEffect(() => {
    if (isActive) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isActive]);

  return (
    <audio ref={audioRef}>
      <source src={currentTheme.audio} />
    </audio>
  );
};
