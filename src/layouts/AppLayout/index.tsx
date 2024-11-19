import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';

import { styles } from './styles';

export type AppLayoutProps = {};

const AppLayout: React.FC<AppLayoutProps> = () => {

  return (
    <Box sx={styles.root}>
      <Suspense fallback={<>Loading...</>}>
        <Box sx={styles.wrapper}>
          <Outlet />
        </Box>
      </Suspense>
    </Box>
  );
};

export default AppLayout;
