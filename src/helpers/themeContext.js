import { createContext, useState } from 'react';
import { themes } from '../objects/themes';

export const themeContext = createContext({});

export const themeProvider = (props) => {
  const [theme, setTheme] = /* useState */(themes.light);

  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {props.children}
    </themeContext.Provider>
  );
}