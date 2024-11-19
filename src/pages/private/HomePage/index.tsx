import React, { useEffect, useState } from 'react';

import { Box } from '@mui/material';

import { styles } from './styles';
import List from "../../../components/private/HomePage/List";
import Search from "../../../components/private/HomePage/Search";

const HomePage: React.FC = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const list = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/cities');
        const cities = await response.json();
        setCities(cities);
      } catch (error) {
        console.error('Помилка завантаження міст:', error);
      }
    };

    list();
  }, []);

  return (
    <Box sx={styles.root}>
      <Search setCities={setCities} />
      <List list={cities} />
    </Box>
  );
};

export default HomePage;
