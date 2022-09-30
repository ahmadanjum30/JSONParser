import React from 'react'

import { useState, useEffect } from 'react'
import { FormGroup, Grid, TextField, Container, Switch, FormControlLabel } from '@mui/material'

const SearchForm = (props) => {
  const [query, setQuery] = useState({
    name: '',
    price: null,
    isFeatured: false
  })

  useEffect(() => {
    props.onChange(query)
  }, [query])

  return (
    <>
      <FormGroup sx={{ display: 'flex', maxWidth: '30%', marginLeft: 'auto', marginRight: 'auto' }}>
        <TextField
          placeholder="Search"
          label="Search"
          onChange={(e) => {
            setQuery((prevState) => ({
              ...prevState,
              name: e.target.value
            }))
          }}
        />
        <Container sx={{ mt: 1 }}>
          <Grid container>
            <Grid item md={5}>
              <FormControlLabel
                control={
                  <Switch
                    onChange={() => {
                      setQuery((prevState) => ({
                        ...prevState,
                        isFeatured: !prevState.isFeatured
                      }))
                    }}
                  />
                }
                label="Featured"
              />
            </Grid>
            <Grid item md={7}>
              <TextField
                placeholder="Max Price"
                label="Max Price"
                size="small"
                sx={{
                  display: 'flex',
                  maxWidth: '100%',
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}
                onChange={(e) => {
                  setQuery((prevState) => ({
                    ...prevState,
                    price: e.target.value
                  }))
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </FormGroup>
    </>
  )
}

export default SearchForm
