import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPages from '../pages/admin/adminPages';
import ViewPages from '../pages/view/viewPages';

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminPages />} />
        <Route path="/detail" element={<ViewPages />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
