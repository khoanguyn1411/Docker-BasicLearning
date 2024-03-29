import { Suspense, FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

import { AppHeader } from './components/AppHeader';
import { AppLoadingSpinner } from './components/AppLoadingSpinner';
import { RestoreUserWrapper } from './components/RestoreUserWrapper';
import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { muiTheme } from './theme/mui-theme';
import './theme';

export const App: FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <BrowserRouter>
        <Box
          sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
          }}
        >
          <AppHeader />
          <RestoreUserWrapper>
            <Container component="main" sx={{ padding: 2, flexGrow: 1 }}>
              <Suspense fallback={<AppLoadingSpinner />}>
                <RootRouter />
              </Suspense>
            </Container>
          </RestoreUserWrapper>
          {/* App Footer. */}
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
);
