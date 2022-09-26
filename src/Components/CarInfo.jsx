import React from 'react'
import moment from 'moment/moment'

import { Box, Typography, Grid } from '@mui/material'
import { LocationCity } from '@mui/icons-material'

const CarInfo = ({ car }) => {
  return (
    <>
      <Grid item md={4}>
        <Box className="title-car">
          <Typography variant="h4">{car.name}</Typography>
        </Box>
        <Typography variant="p">
          {<LocationCity />}
          {car.city}
        </Typography>

        <Box sx={{ color: 'gray', mt: 2 }}>
          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {car.year}
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {car.km}km
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {car.engine}
          </Typography>

          <Typography variant="p" sx={{ borderRight: '0.1em solid gray', padding: '0.5em' }}>
            {car.power} cc
          </Typography>

          <Typography variant="p" sx={{ padding: '0.5em' }}>
            {car.transmission}
          </Typography>
        </Box>
        <br></br>
        <Typography variant="p" sx={{ m: 2 }}>
          Updated:{' '}
          <Box component="span" sx={{ fontWeight: 'bold' }}>
            {moment(car.updated_at).fromNow()}
          </Box>
        </Typography>
      </Grid>
    </>
  )
}

export default CarInfo
