import React from 'react'
import Cookies from 'universal-cookie'

import { userLogin } from './Redux/action'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

const Login = (props) => {
  const dispatch = useDispatch()
  const cookies = new Cookies()
  const [loggedIn, setLoggedIn] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(userLogin(values))
    }
  })

  useEffect(() => {
    setLoggedIn(cookies.get('myUser'))
    loggedIn && props.onChange(loggedIn)
  }, [])

  const handleSignOut = () => {
    setLoggedIn(null)
    cookies.remove('myUser', { path: '/' })
    props.onChange(null)
  }

  return (
    <>
      {loggedIn == undefined ? (
        <form
          onSubmit={() => {
            formik.handleSubmit()
          }}>
          <TextField
            sx={{ m: 0.5 }}
            name="email"
            label="email"
            required={true}
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}></TextField>
          <TextField
            sx={{ m: 0.5 }}
            required={true}
            label="password"
            variant="outlined"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}></TextField>
          <Button type="submit" color="primary" variant="outlined" sx={{ m: 1 }}>
            Login
          </Button>
        </form>
      ) : (
        <Button
          onClick={() => {
            handleSignOut()
          }}>
          Sign Out
        </Button>
      )}
    </>
  )
}

export default Login
