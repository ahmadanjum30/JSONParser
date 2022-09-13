import CAR from './constants'

const initalState = {
  carsData: [],
  isLoading: false,
  isError: false
}

const reducer = (state = initalState, action) => {
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
      state.carsData.splice(action.car, 1)
      return {
        ...state
      }

    case CAR.UPDATE_CAR:
      return {
        ...state
      }

    default:
      return state
  }
}

export default reducer
