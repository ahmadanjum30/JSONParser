import './styles.css'

import React from 'react'
import Login from './Login'
import Cookies from 'universal-cookie/cjs/Cookies'
import SearchForm from './SearchForm'
import getData from './SearchHelper'
import FirstGrid from './FirstGrid'

import { requestCars } from './Redux/action'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Box, Container, Button } from '@mui/material'
import { ToastContainer } from 'material-react-toastify'
import { ArrowForwardIos, ArrowBackIos } from '@mui/icons-material'

const MainView = () => {
  const dispatch = useDispatch()
  const cookies = new Cookies()

  const [currentPage, setCurrentPage] = useState(1)
  const [loggedIn, setLoggedIn] = useState(null)
  const [query, setQuery] = useState({
    name: '',
    price: null,
    isFeatured: false
  })
  const { carsData, isLoading } = useSelector((state) => state)

  useEffect(() => {
    dispatch(requestCars())
    setLoggedIn(cookies.get('myUser'))
  }, [])

  const handlePagination = (isNext) => {
    if (isNext) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <>
      <Login
        onChange={(id) => {
          id ? setLoggedIn(id.id) : setLoggedIn(null)
        }}
      />
      <SearchForm
        onChange={(q) => {
          setQuery(q)
        }}
      />

      <Box display="flex" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
        <Button
          onClick={() => {
            handlePagination(false)
          }}
          startIcon={<ArrowBackIos />}
          disabled={currentPage <= 1}>
          Back
        </Button>
        <Button
          onClick={() => {
            handlePagination(true)
          }}
          endIcon={<ArrowForwardIos />}
          disabled={carsData && currentPage * 10 >= carsData.length}>
          Next
        </Button>
      </Box>

      {isLoading && <Box>Data loading...</Box>}
      {carsData &&
        getData(carsData, query).map((car, index) => {
          return (
            <Container key={car.id}>
              {index >= (currentPage - 1) * 10 && index < currentPage * 10 && (
                <FirstGrid car={car} loggedIn={loggedIn} />
              )}
            </Container>
          )
        })}
      <ToastContainer
        position="top-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default MainView
