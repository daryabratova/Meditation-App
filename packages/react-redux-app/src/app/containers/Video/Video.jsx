import React, { useRef, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { getThemeByName } from '../../data/themes';
import { getActive, getTheme } from '../../redux/selectors';

import './Video.scss';

export const Video = () => {
  const videoRef = useRef(null);

  const isActive = useSelector(getActive);
  const theme = useSelector(getTheme);

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
