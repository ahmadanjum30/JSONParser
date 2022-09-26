import React from 'react'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Typography, Box, Button } from '@mui/material'
import { Phone, Delete, Edit } from '@mui/icons-material'
import { deleteCar } from './Redux/action'

const ThirdGrid = ({ car, loggedIn, showForm, onChange }) => {
  const dispatch = useDispatch()

  const [showPhone, setShowPhone] = useState([])

  const onDelete = (car) => {
    dispatch(deleteCar(car))
  }

  const togglePhone = (id) => {
    setShowPhone(showPhone.concat(id))
  }

  const handleEditClick = (car) => {
    showForm === null ? onChange(car.id) : onChange(null)
  }

  return (
    <Grid item md={4} textAlign="end">
      <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="price-car">
        PKR {car.price / 100000} Lacs
      </Typography>
      <Typography variant="p">
        <Typography component="span" sx={{ background: 'lightgray', fontWeight: 'bold' }}>
          {car.ownership.toUpperCase()}
        </Typography>
      </Typography>
      <Typography>{car.terms} Total Terms</Typography>
      <Box sx={{ mt: 1, mb: 2 }}>
        {showPhone.includes(car.id) ? (
          <Typography fontWeight="bold">{car.phone}</Typography>
        ) : (
          <Button
            onClick={() => togglePhone(car.id)}
            startIcon={<Phone />}
            color="success"
            variant="contained">
            Click to Show Phone
          </Button>
        )}
      </Box>

      {loggedIn && loggedIn.id === car.user && (
        <>
          <Button
            onClick={() => {
              handleEditClick(car)
            }}
            color="primary"
            type="submit"
            endIcon={<Edit />}>
            {showForm === car.id ? 'Back' : 'Edit'}
          </Button>
          <Button
            onClick={() => {
              onDelete(car.id)
            }}
            color="error"
            variant="outlined"
            startIcon={<Delete />}>
            Delete
          </Button>
        </>
      )}
    </Grid>
  )
}

export default ThirdGrid
