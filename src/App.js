import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import HomePage from './components/HomePage';
import ArgumentPage from './components/ArgumentPage';
import NewArgumentPage from './components/NewArgumentPage';
import GlobalStyles from './GlobalStyles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0', // Material purple
    },
    secondary: {
      main: '#f50057', // Example secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/argument/:id" element={<ArgumentPage />} />
          <Route path="/new-argument" element={<NewArgumentPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
