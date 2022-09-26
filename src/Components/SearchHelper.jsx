const keys = ['name', 'city', 'transmission', 'ownership']
const getData = (data, query) => {
  return data.filter(
    (car) =>
      keys.some(
        (key) =>
          car[key].toLowerCase().includes(query.name.toLowerCase()) &&
          (query.isFeatured ? car.featured === query.isFeatured : car)
      ) && (query.price ? (car.price <= query.price ? car : null) : car)
  )
}

export default getData
