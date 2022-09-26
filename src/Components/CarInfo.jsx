import React from 'react'
import moment from 'moment/moment'

import { Box, Typography, Grid } from '@mui/material'
import { LocationCity } from '@mui/icons-material'

const CarInfo = ({ cars }) => {
  return (
    <>
      <Grid item md={4}>
        <Box className="title-car">
          <Typography variant="h4">{cars.name}</Typography>
        </Box>
        <Typography variant="p">
          {<LocationCity />}
          {cars.city}
        </Typography>

        <Box sx={{ color: 'gray', mt: 2 }}>
          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {cars.year}
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {cars.km}km
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {cars.engine}
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {cars.power} cc
          </Typography>

          <Typography variant="p" sx={{ padding: '0.5em' }}>
            {cars.transmission}
          </Typography>
        </Box>
        <br></br>
        <Typography variant="p" sx={{ m: 2 }}>
          Updated:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {moment(cars.updated_at).fromNow()}
          </Box>
        </Typography>
      </Grid>
    </>
  )
}

export default CarInfo
