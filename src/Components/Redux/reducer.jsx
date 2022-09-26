import CAR from './constants'
import { USER } from './constants'
import Cookies from 'universal-cookie/cjs/Cookies'

const initialState = {
  cars: {
    carsData: [],
    isLoading: false,
    isError: false
  },
  users: {
    usersData: []
  }
}

const reducer = (state = initialState.cars, action) => {
  switch (action.type) {
    case CAR.LOAD:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case CAR.LOAD_SUCCESS:
      return {
        ...state,
        carsData: action.carsData,
        isLoading: false
      }
    case CAR.DELETE_CAR:
      state.carsData.splice(
        state.carsData.findIndex((obj) => obj.id === action.car),
        1
      )
      return {
        ...state
      }

    case CAR.UPDATE_CAR:
      state.carsData[state.carsData.findIndex((obj) => obj.id === action.car.id)] = action.car
      return {
        ...state
      }

    case USER.LOGIN:
      state = initialState.users
      var isFound = false
      action.usersData.map((temp) => {
        if (temp.email === action.user.email && temp.password === action.user.password) {
          isFound = { ...temp }
        }
      })

      if (isFound) {
        const cookies = new Cookies()
        cookies.set('myUser', isFound, { path: '/' })
        return {
          usersData: isFound
        }
      }
      return {
        usersData: null
      }

    default:
      return state
  }
}

export default reducer
