import React from 'react';
import { DatePicker } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Overview } from './components/appLayout/Overview';
import { PathContextProvider } from './context/PathContext';
import { HomePage } from './components/start/HomePage';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { SecurityContextProvider } from './context/SecurityContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      useErrorBoundary: true
    }
  }
});

export const App: React.FC = () => {
  return (
    <SecurityContextProvider>
      <PathContextProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Navigate to='/home' />} />
              <Route path='/home' element={<Overview />}>
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route index element={<HomePage />} />
                <Route path='boards' element={<DatePicker />} />
                <Route path='settings' element={<DatePicker />} />
                <Route path='create-project' element={<DatePicker />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </PathContextProvider>
    </SecurityContextProvider>
  );
};
