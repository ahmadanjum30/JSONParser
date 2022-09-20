import React from 'react'
import { userLogin } from './Redux/action'
import { Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'

const Login = () => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: (values) => {
      dispatch(userLogin(values))
    }
  })

  return (
    <>
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
    </>
  )
}

export default Login
