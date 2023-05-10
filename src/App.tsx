import React from 'react';
import { DatePicker } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PathContextProvider } from './context/PathContext';
import { Overview } from './components/app-layout/Overview';

export const App: React.FC = () => {
  return (
    <PathContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Overview />} />
          <Route path='/home/:userId' element={<Overview />}>
            <Route path='boards' element={<DatePicker />} />
            <Route path='settings' element={<DatePicker />} />
            <Route path='create-project' element={<DatePicker />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PathContextProvider>
  );
};
