import React, { lazy } from 'react';

import layouts from '../../layouts/index';
import { book } from '../../routes/book';
const HomePage = lazy(()=>import('./HomePage'));
const CityPage = lazy(()=>import('./CityPage'));

export const privateRoutes: any[] = [
  ...[
    {
      path: `${book.home}`,
      Component: <HomePage />,
      Layout: layouts.AppLayout,
      layoutProps: {},
    },
    {
      path: `${book.city}/:id`,
      Component: <CityPage />,
      Layout: layouts.AppLayout,
      layoutProps: {},
    },
  ],
];
