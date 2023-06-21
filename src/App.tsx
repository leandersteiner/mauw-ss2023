import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Overview } from './components/layout/Overview';
import { PathContextProvider } from './context/PathContext';
import { HomePage } from './views/home/HomePage';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { LoginForm } from './components/auth/LoginForm';
import { Logout } from './components/auth/Logout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Profile } from './views/user/Profile';
import { BoardView } from './views/board/BoardView';
import { Settings } from './views/settings/Settings';
import { Organisations } from './views/organisations/Organisations';
import { Projects } from './views/projects/Projects';
import { NotFound } from './views/NotFound';
import 'easymde/dist/easymde.min.css';
import 'highlight.js/styles/a11y-light.css';

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
              <Route path='login' element={<LoginForm />} />
              <Route path='register' element={<RegistrationForm />} />
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
            </Route>
            <Route path='/orgs/:orgId/teams/:teamId/projects/:projectId' element={<Overview />}>
              <Route path='board' element={<BoardView />} />
              <Route path='projects' element={<Projects />} />
              <Route path='projects/:projectId/boards' element={<Settings />} />
              <Route path='settings' element={<Settings />} />
              <Route path='orgs' element={<Organisations />} />
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
