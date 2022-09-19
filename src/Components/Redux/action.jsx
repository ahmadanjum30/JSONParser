import axios from 'axios'
import CAR from './constants'
import { USER } from './constants'

export const requestCars = () => async (dispatch) => {
  dispatch({
    type: CAR.LOAD
  })

  try {
    const json = await axios.get('MOCK_DATA.json')
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

export const updateCar = (car) => async (dispatch) => {
  dispatch({
    type: CAR.UPDATE_CAR,
    car
  })
}

export const userLogin = (user) => async (dispatch) => {
  try {
    const json = await axios.get('USER_DATA.json')
    dispatch({
      type: USER.LOGIN,
      usersData: json.data,
      user
    })
  } catch (e) {
    return
  }
}
