import React from 'react';
import { DatePicker } from 'antd';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Overview } from './components/appLayout/Overview';
import { PathContextProvider } from './context/PathContext';

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
