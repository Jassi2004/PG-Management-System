// src/context/ColorModeContext.jsx
import { createContext, useState, useMemo, useContext } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { grey, blueGrey } from '@mui/material/colors';

const ColorModeContext = createContext();

export const ColorModeProvider = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                background: {
                  default: '#DEE4E7',
                  paper: '#ffffff',
                },
                text: {
                  primary: '#222222',
                },
              }
            : {
                background: {
                  default: '#222222',
                  paper: blueGrey[800],
                },
                text: {
                  primary: '#ffffff',
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
