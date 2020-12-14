import { useContext } from 'react';
import { appState } from '../contexts/appState';

export const useAppState = () => {
  return useContext(appState);
};
