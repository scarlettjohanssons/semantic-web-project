import React from 'react';
import './App.css';
import { useAppTheme } from "./themes/main";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Routers from './routes';

function App() {
  const theme = useAppTheme();

  return theme ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routers />
    </ThemeProvider>
  ) : null;
}

export default App;
