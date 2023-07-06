import { theme } from '#/theme/theme';
import { router as rootRouter } from '#core/navigation/routers/root';
import '#styles/App.css';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={rootRouter} />
    </ThemeProvider>
  );
}

export default App;
