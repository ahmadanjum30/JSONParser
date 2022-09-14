import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import data from './example.json'
import { Button, Box, TextField, Card } from '@mui/material'
import { Delete, Edit, Save, Phone, Today, TimeToLeave, LocationCity } from '@mui/icons-material'
import moment from 'moment'
import './styles.css'

const Display = () => {
  const { carsData, isLoading } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    model: '',
    year: '',
    price: '',
    phone: '',
    image: '',
    city: '',
    created_at: ''
  })

  const handleEditClick = (event, car) => {
    event.preventDefault()

    if (showForm === null) {
      setShowForm(car.id)

      const formValues = {
        name: car.name,
        model: car.model,
        year: car.year,
        price: car.price,
        phone: car.phone,
        image: car.image,
        city: car.city,
        created_at: car.created_at
      }
      setEditFormData({ ...formValues })
    } else {
      setShowForm(null)
    }
  }

  useEffect(() => {
    dispatch(requestCars(data))
  }, [])

  const onDelete = (car) => {
    let index = carsData.findIndex((obj) => obj.id === car)
    dispatch(deleteCar(index))
  }

  const handleEditFormChange = (event) => {
    event.preventDefault()

    let fieldName = event.target.getAttribute('name')
    const fieldValue = event.target.value

    const newFormData = { ...editFormData }
    newFormData[fieldName] = fieldValue

    setEditFormData(newFormData)
  }

  const handleSubmit = (event, car) => {
    event.preventDefault()

    let index = carsData.findIndex((obj) => obj.id === car.id)
    carsData.splice(index, 1, { ...editFormData })
    setShowForm(null)
  }

  return (
    <>
      {isLoading && <div className="loading">Data loading...</div>}
      {carsData.map((cars) => {
        return (
          <div key={cars.id} className="container">
            <form
              onSubmit={() => {
                handleSubmit(event, cars)
              }}>
              <Card sx={{ p: 4, mt: 2, mb: 2, ml: 10, mr: 10, boxShadow: 3 }} variant="outlined">
                <div className="row">
                  <div className="col-md-4 border-end border-info">
                    <img src={`${cars.image}`} />
                  </div>
                  {showForm === cars.id ? (
                    <>
                      <div className="col-md-2">
                        <TextField
                          sx={{ m: 0.5 }}
                          name="name"
                          label="Name"
                          variant="outlined"
                          value={editFormData.name}
                          onChange={handleEditFormChange}></TextField>
                        <TextField
                          sx={{ m: 0.5 }}
                          required="required"
                          label="Model"
                          variant="outlined"
                          name="model"
                          onChange={handleEditFormChange}></TextField>
                        <TextField
                          sx={{ m: 0.5 }}
                          id="outlined-basic"
                          label="Year"
                          variant="outlined"
                          required="required"
                          name="year"
                          onChange={handleEditFormChange}></TextField>
                        <TextField
                          sx={{ m: 0.5 }}
                          label="Phone No."
                          variant="outlined"
                          required="required"
                          name="phone"
                          onChange={handleEditFormChange}></TextField>
                      </div>
                      <div className="col-md-2">
                        <TextField
                          sx={{ m: 0.5, size: 'small' }}
                          label="Price"
                          variant="outlined"
                          required="required"
                          name="price"
                          onChange={handleEditFormChange}></TextField>
                        <TextField
                          sx={{ m: 0.5 }}
                          label="City"
                          variant="outlined"
                          required="required"
                          name="city"
                          onChange={handleEditFormChange}></TextField>
                        <Button
                          variant="contained"
                          component="label"
                          className="m-3"
                          onChange={handleEditFormChange}>
                          Upload File
                          <input type="file" name="image" hidden />
                        </Button>

                        <Button
                          type="submit"
                          color="primary"
                          variant="outlined"
                          endIcon={<Save />}
                          className="m-3">
                          Save
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="col-md-4">
                        <div className="title-car">
                          <h1>{cars.name}</h1>
                        </div>
                        <p>
                          {<LocationCity />}
                          {cars.city}
                        </p>
                        <Box className="info-car" sx={{ border: 1, borderRadius: '16px' }}>
                          <span>
                            {<TimeToLeave />}&nbsp;{cars.model}
                          </span>
                          <span>
                            {<Today />}&nbsp;{cars.year}
                          </span>
                          <span>
                            {<Phone />}&nbsp;
                            {cars.phone}
                          </span>
                        </Box>

                        <p className="created-at">
                          Created: <b>{moment(cars.created_at).fromNow()}</b>
                        </p>
                      </div>
                    </>
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
            </form>
          </div>
        )
      })}
    </>
  )
}

export default Display
