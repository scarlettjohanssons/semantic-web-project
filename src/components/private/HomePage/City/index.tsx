import React from 'react';

import { Box, Typography } from '@mui/material';

import { styles } from './styles';
import { useNavigate } from "react-router-dom";
import { book } from "../../../../routes/book";

type CityProps = {
  city: {
    "date_of_creation": string,
    "id": number,
    "image": string,
    "name": string,
    "population": number
  };
};

const City: React.FC<CityProps> = ({ city }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${book.city}/${city.id}`);
  };

  return (
    <Box sx={styles.root} onClick={handleClick}>
      <Box component={'img'} src={city.image} sx={styles.image} />
      <Box display={'flex'} flexDirection={'column'} gap={'16px'}>
        <Typography>Name - {city.name}</Typography>
        <Typography>Population - {city.population}</Typography>
      </Box>
    </Box>
  );
};

export default City;
