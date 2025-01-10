import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './purpleTheme';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export const AppTheme = ({ children }: Props) => {
    return (
        <ThemeProvider theme={purpleTheme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}