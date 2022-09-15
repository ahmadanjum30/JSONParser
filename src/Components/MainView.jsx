import './styles.css'

import CarInfo from './CarInfo'
import EditForm from './EditForm'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import data from './example.json'
import { Button, Card, Container } from '@mui/material'
import { Delete, Edit } from '@mui/icons-material'

const MainView = () => {
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

  const handleChange = React.useCallback(() => {
    setShowForm(null)
  }, [])

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
                    <EditForm cars={cars} onChange={handleChange} />
                  </div>
                ) : (
                  <CarInfo cars={cars} />
                )}
                <div className="col-md-4 mt-5 p-4">
                  <h2 className="price-car">
                    <b>PKR {cars.price}</b>
                  </h2>
                  <Button
                    onClick={() => {
                      handleEditClick(event, cars)
                    }}
                    className="btn btn-primary"
                    endIcon={<Edit />}>
                    Edit
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
