import axios from 'axios'
import CAR from './constants'

export const requestCars = () => async (dispatch) => {
  dispatch({
    type: CAR.LOAD
  })
  try {
    const json = await axios.get('MOCK_DATA.json')
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
