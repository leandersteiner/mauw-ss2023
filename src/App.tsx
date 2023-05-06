import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { DatePicker } from 'antd';
import { Overview } from './components/appLayout/Overview';

const root = createRoot(document.getElementById('root') as Element);
root.render(
  <React.StrictMode>
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
  </React.StrictMode>
);
