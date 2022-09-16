const Protected = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return null
  }
  return children
}

export default Protected
