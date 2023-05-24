import React from 'react';
import { DatePicker } from 'antd';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Overview } from './components/appLayout/Overview';
import { PathContextProvider } from './context/PathContext';
import { StartPage } from './components/start/StartPage';

export const App: React.FC = () => {
  return (
    <PathContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home/start' />} />
          <Route path='/login' element={<Overview />} />
          <Route path='/home' element={<Overview />}>
            <Route path='start' element={<StartPage />} />
            <Route path='boards' element={<DatePicker />} />
            <Route path='settings' element={<DatePicker />} />
            <Route path='create-project' element={<DatePicker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PathContextProvider>
  );
};
