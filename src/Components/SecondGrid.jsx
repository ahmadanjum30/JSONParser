import React from 'react'
import EditForm from './EditForm'
import CarInfo from './CarInfo'

import { toast } from 'material-react-toastify'

const SecondGrid = ({ car, showForm, onChange }) => {
  return showForm === car.id ? (
    <EditForm
      car={car}
      onChange={() => {
        toast.success('Saved Successfully!!!', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId: 'Saved Successfully!!!'
        })
        onChange(null)
      }}
    />
  ) : (
    <CarInfo car={car} />
  )
}

export default SecondGrid
