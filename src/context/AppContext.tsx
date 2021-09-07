import React, {createContext, useState, useEffect, useReducer} from 'react';
import {useAnimation} from '../hooks/useAnimation';

type AppContextProps = {
  getDirection: (currentOffset: any) => void;
  show: number;
  opacity: any;
  position: any;
};

export const AppContext = createContext({} as AppContextProps);

export const AppProvider = ({children}: any) => {
  const [show, setShow] = useState(55);
  const [offset, setOffset] = useState(0);
  const {opacity, fadeIn, fadeOut} = useAnimation();
  const {position, startMovingPosition, downSearch} = useAnimation();

  const getDirection = (currentOffset: any) => {
    // console.log(currentOffset);

    if (currentOffset > 30) {
      if (currentOffset > offset) {
        fadeOut();
      }

      if (currentOffset < offset) {
        fadeIn();
      }

      setOffset(currentOffset);
    }
  };

  return (
    <AppContext.Provider value={{getDirection, show, opacity, position}}>
      {children}
    </AppContext.Provider>
  );
};
