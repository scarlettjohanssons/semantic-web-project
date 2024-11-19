import React from 'react';

import { PaletteMode, useMediaQuery } from '@mui/material';
import { createTheme, ThemeOptions } from '@mui/material/styles';

import { breakpoints } from './breakpoints';
import { MuiButton } from './components/MuiButtonBase';
import { MuiSvgIcon } from './components/MuiSVGIcon';
import { MuiTypography } from './components/MuiTypography';
import { mixins } from './mixins';
import { dark } from './palette/dark';
import { typography } from './typography';
import { MuiOutlinedInput } from './components/MuiOutlinedInput';
import { MuiIconButton } from './components/MuiIconButton';
import { MuiInputLabel } from './components/MuiInputLabel';
import { MuiFormHelperText } from './components/MuiFormHelperText';
import { MuiInput } from './components/MuiInput';

export const themeOptions: Partial<ThemeOptions> = {
  mixins,
  breakpoints,
  palette: dark,
  typography,
  components: {
    ...MuiTypography,
    ...MuiButton,
    ...MuiSvgIcon,
    ...MuiOutlinedInput,
    ...MuiIconButton,
    ...MuiInputLabel,
    ...MuiFormHelperText,
    ...MuiInput,
  },
};

export const getDesignTokens = (mode: PaletteMode) => ({
  ...themeOptions,
  palette: {
    mode,
    ...dark,
  },
  components: {
    ...themeOptions.components,
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: dark.common?.surface?.['surface 5'],
        },
      },
    },
  },
});
export const useAppTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return React.useMemo(
    () => createTheme(getDesignTokens('dark')),
    [prefersDarkMode],
  );
};
