import './styles.css'

import CarInfo from './CarInfo'
import EditForm from './EditForm'
import Protected from './Protected'
import Cookies from 'universal-cookie/cjs/Cookies'
import Login from './Login'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import {
  Button,
  Card,
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material'
import { ArrowForwardIos, ArrowBackIos, Error, Phone, Delete, Edit } from '@mui/icons-material'
import { ToastContainer, toast } from 'material-react-toastify'

const MainView = () => {
  const dispatch = useDispatch()
  const keys = ['name', 'city', 'transmission', 'ownership']
  const [currentPage, setCurrentPage] = useState(1)
  const { carsData, isLoading } = useSelector((state) => state)
  const [showForm, setShowForm] = useState(null)
  const cookies = new Cookies()
  const [loggedIn, setLoggedIn] = useState(null)
  const [showPhone, setShowPhone] = useState([])
  const [query, setQuery] = useState('')
  const [isFeatured, setFeatured] = useState(false)
  const [priceRange, setPriceRange] = useState(null)

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

  const search = () => {
    return carsData.filter(
      (car) =>
        keys.some(
          (key) =>
            car[key].toLowerCase().includes(query.toLowerCase()) &&
            (isFeatured ? car.featured === isFeatured : car)
        ) && (priceRange ? (car.price <= priceRange ? car : null) : car)
    )
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

      <FormGroup sx={{ display: 'flex', maxWidth: '30%', marginLeft: 'auto', marginRight: 'auto' }}>
        <TextField
          placeholder="Search"
          label="Search"
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
        <Container sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={5}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={() => {
                      setFeatured(!isFeatured)
                    }}
                  />
                }
                label="Featured"
              />
            </Grid>
            <Grid item md={7}>
              <TextField
                placeholder="Max Price"
                label="Max Price"
                size="small"
                sx={{
                  display: 'flex',
                  maxWidth: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                onChange={(e) => {
                  setPriceRange(e.target.value)
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </FormGroup>

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
        search().map((cars, index) => {
          return (
            <Container key={cars.id}>
              {index >= (currentPage - 1) * 10 && index < currentPage * 10 && (
                <Card
                  sx={{
                    mt: 1,
                    mb: 2,
                    boxShadow: 5
                  }}
                  variant="outlined">
                  {cars.featured && (
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
                        <img src={`${cars.image}`} />
                      </Grid>
                      {showForm === cars.id ? (
                        <EditForm
                          cars={cars}
                          onChange={() => {
                            toast.success('Saved Successfully!!!', {
                              position: 'top-right',
                              autoClose: 3000,
                              hideProgressBar: true,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              toastId: 'Saved Successfully!!!'
                            })
                            setShowForm(null)
                          }}
                        />
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
                          )}
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
                  </Box>
                </Card>
              )}
            </Container>
          )
        })}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default MainView
