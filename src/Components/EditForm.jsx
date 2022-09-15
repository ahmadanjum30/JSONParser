import React from 'react'

import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { Save } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { updateCar } from './Redux/action'

const EditForm = (props) => {
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      id: props.cars.id,
      name: props.cars.name,
      model: props.cars.model,
      year: props.cars.year,
      price: props.cars.price,
      phone: props.cars.phone,
      image: props.cars.image,
      city: props.cars.city,
      created_at: props.cars.created_at
    },
    onSubmit: (values) => {
      console.log(values)
      dispatch(updateCar(values))
      props.onChange
    }
  })

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}>
        <div className="row">
          <div className="col-md-6">
            <TextField
              sx={{ m: 0.5 }}
              name="name"
              label="Name"
              variant="outlined"
              value={formik.values.name}
              onSubmit
              onChange={formik.handleChange}></TextField>
            <TextField
              sx={{ m: 0.5 }}
              required="required"
              label="Model"
              variant="outlined"
              name="model"
              value={formik.values.model}
              onChange={formik.handleChange}></TextField>
            <TextField
              sx={{ m: 0.5 }}
              id="outlined-basic"
              label="Year"
              variant="outlined"
              required="required"
              name="year"
              value={formik.values.year}
              onChange={formik.handleChange}></TextField>
            <TextField
              sx={{ m: 0.5 }}
              label="Phone No."
              variant="outlined"
              required="required"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}></TextField>
          </div>
          <div className="col-md-6">
            <TextField
              sx={{ m: 0.5, size: 'small' }}
              label="Price"
              variant="outlined"
              required="required"
              value={formik.values.price}
              name="price"
              onChange={formik.handleChange}></TextField>
            <TextField
              sx={{ m: 0.5 }}
              label="City"
              variant="outlined"
              required="required"
              value={formik.values.city}
              name="city"
              onChange={formik.handleChange}></TextField>
            <Button
              variant="contained"
              component="label"
              sx={{ m: 1 }}
              value={formik.values.image}
              onChange={formik.handleChange}>
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
          </div>
        </div>
      </form>
    </>
  )
}

export default EditForm
