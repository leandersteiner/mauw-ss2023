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
        <Route path='/home' element={<Overview />}>
          <Route path='overview' element={<DatePicker />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
