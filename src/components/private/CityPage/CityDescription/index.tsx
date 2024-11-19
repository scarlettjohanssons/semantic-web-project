import React from 'react';

import { Box, Typography } from '@mui/material';

import { styles } from './styles';

type CityDescriptionProps = {
  city: {
    "date_of_creation": string,
    "description": string,
    "id": number,
    "image": string,
    "name": string,
    "population": number,
    "uri": string,
    "history": string,
  };
};

const CityDescription: React.FC<CityDescriptionProps> = ({ city }) => {
  return (
    <Box sx={styles.root}>
      <Box sx={styles.wrapper}>
        <Box component={'img'} src={city.image} sx={styles.image} />
        <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
          <Typography>Name - {city.name}</Typography>
          <Typography>Population - {city.population}</Typography>
        </Box>
      </Box>
      <Typography mt={'30px'}>{city.description}</Typography>
      <Typography mt={'30px'}>{city.history}</Typography>
    </Box>
  );
};

export default CityDescription;
