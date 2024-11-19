import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { styles } from './styles';

export type NotFoundLayoutProps = {};

const NotFoundLayout: React.FC<NotFoundLayoutProps> = () => {
  return (
    <Box sx={styles.root}>
      <Suspense fallback={<>Loading...</>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default NotFoundLayout;
