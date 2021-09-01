import React, {createContext, useState, useEffect, useReducer} from 'react';
import {useAnimation} from '../hooks/useAnimation';

type AppContextProps = {
  direction: string;
  getDirection: (currentOffset: any) => void;
  show: number;
  opacity: any;
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [direction, setDirection] = useState('up');
  const [show, setShow] = useState(55);
  const [offset, setOffset] = useState(0);
  const {opacity, fadeIn, fadeOut} = useAnimation();

  const getDirection = (currentOffset: any) => {
    if (currentOffset > 30) {
      if (currentOffset > offset) {
        setDirection('down');
        fadeOut();
      } else {
        setDirection('up');
        fadeIn();
      }
    }

    setOffset(currentOffset);
  };

  return (
    <AppContext.Provider value={{direction, getDirection, show, opacity}}>
      {children}
    </AppContext.Provider>
  );
};
