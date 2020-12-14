import React, { useRef, useEffect } from 'react';
import { useAppState } from '../../hooks/useAppState';
import { getThemeByName } from '../../data/themes';

export const Audio = () => {
  const [appState] = useAppState();
  const { isActive, theme } = appState;

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
