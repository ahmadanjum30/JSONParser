import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './Redux/action'
import data from './example.json'
import { Button, Box } from '@mui/material'
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

    const fieldName = event.target.getAttribute('name')
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
              <div className="card p-4">
                <div className="row">
                  <div className="col-md-4 border-end border-info">
                    <img src={`${cars.image}`} />
                  </div>
                  <div className="col-md-4">
                    {showForm === cars.id ? (
                      <>
                        <input
                          type="text"
                          placeholder="Name"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}></input>
                        <input
                          type="text"
                          required="required"
                          placeholder="Model"
                          name="model"
                          onChange={handleEditFormChange}></input>
                        <input
                          type="text"
                          required="required"
                          placeholder="Year"
                          name="year"
                          onChange={handleEditFormChange}></input>
                        <input
                          type="text"
                          required="required"
                          placeholder="Phone No."
                          name="phone"
                          onChange={handleEditFormChange}></input>
                        <input
                          type="text"
                          required="required"
                          placeholder="Price"
                          name="price"
                          onChange={handleEditFormChange}></input>
                        <input
                          type="text"
                          required="required"
                          placeholder="City"
                          name="city"
                          onChange={handleEditFormChange}></input>
                        <input type="file" name="image" onChange={handleEditFormChange} />
                        <br></br>
                        <Button type="submit" color="primary" variant="outlined" endIcon={<Save />}>
                          Save
                        </Button>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
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
              </div>
            </form>
          </div>
        )
      })}
    </>
  )
}

export default Display
