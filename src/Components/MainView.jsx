import './styles.css'

import CarInfo from './CarInfo'
import EditForm from './EditForm'
import Protected from './Protected'
import Cookies from 'universal-cookie/cjs/Cookies'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import { Button, Card, Container, Typography, Grid } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'
import { Box } from '@mui/system'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'
import { Phone } from '@mui/icons-material'
import Login from './Login'

const MainView = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const { carsData, isLoading } = useSelector((state) => state)
  const [showForm, setShowForm] = useState(null)
  const cookies = new Cookies()
  const [loggedIn, setLoggedIn] = useState(null)
  const [showPhone, setShowPhone] = useState([])

  const handleEditClick = (car) => {
    showForm === null ? setShowForm(car.id) : setShowForm(null)
  }

  useEffect(() => {
    dispatch(requestCars())
    setLoggedIn(cookies.get('myUser'))
  }, [])

  const onDelete = (car) => {
    let index = carsData.findIndex((obj) => obj.id === car)
    dispatch(deleteCar(index))
  }

  const handlePagination = (isNext) => {
    if (isNext) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleSignOut = () => {
    setLoggedIn(null)
    cookies.remove('myUser', { path: '/' })
  }

  const togglePhone = (id) => {
    setShowPhone(showPhone.concat(id))
  }

  return (
    <>
      {loggedIn == undefined ? (
        <Login />
      ) : (
        <Button
          onClick={() => {
            handleSignOut()
          }}>
          Sign Out
        </Button>
      )}
      <Box display="flex" alignItems="center" justifyContent="center">
        <Button
          onClick={() => {
            handlePagination(false)
          }}
          startIcon={<ArrowBackIos />}
          disabled={currentPage <= 1}>
          Back
        </Button>
        <Button
          onClick={() => {
            handlePagination(true)
          }}
          endIcon={<ArrowForwardIos />}
          disabled={carsData && currentPage * 10 >= carsData.length}>
          Next
        </Button>
      </Box>
      {isLoading && <Box className="loading">Data loading...</Box>}
      {carsData &&
        carsData.map((cars, index) => {
          return (
            <Container key={cars.id}>
              {index >= (currentPage - 1) * 10 && index < currentPage * 10 && (
                <Card sx={{ mt: 1, mb: 2, boxShadow: 5, padding: 2 }} variant="outlined">
                  <Grid container spacing={2}>
                    <Grid item md={4} sx={{ height: 200 }}>
                      <img src={`${cars.image}`} />
                    </Grid>
                    {showForm === cars.id ? (
                      <Grid item md={4}>
                        <EditForm cars={cars} />
                      </Grid>
                    ) : (
                      <CarInfo cars={cars} />
                    )}
                    <Grid item md={4} textAlign="end">
                      <Typography variant="h5" sx={{ fontWeight: 'bold' }} className="price-car">
                        PKR {cars.price / 100000} Lacs
                      </Typography>
                      <Typography variant="p">
                        <Typography
                          component="span"
                          sx={{ background: 'lightgray', fontWeight: 'bold' }}>
                          {cars.ownership.toUpperCase()}
                        </Typography>
                      </Typography>
                      <Typography>{cars.terms} Total Terms</Typography>
                      <Box sx={{ mt: 1, mb: 2 }}>
                        {showPhone.includes(cars.id) ? (
                          <Typography fontWeight="bold">{cars.phone}</Typography>
                        ) : (
                          <Button
                            onClick={() => togglePhone(cars.id)}
                            startIcon={<Phone />}
                            color="success"
                            variant="contained">
                            Click to Show Phone
                          </Button>
                        )}{' '}
                      </Box>

                      {loggedIn && (
                        <Protected isLoggedIn={loggedIn.id === cars.user}>
                          <Button
                            onClick={() => {
                              handleEditClick(cars)
                            }}
                            color="primary"
                            type="submit"
                            endIcon={<Edit />}>
                            {showForm === cars.id ? 'Back' : 'Edit'}
                          </Button>
                          <Button
                            onClick={() => {
                              onDelete(cars.id)
                            }}
                            color="error"
                            variant="outlined"
                            startIcon={<Delete />}>
                            Delete
                          </Button>
                        </Protected>
                      )}
                    </Grid>
                  </Grid>
                </Card>
              )}
            </Container>
          )
        })}
    </>
  )
}

export default MainView
