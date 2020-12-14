import React, { useRef, useEffect } from 'react';

import { useAppState } from '../../hooks/useAppState';
import { getThemeByName } from '../../data/themes';

import './Video.scss';

export const Video = () => {
  const [appState] = useAppState();
  const videoRef = useRef(null);

  const { isActive, theme } = appState;
  const currentTheme = getThemeByName(theme);

  useEffect(() => {
    videoRef.current.load();
  }, [currentTheme.video]);

  useEffect(() => {
    if (isActive) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isActive]);

  return (
    <video ref={videoRef} className="video" loop>
      <source src={currentTheme.video} type="video/mp4" />
    </video>
  );
};
