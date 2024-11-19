import React, { useEffect, useState } from 'react';

import { Box, Grid, Typography } from '@mui/material';

import { styles } from './styles';
import City from "../City";

type ListProps = {
  list: {
    "date_of_creation": "1970-02-04",
    "id": 1,
    "image": "http://commons.wikimedia.org/wiki/Special:FilePath/Pripyat_montage.jpg?width=300",
    "name": "Pripyat",
    "population": 0
  }[];
};

const List: React.FC<ListProps> = ({ list }) => {
  console.log('list', list)

  return (
    <Box sx={styles.root}>
      <Grid container spacing={'8px'}>
        {list.map((item) => (
          <Grid item key={item.id} md={6} xs={12}>
            <City city={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default List;
