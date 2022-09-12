import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteCar, requestCars } from './action'
import data from './example.json'
import '../App.css'

const Display = () => {
  const { carsData, isLoading } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestCars(data))
  }, [])

  const onDelete = (car) => {
    let index = carsData.findIndex((obj) => obj.id == car)
    dispatch(deleteCar(index))
  }

  return (
    <>
      {isLoading && <div className="loading">Data loading...</div>}
      {carsData.map((cars) => {
        return (
          <div key={cars.id} className="container">
            <div className="card p-4">
              <div className="row">
                <div className="col-md-3">
                  <h1>{cars.name}</h1>
                  <span>{cars.model}</span>
                  <h3>{cars.year}</h3>
                  <h4>{cars.phone}</h4>
                </div>
                <div className="col-md-4">
                  <img src={`${cars.image}`} height="200px" width="200px" />
                </div>
                <div className="col-md-4 mt-5">
                  <button onClick={'sayHello'} className="btn btn-primary">
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
          </div>
        )
      })}
    </>
  )
}

export default Display
