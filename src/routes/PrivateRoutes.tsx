import React, { useEffect } from 'react';
import {
  Navigate,
  Route,
  Routes, useLocation,
} from 'react-router-dom';

import { privateRoutes } from '../pages/private/routes';
import NotFoundPage from '../pages/private/NotFoundPage';
import NotFoundLayout from '../layouts/NotFoundLayout';
import { book } from './book';
import AppLayout from '../layouts/AppLayout';

const PrivateRoutes = () => {
  const location = useLocation();

  useEffect(() => {
  }, []);

  return (
    <Routes>
      {privateRoutes.map(({ path, Component, Layout, layoutProps }) => (
        <Route element={<Layout {...layoutProps} />} key={path}>
          <Route path={path} element={Component} />
        </Route>
      ))}
      {Object.values(book).some((item) => item === location.pathname) ? (
        <Route element={<AppLayout />}>
          <Route path={'/*'} element={<Navigate replace to={book.home} />} />
        </Route>
      ) : (
        <Route element={<NotFoundLayout />}>
          <Route path={'/*'} element={<NotFoundPage />} />
        </Route>
      )}
    </Routes>
  );
};

export default PrivateRoutes;
