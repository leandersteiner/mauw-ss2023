import React from 'react';
import { DatePicker } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Overview } from './components/layout/Overview';
import { PathContextProvider } from './context/PathContext';
import { HomePage } from './components/start/HomePage';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { Logout } from './components/auth/Logout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Profile } from './components/user/Profile';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: true,
      useErrorBoundary: true
    }
  }
});

export const App: React.FC = () => {
  return (
    <PathContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='home' />} />
            <Route path='/auth' element={<Overview />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path='/user' element={<Overview />}>
              <Route path='' element={<Profile />} />
            </Route>
            <Route path='/home' element={<Overview />}>
              <Route
                index
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route path='boards' element={<DatePicker />} />
              <Route path='settings' element={<DatePicker />} />
              <Route path='create-project' element={<DatePicker />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PathContextProvider>
  );
};
