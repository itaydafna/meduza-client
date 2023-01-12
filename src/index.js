import * as React from 'react';
import { createRoot } from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import App from './components/App';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import theme from './theme';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <App />
        </ThemeProvider>
        <ReactQueryDevtools/>
    </QueryClientProvider>
);
