import React from 'react'
import SecondGrid from './SecondGrid'
import ThirdGrid from './ThirdGrid'

import { useState } from 'react'
import { Card, Typography, Grid, Box } from '@mui/material'
import { Error } from '@mui/icons-material'

const FirstGrid = ({ car, loggedIn }) => {
  const [showForm, setShowForm] = useState(null)

  return (
    <Card
      sx={{
        mt: 1,
        mb: 2,
        boxShadow: 5
      }}
      variant="outlined">
      {car.featured && (
        <Typography
          component="span"
          sx={{
            position: 'absolute',
            backgroundColor: 'red',
            padding: 0.5,
            color: 'white'
          }}>
          FEATURED {<Error />}
        </Typography>
      )}
      <Box sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={4} sx={{ height: 200 }}>
            <img src={`${car.image}`} />
          </Grid>

          <SecondGrid
            car={car}
            showForm={showForm}
            onChange={(id) => {
              setShowForm(id)
            }}
          />
          <ThirdGrid
            car={car}
            loggedIn={loggedIn}
            showForm={showForm}
            onChange={(id) => {
              setShowForm(id)
            }}
          />
        </Grid>
      </Box>
    </Card>
  )
}

export default FirstGrid
