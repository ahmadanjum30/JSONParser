import axios from 'axios'
import CAR from './constants'
import { store } from './store'

export const requestCars = (data) => async (dispatch) => {
  dispatch({
    type: CAR.LOAD
  })
  try {
    const json = await axios.get('data.json')
    console.log(json)
    dispatch({
      type: CAR.LOAD_SUCCESS,
      carsData: json.data,
      isError: false
    })
  } catch (e) {
    dispatch({
      type: CAR.LOAD_SUCCESS,
      carsData: [],
      isError: true
    })
  }
}

export const deleteCar = (car) => async (dispatch) => {
  dispatch({
    type: CAR.DELETE_CAR,
    car
  })
}
