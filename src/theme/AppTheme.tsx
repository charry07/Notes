
import { CssBaseline, ThemeProvider } from '@mui/material';
import { GreenTheme } from './GreenTheme';
import { purpleTheme  } from './purpleTheme';
import { yellowTheme } from './yellowTheme';

export const AppTheme = ({ children }: any) => {
  return (
    <ThemeProvider theme={purpleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
