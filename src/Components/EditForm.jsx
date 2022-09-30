import React from 'react'

import { useFormik } from 'formik'
import { Button, TextField, Grid } from '@mui/material'
import { Save } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { updateCar } from './Redux/action'

import 'material-react-toastify/dist/ReactToastify.css'

const EditForm = (props) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      ...props.car
    },
    onSubmit: (values) => {
      values.created_at = Date()
      dispatch(updateCar(values))
      props.onChange()
    }
  })

  return (
    <>
      <Grid item md={4}>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            formik.handleSubmit()
          }}
          onChange={formik.handleChange}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <TextField
                sx={{ m: 0.5 }}
                name="name"
                label="Name"
                variant="outlined"
                value={formik.values.name}></TextField>
              <TextField
                sx={{ m: 0.5 }}
                required={true}
                label="Power"
                variant="outlined"
                name="power"
                value={formik.values.power}></TextField>
              <TextField
                sx={{ m: 0.5 }}
                id="outlined-basic"
                label="Year"
                variant="outlined"
                required={true}
                name="year"
                value={formik.values.year}></TextField>
              <TextField
                sx={{ m: 0.5 }}
                label="Phone No."
                variant="outlined"
                required={true}
                name="phone"
                value={formik.values.phone}></TextField>
            </Grid>
            <Grid item md={6}>
              <TextField
                sx={{ m: 0.5, size: 'small' }}
                label="Price"
                variant="outlined"
                required={true}
                value={formik.values.price}
                name="price"></TextField>
              <TextField
                sx={{ m: 0.5 }}
                label="City"
                variant="outlined"
                required={true}
                value={formik.values.city}
                name="city"></TextField>
              <Button
                variant="contained"
                component="label"
                sx={{ m: 1 }}
                value={formik.values.image}>
                Upload
                <input type="file" name="image" hidden />
              </Button>

              <Button
                type="submit"
                color="primary"
                variant="outlined"
                sx={{ m: 1 }}
                endIcon={<Save />}>
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  )
}

export default EditForm
