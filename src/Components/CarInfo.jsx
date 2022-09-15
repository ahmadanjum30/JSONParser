import React from 'react'
import moment from 'moment/moment'

import { Box } from '@mui/material'
import { Phone, Today, TimeToLeave, LocationCity } from '@mui/icons-material'

const CarInfo = ({ cars }) => {
  return (
    <>
      <div className="col-md-4">
        <div className="title-car">
          <h1>{cars.name}</h1>
        </div>
        <p>
          {<LocationCity />}
          {cars.city}
        </p>
        <Box className="info-car" sx={{ border: 1, borderRadius: '16px' }}>
          <span>
            {<TimeToLeave />}&nbsp;{cars.model}
          </span>
          <span>
            {<Today />}&nbsp;{cars.year}
          </span>
          <span>
            {<Phone />}&nbsp;
            {cars.phone}
          </span>
        </Box>

        <p className="created-at">
          Updated: <b>{moment(cars.created_at).fromNow()}</b>
        </p>
      </div>
    </>
  )
}

export default CarInfo
