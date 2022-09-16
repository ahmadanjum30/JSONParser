import './styles.css'

import CarInfo from './CarInfo'
import EditForm from './EditForm'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import data from './example.json'
import { Button, Card, Container } from '@mui/material'
import { VerifiedUser, Delete, Edit } from '@mui/icons-material'
import Protected from './Protected'

const MainView = () => {
  const [user, setUser] = useState(3)
  const dispatch = useDispatch()
  const { carsData, isLoading } = useSelector((state) => state)
  const [showForm, setShowForm] = useState(null)

  const handleEditClick = (event, car) => {
    event.preventDefault()
    showForm === null ? setShowForm(car.id) : setShowForm(null)
  }

  useEffect(() => {
    dispatch(requestCars(data))
  }, [])

  const onDelete = (car) => {
    let index = carsData.findIndex((obj) => obj.id === car)
    dispatch(deleteCar(index))
  }

  const addUser = () => {
    setUser(((user + 1) % 5) + 1)
  }

  return (
    <>
      {isLoading && <div className="loading">Data loading...</div>}
      {carsData.map((cars) => {
        return (
          <Container key={cars.id}>
            <Card sx={{ p: 4, mt: 2, mb: 2, ml: 10, mr: 10, boxShadow: 3 }} variant="outlined">
              <div className="row">
                <div className="col-md-4 border-end border-info">
                  <img src={`${cars.image}`} />
                </div>
                {showForm === cars.id ? (
                  <div className="col-md-4">
                    <EditForm cars={cars} />
                  </div>
                ) : (
                  <CarInfo cars={cars} />
                )}
                <div className="col-md-4 mt-5 p-4">
                  <h2 className="price-car">
                    <b>PKR {cars.price}</b>
                  </h2>

                  <Protected isLoggedIn={user === cars.user}>
                    <Button
                      onClick={() => {
                        handleEditClick(event, cars)
                      }}
                      className="btn btn-primary"
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

                  <Button
                    onClick={() => {
                      addUser()
                    }}
                    sx={{ m: 2 }}
                    color="success"
                    variant="outlined"
                    startIcon={<VerifiedUser />}>
                    User+1
                  </Button>
                </div>
              </div>
            </Card>
          </Container>
        )
      })}
    </>
  )
}

export default MainView
