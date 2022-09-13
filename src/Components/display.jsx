import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './action'
import data from './example.json'
import '../App.css'

const Display = () => {
  const { carsData, isLoading } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [showForm, setShowForm] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: '',
    model: '',
    year: '',
    price: '',
    phone: ''
  })

  const handleEditClick = (event, car) => {
    event.preventDefault()

    if (showForm === null) {
      setShowForm(car.id)

      const formValues = {
        name: car.name,
        price: car.price,
        model: car.model,
        phone: car.phone,
        year: car.year,
        image: car.image
      }
      setEditFormData(formValues)
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
    carsData.splice(index, 1, editFormData)
    setShowForm(null)

    console.log('form submitted ✅')
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
                  <div className="col-md-3">
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
                        <button type="submit">Save</button>
                      </>
                    ) : (
                      <>
                        <h1>{cars.name}</h1>
                        <span>{cars.model}</span>
                        <h3>{cars.year}</h3>
                        <h4>{cars.phone}</h4>
                        <h5>
                          <b>Rs.{cars.price}</b>
                        </h5>
                      </>
                    )}
                  </div>
                  <div className="col-md-4">
                    <img src={`${cars.image}`} height="200px" width="200px" />
                  </div>
                  <div className="col-md-4 mt-5">
                    <button
                      onClick={() => {
                        handleEditClick(event, cars)
                      }}
                      className="btn btn-primary">
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        onDelete(cars.id)
                      }}
                      className="btn btn-danger">
                      Delete
                    </button>
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
