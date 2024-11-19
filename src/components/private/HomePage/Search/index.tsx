import React, { useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { styles } from './styles';

type SearchProps = {
  setCities: (cities: any) => void;
};

const Search: React.FC<SearchProps> = ({ setCities }) => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/city/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: cityName }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error('Error fetching city data:', error);
      setCities([]);
    }
  };

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" mb={2}>
        Search for a City
      </Typography>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '16px' }}>
        <TextField
          label="City Name"
          variant="outlined"
          fullWidth
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant={'primary'} type={'submit'}>
          Search
        </Button>
      </form>
    </Box>
  );
};

export default Search;
