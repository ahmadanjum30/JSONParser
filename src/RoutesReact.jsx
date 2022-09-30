import React from 'react'

import { store } from './Components/Redux/store'
import { Provider } from 'react-redux'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

import MainView from './Components/MainView'

const RoutesReact = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Provider store={store}>
              <MainView />
            </Provider>
          }></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesReact
