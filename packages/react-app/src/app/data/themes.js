import rainThemeAudio from '../assets/sounds/rain.mp3';
import rainThemeVideo from '../assets/videos/rain.mp4';
import rainIcon from '../assets/images/rain.svg';

import sunThemeAudio from '../assets/sounds/beach.mp3';
import sunThemeVideo from '../assets/videos/beach.mp4';
import sunIcon from '../assets/images/sun.svg';

export const themeList = [
  {
    name: 'rain',
    audio: rainThemeAudio,
    video: rainThemeVideo,
    color: '#c6cdff',
    icon: rainIcon,
  },

  {
    name: 'sun',
    audio: sunThemeAudio,
    video: sunThemeVideo,
    color: '#ffd180',
    icon: sunIcon,
  },
];

export const getThemeByName = (name) => {
  return themeList.find((theme) => theme.name === name);
};
