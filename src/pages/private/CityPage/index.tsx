import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { styles } from './styles';
import { useParams } from "react-router-dom";
import CityDescription from "../../../components/private/CityPage/CityDescription";

const CityPage: React.FC = () => {
  const {id} = useParams();
  const [city, setCity] = useState<any>([]);

  useEffect(() => {
    const list = async (id: number) => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/city/${id}`);
        const city = await response.json();
        setCity(city);
      } catch (error) {
        console.error('Помилка завантаження міст:', error);
      }
    };

    if (id) {
      list(+id);
    }
  }, [id]);

  console.log('city', city)

  return (
    <Box sx={styles.root}>
      <CityDescription city={city} />
    </Box>
  );
};

export default CityPage;
