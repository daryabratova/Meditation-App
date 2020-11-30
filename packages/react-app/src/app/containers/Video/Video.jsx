import React, { useRef, useEffect } from 'react';

import { useAppContext } from '../../hooks/useAppContext';
import { getThemeByName } from '../../data/themes';

import './Video.scss';

export const Video = () => {
  const [appContextValue] = useAppContext();
  const videoRef = useRef(null);

  const { isActive, theme } = appContextValue;
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
