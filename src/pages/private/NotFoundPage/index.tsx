import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import { styles } from './styles';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Box sx={styles.root}>
      <Typography variant={'h4'} color={'text.primary'}>
        Oops!
      </Typography>
      <Typography
        variant={'body1'}
        textAlign={'center'}
        mt={'20px'}
        color={'text.secondary'}>
        {`We're sorry, but it seems like the page`}
      </Typography>
      <Typography
        variant={'body1'}
        textAlign={'center'}
        mb={'20px'}
        color={'text.secondary'}>
        {`you're looking for has taken an
          unexpected detour.`}
      </Typography>
      <Button variant={'primary'} onClick={handleGoBack}>
        <Typography variant={'button'} color={'primary.contrastText'}>
          Go Back
        </Typography>
      </Button>
    </Box>
  );
};

export default NotFoundPage;
