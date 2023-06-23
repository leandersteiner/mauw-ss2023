import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Overview } from './components/layout/Overview';
import { PathContextProvider } from './context/PathContext';
import { HomePage } from './views/home/HomePage';
import { Profile } from './views/user/Profile';
import { BoardView } from './views/board/BoardView';
import { Organisations } from './views/organisations/Organisations';
import { Projects } from './views/projects/Projects';
import { NotFound } from './views/NotFound';
import { LoginForm } from './components/auth/LoginForm';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { Logout } from './components/auth/Logout';
import 'easymde/dist/easymde.min.css';
import 'highlight.js/styles/a11y-dark.css';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: true,
      useErrorBoundary: false
    }
  }
});

export const App: React.FC = () => {
  return (
    <PathContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Overview />}>
              <Route path='' element={<Navigate to='/home' />} />
              <Route path='home' element={<HomePage />} />
              <Route
                path='profile'
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path='projects'
                element={
                  <ProtectedRoute>
                    <Projects />
                  </ProtectedRoute>
                }
              />
              <Route
                path='orgs'
                element={
                  <ProtectedRoute>
                    <Organisations />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='/auth' element={<Overview />}>
              <Route path='login' element={<LoginForm />} />
              <Route path='register' element={<RegistrationForm />} />
              <Route path='logout' element={<Logout />} />
            </Route>
            <Route path='' element={<Overview />}>
              <Route
                path='/orgs/:orgId/teams/:teamId/projects/:projectId/board'
                element={
                  <ProtectedRoute>
                    <BoardView />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path='*' element={<Overview />}>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </PathContextProvider>
  );
};
