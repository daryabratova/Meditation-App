import React, { useRef, useEffect } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { getThemeByName } from '../../data/themes';

export const Audio = () => {
  const [appContextValue] = useAppContext();
  const { isActive, theme } = appContextValue;

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
