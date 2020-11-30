import { useContext } from 'react';
import { appContext } from '../contexts/appContext';

export const useAppContext = () => {
  return useContext(appContext);
};
