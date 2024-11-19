import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Box } from '@mui/material';

import PrivateRoutes from './PrivateRoutes';

const Routers = () => {
  return (
    <Box>
      <BrowserRouter basename={'/'}>
        <Suspense fallback={<>Loading...</>}>
          <Routes>
            <Route path={`/*`} element={<PrivateRoutes />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Box>
  );
};

export default Routers;
